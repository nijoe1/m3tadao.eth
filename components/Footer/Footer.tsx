import {createStyles, Container, Group, ActionIcon, Title} from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandLinkedin, IconBrandLinktree } from '@tabler/icons';

const useStyles = createStyles((theme) => ({
    footer: {
        padding: "45px 0px",
        borderTop: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
        }`,
    },

    inner: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    links: {
        [theme.fn.smallerThan('xs')]: {
            marginTop: theme.spacing.md,
        },
    },
}));

export function Footer() {
    const { classes } = useStyles();

    return (
        <div className={classes.footer}>
            <Container className={classes.inner}>
                <Title color={"dimmed"} order={1}>M3tadao</Title>
                <Group spacing={0} className={classes.links} position="right" noWrap>
                    <ActionIcon size="lg">
                        <a href="https://twitter.com/m3tadao" target="_blank" style={{color:"gray"}}><IconBrandTwitter size={18} stroke={1.5} /></a>
                    </ActionIcon>
                    <ActionIcon size="lg">
                      <a href="https://www.youtube.com/channel/UC6dT4HnO7JSQFQT_tMm_kYg" target="_blank" style={{color:"gray"}}>  <IconBrandYoutube size={18} stroke={1.5} /></a>
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <a href="https://www.linkedin.com/company/89174367/admin/" target="_blank" style={{color:"gray"}}><IconBrandLinkedin size={18} stroke={1.5} /></a>
                    </ActionIcon>
                    <ActionIcon size="lg">
                        <a href="https://withkoji.com/@M3tadao" target="_blank" style={{color:"gray"}}><IconBrandLinktree size={18} stroke={1.5} /></a>
                    </ActionIcon>
                </Group>
            </Container>
        </div>
    );
}