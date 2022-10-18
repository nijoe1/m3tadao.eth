import {Avatar, Text, Button, Paper} from '@mantine/core';
import Link from "next/link";
import {useEffect, useState} from "react";

interface ProjectInfoActionProps {
    name: string;
    projectId: string;
    organisationName: string;
    metaURI: string;
}

export function ProjectCard({ name, metaURI, projectId, organisationName}: ProjectInfoActionProps) {
    const [avatar, setAvatar] = useState<string>("");
    const [shortDescription, setShortDescription] = useState<string>("");

    const fetchProjectInfo = async () => {
        const response = await fetch(metaURI);
        const data = await response.json();
        setAvatar(data.image);
        setShortDescription(data.short_description);
    }

    useEffect(() => {
        if(metaURI)
            fetchProjectInfo()
    }, [metaURI])

    return (
        <Paper radius="md" withBorder p="lg"
               sx={(theme) => ({
                   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
               })}>
            <Avatar
                src={avatar}
                size={120} radius={"xs"} mx="auto"/>
            <Text align="center" size="lg" weight={700} mt="md">
                {name}
            </Text>
            <Text align="center" size={"md"}>
                {shortDescription.slice(0, 50)}...
            </Text>

            <Link href={`/project?projId=${projectId}&orgName=${organisationName}`} passHref>
                <Button component={"a"} variant="default" fullWidth mt="md">
                    Show Details
                </Button>
            </Link>
        </Paper>
    );
}