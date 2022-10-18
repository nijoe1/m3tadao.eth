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
    const { getOrbisProfileFollowing, getOrbisProfileFollowers, getOrbisProfile, getOrbisIsFollowing, createOrbisConversation } = useOrbis()
    const [userExists, setIsUserExists] = useState(0) // 0 : checking, 1 : exists, 2 : not exists
    const [userDid, setUserDid] = useState("") // did of user of current profile page and not the user using the website
    const [isFollowing, setIsFollowing] = useState(false)
    useEffect(() => {
        if (router.query.address && router.query.address.length !== 0) {
            initialize().then()
        }
    }, [router.query])

    const initialize = async () => {
        const walletAddress = router.query.address
        const user = await getUserData(walletAddress)
        console.log(user)
        if (!walletAddress && !user && user.length === 0) {
            setIsUserExists(2)
            return
        }
        setIsUserExists(1)
        const did = user[2].toLowerCase()
        setUserDid(did)
        const profileDetails = (await getOrbisProfile(did)).data.details.profile
        const userStats = {
            image: profileDetails.cover,
            avatar: "https://ipfs.io/ipfs/" + user[4] + "/image",
            name: user[3],
            description: user[5]
        }
        setStats((oldStats) => ({ ...oldStats, ...userStats, ...profileDetails.data }))
        fetchFollowStats(did)
        const follows = await getOrbisIsFollowing(`did:pkh:eip155:80001:${address?.toLowerCase()}`,did)
        setIsFollowing(follows.data)
    }

    const fetchFollowStats = async (did: String) => {
        const following = await getOrbisProfileFollowing(did)
        const followers = await getOrbisProfileFollowers(did)
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

    const fetchPostsCount = async (profileId: String) => {
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
                        isFollowing={isFollowing}
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
