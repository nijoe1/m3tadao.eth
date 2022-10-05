import {
    createStyles,
    Card,
    ActionIcon,
    Avatar,
    Text,
    Group,
    Button,
    Center,
    Stack,
    Badge,
    Title,
    Container,
} from "@mantine/core"
import Link from "next/link"
import {
    IconBrandGithub,
    IconBrandTwitter,
    IconWorldWww,
    IconCheck,
    IconAlertCircle,
} from "@tabler/icons"
import { showNotification, updateNotification } from "@mantine/notifications"
import { Worldcoin } from "../Worldcoin"
import useContract from "../../hooks/useContract"
import { useRouter } from "next/router"
import useTableland from "../../hooks/useTableland"
import useEPNS from "../../hooks/useEPNS"
import useOrbis from "../../hooks/useOrbis"
import {useState} from "react";

const useStyles = createStyles((theme) => ({
    card: {
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    },

    avatar: {
        border: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white}`,
    },
}))

interface UserCardImageProps {
    image: string
    avatar: string
    name: string
    stats: { label: string; value: string }[]
    website: string
    twitter: string
    github: string
    interests: string[]
    skills: string[]
    designation: string
    isOwner: boolean
    profId: string
    userExists: boolean
    userDid: String
    isFollowing: boolean
}

export function Banner({
    image,
    avatar,
    name,
    designation,
    stats,
    website,
    interests,
    skills,
    github,
    twitter,
    isOwner,
    userExists,
    userDid,
    isFollowing,
}: UserCardImageProps) {
    const { classes, theme } = useStyles()
    const { optIn } = useEPNS()
    const { setFollow, connectOrbis } = useOrbis() // TODO: fix this

    console.log("stats", stats)
    console.log("userExists", userExists)

    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text align="center" size="lg" weight={500}>
                {stat.value}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {stat.label}
            </Text>
        </div>
    ))

    const skillBadges = skills?.map((skill, index) => (
        <Badge key={index} color={"red"}>
            {skill}
        </Badge>
    ))
    const interestBadges = interests?.map((interest, index) => (
        <Badge key={index} color={"green"}>
            {interest}
        </Badge>
    ))

    const handleFollow = async (follow: boolean) => {
        showNotification({
            id: "load-data",
            loading: true,
            title: follow ? "Following user" : "Unfollowing user",
            message: "Please wait!",
            autoClose: false,
            disallowClose: true,
        })
        try {
            // console.log("router query address", router.query.address)
            // const userData = await getUserData(router.query.address)
            // console.log(userData)
            // const res = await createFollow([userData[1]])
            // console.log("res", res)
            await connectOrbis()
            const didOfUserToFollow = userDid
            if (didOfUserToFollow && didOfUserToFollow !== "") {
                const res = await setFollow(userDid, follow)
                console.log(res)
                if (res.status !== 200) {
                    throw "unable to follow"
                }
            } else {
                throw "invalid did"
            }

            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: follow ? "Followed successfully" : "Unfollowed successfully",
                icon: <IconCheck size={16} />,
                autoClose: 2000,
            })

            // router.reload()
            // router.push("/home")
        } catch (e) {
            console.log(e)
            updateNotification({
                id: "load-data",
                color: "red",
                title: "Error",
                message: follow ?  "Failed to follow" : "Failed to unfollow",
                icon: <IconAlertCircle size={16} />,
                autoClose: 2000,
            })
        }
    }


    return (
        <Card p="xl" className={classes.card}>
            <Card.Section
                sx={(theme) => ({
                    backgroundImage: `url(${image})`,
                    height: 225,
                    [theme.fn.smallerThan("md")]: {
                        height: 150,
                    },
                })}
            />
            <Avatar
                src={avatar}
                size={160}
                radius={80}
                mx="auto"
                mt={-30}
                className={classes.avatar}
            />
            <Text align="center" size="lg" weight={500} mt="sm">
                {name}
            </Text>
            <Text align="center" size="sm" color="dimmed">
                {designation}
            </Text>
            <Group mt={"md"} position={"center"} spacing={30}>
                {twitter && (
                    <Link href={twitter ? twitter : "https://twitter.com"} passHref>
                        <ActionIcon component={"a"} target={"_blank"}>
                            <IconBrandTwitter size={32} />
                        </ActionIcon>
                    </Link>
                )}
                {github && (
                    <Link href={github ? github : "https://github.com"} passHref>
                        <ActionIcon component={"a"} target={"_blank"}>
                            <IconBrandGithub size={32} />
                        </ActionIcon>
                    </Link>
                )}
                {website && (
                    <Link href={website ? website : "#"} passHref>
                        <ActionIcon component={"a"} target={"_blank"}>
                            <IconWorldWww size={32} />
                        </ActionIcon>
                    </Link>
                )}
            </Group>
            <Group mt="md" position="center" spacing={30}>
                {items}
            </Group>
            <Stack mt={"lg"}>
                {skillBadges && (
                    <>
                        <Center>
                            <Title order={5}>Skills</Title>
                        </Center>
                        <Center>
                            <Group
                                mt={"xs"}
                                position={"center"}
                                spacing={20}
                                sx={(theme) => ({
                                    width: "25%",
                                    [theme.fn.smallerThan("sm")]: {
                                        width: "100%",
                                    },
                                })}
                            >
                                {skillBadges}
                            </Group>
                        </Center>
                    </>
                )}
                {interestBadges && (
                    <>
                        <Center>
                            <Title order={5}>Interests</Title>
                        </Center>
                        <Center>
                            <Group
                                mt={"xs"}
                                position={"center"}
                                spacing={20}
                                sx={(theme) => ({
                                    width: "25%",
                                    [theme.fn.smallerThan("sm")]: {
                                        width: "100%",
                                    },
                                })}
                            >
                                {interestBadges}
                            </Group>
                        </Center>
                    </>
                )}
            </Stack>
            {!isOwner && userExists && (
                <Stack m={"md"}>
                    <Center mb={0}>
                        <Button
                            radius="md"
                            mt="xl"
                            size="md"
                            fullWidth={false}
                            variant="gradient"
                            gradient={{ from: "indigo", to: "cyan" }}
                            color={theme.colorScheme === "dark" ? undefined : "dark"}
                            onClick={() => {
                                handleFollow(!isFollowing)
                            }}
                        >
                            {isFollowing ? "Unfollow" : "Follow"}
                        </Button>
                    </Center>
                </Stack>
            )}
            {isOwner && (
                <Stack m={"md"}>
                    {/*<Center my={0}>*/}
                    {/*    <Worldcoin profId={profId} />*/}
                    {/*</Center>*/}
                    <Center my={0}>
                        <Button
                            radius="md"
                            size="md"
                            fullWidth={false}
                            color={theme.colorScheme === "dark" ? undefined : "dark"}
                            onClick={() => {
                                optIn()
                            }}
                        >
                            Opt In To EPNS Notification Channel
                        </Button>
                    </Center>
                    {/*    </Container>*/}
                    {/*</Center>*/}
                </Stack>
            )}
        </Card>
    )
}
