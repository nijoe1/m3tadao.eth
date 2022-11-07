import { Tabs, Grid, Container, Title, Image, Center, Button, Paper, Skeleton } from "@mantine/core"
import { PostCard } from "../PostCard"
import PostData from "../PostCard/data.json"
import { useEffect, useState } from "react"
import { ManageProfile } from "../ManageProfile"
import Link from "next/link"
import useContract from "../../hooks/useContract"

const defaultActive = "first"

export function NavTabs({ isOwner, profId, postCount, isPostCountFetched }) {
    const [active, setActive] = useState(defaultActive)
    const [isLoading, setIsLoading] = useState(true)
    const [posts, setPosts] = useState([])
    const { getLensPost } = useContract()
    useEffect(() => {
        if (isPostCountFetched) {
            initializePosts()
        }
    }, [isPostCountFetched])
    console.log(posts)

    const postCards = posts.map((post, index) => {
        return (
            <Grid.Col key={index} lg={4} md={6}>
                <Skeleton visible={isLoading} animate={true}>
                    <Container size={400} px="xs">
                        <PostCard
                            footer={`${Math.floor(Math.random() * 11)} people liked this post`}
                            image={post.image}
                            title={post.title}
                            description={post.description}
                        />
                    </Container>
                </Skeleton>
            </Grid.Col>
        )
    })

    const initializePosts = async () => {
        for (let i = 1; i <= postCount; i++) {
            const postFromLens = await getLensPost(profId, i)
            const postArray = postFromLens.split(",")
            const response = await fetch("https://" + postArray[2] + ".ipfs.w3s.link/json")
            const jsonObj = await response.json()
            const post = {
                id: jsonObj.metadata_id,
                title: jsonObj.content,
                description: jsonObj.description,
                image: "https://" + jsonObj.image + ".ipfs.w3s.link/image",
                authorAddress: jsonObj.address,
            }
            setPosts((oldPosts) => [...oldPosts, post])
            setIsLoading(false)
        }
    }

    
    return (
        <Tabs
            variant="outline"
            defaultValue={defaultActive}
            onTabChange={(event) => {
                setActive(event)
            }}
        >
            <Tabs.List grow position="center" mb={75}>
                
                <Tabs.Tab value="first">Feed</Tabs.Tab>
                {/* Here we will show all the posts */}
                <Tabs.Tab value="second">About & Media</Tabs.Tab>
                                        {/* Here we will show the skills,
                                         projects, detailed about, 
                                        more information they want to add */}

                {isOwner && (
                    <>
                        <Tabs.Tab value="third">Manage</Tabs.Tab>
                        
                    </>
                )}
            </Tabs.List>

            <Tabs.Panel value={"first"}>
                <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                    <Grid>
                        {postCards}
                        {posts.length === 0 && <Title order={3} size={17}>Up to date!</Title>}
                    </Grid>
                </Paper>
            </Tabs.Panel>
            <Tabs.Panel value={"second"}>
            <Paper shadow="xl" radius="lg" p="md" pt={"lg"}>
                {/* I'm thinking on adding a carousel here */}
                    <Grid style={{display:"flex", flexDirection:"row"}}>
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Image
                        radius="md"
                        src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        alt="Random unsplash image"
                    />
                    </div>
                    <div style={{ width: 240, marginLeft: 'auto', marginRight: 'auto' }}>
                    <Image
                        radius="md"
                        src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                        alt="Random unsplash image"
                    />
                    </div>
                    </Grid>
                </Paper>
            </Tabs.Panel>
            <Tabs.Panel value={"third"}>
                <Paper shadow="xl" radius="lg" p="md">
                    <ManageProfile />
                </Paper>
            </Tabs.Panel>
        </Tabs>
    )
}
