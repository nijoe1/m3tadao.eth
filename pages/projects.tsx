import {Layout} from "../components/Layout";
import Head from "next/head";
import {Button, Title, Container, Skeleton} from "@mantine/core";
import {DisplayGrid} from "../components/DisplayGrid";
import {useEffect, useState} from "react";
import Link from "next/link";
import useTableland from "../hooks/useTableland";

export default function Projects() {
    const [onLoad, setOnLoad] = useState(true)
    const {getAllProjects} = useTableland()
    const [projectsData, setProjectsData] = useState([])

    useEffect(() => {
        initialize()
    }, [])

    const initialize = async () => {
        const projectsData = await getAllProjects()
        console.log("projectsData", projectsData)
        setProjectsData(projectsData)
        setOnLoad(false)
    }

    return (
        <Layout>
            <Title style={{paddingTop:"20px", paddingLeft:"30px"}} order={2}>Projects</Title>

            <Head>
                <title>Projects - m3tadao</title>
                <meta name="description" content="Organisations"/>
            </Head>
            <Container>
            
                <Skeleton visible={onLoad} animate={true}>
                <Title order={4} style={{paddingTop:"30px", paddingLeft:"14px"}}>
                                Here you'll find M3tadao's parallel projects 
                    <Title order={6} weight={200} color="dimmed">Explain how this work.</Title></Title>

                    <DisplayGrid isOrganisations={false} data={projectsData} onLoad={onLoad}/>
                </Skeleton>
            </Container>
        </Layout>
    )
}