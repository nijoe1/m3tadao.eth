import { createStyles, Image, Container, Title, Button, Group, Text, List, ThemeIcon, Grid, useMantineTheme, Card, BackgroundImage,MantineProvider } from '@mantine/core';
import { IconCheck } from '@tabler/icons';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Menu } from '../Menu/Menu'
import { Footer } from '../Footer';
import{} from '@tabler/icons'

const useStyles = createStyles((theme) => ({
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: theme.spacing.xl * 4,
  },

  sndSection: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
  spaceForGrid:{
    paddingTop:"50px",   
    paddingBottom:"50px", 
  },
  span: {
    fontWeight: 800,
  },
  content: {
    maxWidth: 480,
    marginRight: theme.spacing.xl * 3,

    [theme.fn.smallerThan('md')]: {
      maxWidth: '100%',
      marginRight: 0,
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 44,
    lineHeight: 1.2,
    fontWeight: 900,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 28,
    },
  },
  subtitle: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 30,
    lineHeight: 1.2,

    [theme.fn.smallerThan('xs')]: {
      fontSize: 24,
    },
  },
  hrS: {
    height: '3px',
    width: '20%',
    backgroundColor: '#228be6',
    border: 'none',

  },
  control: {
    [theme.fn.smallerThan('xs')]: {
      flex: 1,
    },
  },

  image: {
    flex: 1,
    paddingRight: "80px",
    width: "150%",
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  highlight: {
    position: 'relative',
    backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    borderRadius: theme.radius.sm,
    padding: '4px 12px',
    textAlign: 'center',
    fontSize: "40px",
  },
}));

export function Hero() {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[7];

  return (
    <div>

      <BackgroundImage
        src={"./Background.png"}
        radius="sm"
      >
    
            <Container>
        <Menu links={[{ link: "https://github.com/Suhel-Kap/m3tadao", label: "Source Code" }, 
        { link: "https://m3tadao.vercel.app/", label: "Connect Wallet" }
        ]} />
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              <span className={classes.highlight}>Have an idea,<br/> make it real</span>
            </Title>
            <Text color="dimmed" mt="md">
              A decentralised social network for web3 creators. Developers, designers, artists everyone is
              welcome on our platform to create the next big thing seamlessly.
            </Text>

            <List
              mt={30}
              spacing="sm"
              size="sm"
              icon={
                <ThemeIcon size={20} radius="xl">
                  <IconCheck size={12} stroke={1.5} />
                </ThemeIcon>
              }
            >
              <List.Item>
                <b>Build Together</b> – collaborate with other creators to build the next big thing
              </List.Item>
              <List.Item>
                <b>Network</b> – connect with other creators and build your network
              </List.Item>
              <List.Item>
                <b>Grow</b> – enhance your skills by working with other creators
              </List.Item>
            </List>

            <Group mt={30}>
              <ConnectButton showBalance={false} />
              {/* <Link href={"https://github.com/Suhel-Kap/m3tadao"} passHref>
                                <Button component={"a"} target={"_blank"} variant="default" radius="md" size="md" className={classes.control}>
                                    Source code
                                </Button>
                            </Link> */}
            </Group>
          </div>

          <Image src={"./pic.png"} className={classes.image} width={"150%"} />
        </div>
        <div className={classes.sndSection}>
          <Title className={classes.subtitle}>
            <div>The most useful tool in Web3 <br />is all about you</div>
            <hr className={classes.hrS} />
          </Title>
          <Text color="dimmed" mt="md">
            You have a <span className={classes.span}> big idea</span> but you don't have the tools for make it real -<span className={classes.span}> We've got you</span>.<br />
            You knowledge is amazing but you can't <span className={classes.span}>show it up</span> in your enviroment -<span className={classes.span}> We've got you</span>.
          </Text>
        </div>
        <div className={classes.spaceForGrid}>
          <Grid justify="space-around" mt="lg">
          <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
            <Card shadow="sm">
              <Card.Section>
                <Image
                  src={"./hero.svg"} height={160}
                  alt="Create"
                />
              </Card.Section>

              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text weight={500}>I have an idea</Text>
                
              </Group>

              <Text
                size="sm"
                style={{ color: secondaryColor, lineHeight: 1.5 }}
              >
Think Big, think rich. Everyone has ideas, not everyone makes them come true. Don't let them get away from you!              
 {/* "Think Big, think rich, think forwards, believe in yourself and 
                always have your next ideas ready to turn into ventures 
                for the future..." - Linda Corby. */}
              </Text>

              {/* <Button
                variant="light"
                color="blue"
                fullWidth
                style={{ marginTop: 14 }}
              >
                See more info
              </Button> */}
            </Card>
          </Grid.Col>
          <Grid.Col style={{ maxWidth: 350 }} sm={4} xs={4}>
            <Card shadow="sm">
              <Card.Section>
                <Image
                  src={"./hero.svg"} height={160}
                  alt="Team"
                />
              </Card.Section>

              <Group
                position="apart"
                style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
              >
                <Text weight={500}>I have the knowledge</Text>
                
              </Group>

              <Text
                size="sm"
                style={{ color: secondaryColor, lineHeight: 1.5 }}
              >
Now you just need the action. We will guide you through 
the process of finding the perfect idea for you.
</Text>
            </Card>
          </Grid.Col>
        </Grid></div>
       
              </Container>
              <div className={classes.sndSection}>
           <Title className={classes.subtitle}>
            <div>Get Rewarded </div>
            <hr className={classes.hrS} />
          </Title>
          <Text color="dimmed" mt="md">
              Beyond satisfaction and other surprises we prepared for you.<br/>
              We'll feature <span className={classes.span}>your photo</span>, or your bussines logo
              in <span className={classes.span}>the first section</span> of this landing page for a week <br/>
              And after three weeks of being posted there, you will have another surprise.
          </Text>
          <Group mt={30}>
          <ConnectButton showBalance={false}/>
          </Group>
          <Group mt={30}></Group>
        </div>
       
              </BackgroundImage>
              <Footer/>
    </div>
  );
}