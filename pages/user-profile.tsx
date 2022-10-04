import type { NextPage } from "next"
import Head from "next/head"
import { Banner } from "../components/Banner"
import { NavTabs } from "../components/NavTabs"
import defaultStats from "../components/Banner/stats.json"
import { useAccount, useProvider, useSigner } from "wagmi"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Layout } from "../components/Layout"
import { Stack } from "@mantine/core"
import useTableland from "../hooks/useTableland"
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client"
import { fetchUserProfile } from "../constants/graphql/queries"
import useContract from "../hooks/useContract"
import useOrbis from "../hooks/useOrbis"

const UserProfile: NextPage = () => {
    const { isConnected, isDisconnected, status } = useAccount()
    const router = useRouter()
    const { address } = useAccount()
    const [profId, setProfId] = useState()
    const isOwner = address === router.query.address
    const [stats, setStats] = useState(defaultStats)
    const [isPostCountFetched, setIsPostCountFetched] = useState(false)
    const { getUserData } = useTableland()
    const { getLensPostCount } = useContract()
    const { getOrbisProfileFollowing, getOrbisProfileFollowers } = useOrbis()
    const [userExists, setIsUserExists] = useState(0) // 0 : checking, 1 : exists, 2 : not exists
    const [userDid, setUserDid] = useState("") // did of user of current profile page and not the user using the website
    const client = new ApolloClient({
        uri: "https://api-mumbai.lens.dev/",
        cache: new InMemoryCache(),
    })
    useEffect(() => {
        if (router.query.address && router.query.address.length !== 0) {
            initialize().then()
        }
    }, [router.query])

    const initialize = async () => {
        const walletAddress = router.query.address
        const user = await getUserData(walletAddress)
        if (!walletAddress && !user && user.length === 0) {
            setIsUserExists(2)
            return
        }
        setIsUserExists(1)
        const did = user[3]
        setUserDid("did:pkh:eip155:80001:0x0de82dcc40b8468639251b089f8b4a4400022e04")
        console.log("user", user)
        setProfId(user[2])
        // const response = await fetch("https://" + user[7] + ".ipfs.w3s.link/json")
        // const externalProfileData: any = response.json()
        // const profileHex = user[2]
        const userStats = {
            image: "https://" + user[7] + ".ipfs.w3s.link/image",
            avatar: "https://" + user[6] + ".ipfs.w3s.link/image",
            name: user[5],
        }
        setStats((oldStats) => ({ ...oldStats, ...userStats }))
        // fetchPostsCount(user[1])
        fetchExternalURIs(user[4])
        fetchFollowStats("did:pkh:eip155:80001:0x0de82dcc40b8468639251b089f8b4a4400022e04")

        // const query = {
        //     query: gql(fetchUserProfile),
        //     variables: {
        //         profHex: profileHex,
        //     },
        // }

        // const graphRes = (await client.query(query)).data.profiles.items[0].stats
        const lensStats = [
            {
                value: "2",
                label: "Followers",
            },
            {
                value: "1",
                label: "Follows",
            },
            {
                value: "1",
                label: "Posts",
            },
        ]
        setStats((oldStats) => ({ ...oldStats, stats: lensStats }))
    }

    const fetchFollowStats = async (did: String) => {
        const following = await getOrbisProfileFollowing(did)
        const followers = await getOrbisProfileFollowers(did)
        console.log("following", following)
        console.log("followers", followers)
        setStats((oldStats) => ({
            ...oldStats,
            stats: [
                {
                    value:
                        followers.data.length === 1
                            ? followers.data[0].details.metadata.address.toUpperCase() ===
                              router.query.address?.toUpperCase()
                                ? "0"
                                : followers.data.length // will be equals to 1
                            : followers.data.length,
                    label: "Followers",
                },
                {
                    value: following.data.length,
                    label: "Follows",
                },
                oldStats.stats[2],
            ],
        }))
    }

    const fetchPostsCount = async (profileId) => {
        console.log("fetchTotalPosts")
        const totalPosts = await getLensPostCount(profileId)
        console.log("total post", totalPosts)
        setStats((oldStats) => {
            const stats = oldStats.stats
            stats[2] = {
                value: totalPosts,
                label: "Posts",
            }
            return { ...oldStats, stats }
        })
        setIsPostCountFetched(true)
    }

    const fetchExternalURIs = async (cid: string) => {
        const response = await fetch("https://" + cid + ".ipfs.w3s.link/json")
        const externalProfileData = await response.json()
        console.log("ex", externalProfileData)
        setStats((oldStats) => ({ ...oldStats, ...externalProfileData }))
    }

    return (
        <>
            <Layout>
                <Head>
                    <title>Your Profile</title>
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width"
                    />
                </Head>
                <Stack m={"sm"} sx={{ height: "100%" }}>
                    <Banner
                        isOwner={isOwner}
                        {...stats}
                        profId={profId}
                        userExists={userExists === 1}
                        userDid={userDid}
                    />
                    <NavTabs
                        isOwner={isOwner}
                        isPostCountFetched={isPostCountFetched}
                        profId={profId}
                        postCount={
                            stats && stats.stats && stats.stats[2] ? stats.stats[2].value : 0
                        }
                    />
                </Stack>
            </Layout>
        </>
    )
}

export default UserProfile
