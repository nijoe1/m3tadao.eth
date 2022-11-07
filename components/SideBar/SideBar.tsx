import { IconUserCircle, IconHome, IconSearch, IconBell, IconMail, IconSubtask} from '@tabler/icons';
import { Grid, Avatar, ActionIcon, createStyles, MediaQuery, Button, Image} from "@mantine/core"
import Link from 'next/link';
const useStyles= createStyles((theme)=> ({

    menu: {
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        // paddingTop:"30px",
    },
    buttonH:{
        // backgroundColor: '#00acee',
          border: 0,
          height: 42,
          paddingLeft: 20,
          paddingRight: 25,
          fontWeight: 500,

          '&:hover': {
            backgroundColor: theme.fn.darken('#1A1B1E', 0.05),
          },
    },
    justIcon:{
        marginLeft: "30%",
        marginRight: "30%",
    },
    logo:{
        marginLeft: "20%",
        marginBottom: "5px",
    }

}));

export function Sidebar(){
    const {classes}= useStyles()
    
    return(
        <>           
            <Grid className= {classes.menu}>
                    <Grid.Col span= {4}>
            {/* <Image
                width= "55px"
                src= "/Logo.png"
                className= {classes.logo}
            />      */}
            
            <Avatar size="md" 
                style={{marginLeft:"50%", height:"auto"}}
                src="/Logo.png" />
                        
                    </Grid.Col>
                    <Grid.Col span= {4}>
                        <MediaQuery
                                    query= "(min-width: 1068px)"
                                    styles= {{display:"none" }}>
                                        <ActionIcon size= "lg" className={classes.justIcon}>
                                        <Link href   = {"/home"}>
                                            <IconHome size= {30} />
                                            </Link>                           
                                        </ActionIcon>
                        </MediaQuery>
                        <MediaQuery
                                 query= "(max-width: 1068px)"
                                styles= {{display:"none" }}
                                >

                                   <Button
                                    variant= "subtle"
                                    color= "gray"
                                    size= "lg"
                                    leftIcon= {<IconHome size={25} />}
                                    className= {classes.buttonH}>
                                    Home
                                    </Button>
                        </MediaQuery>
                    </Grid.Col>
                    <Grid.Col span= {4}>
                        <MediaQuery
                                    query= "(min-width: 1068px)"
                                    styles= {{display:"none" }}>
                                        <ActionIcon size= "lg" className={classes.justIcon}>
                                           
                                                <IconSearch size= {30} />
                                                                     
                                        </ActionIcon>
                        </MediaQuery>
                        <MediaQuery
                                 query= "(max-width: 1068px)"
                                styles= {{display:"none" }}
                                >
                                   
                                   <Button
                                    variant= "subtle"
                                    color= "gray"
                                    size= "lg"
                                    leftIcon= {<IconSearch size={25} />}
                                    className= {classes.buttonH}>
                                    Explore
                                    </Button>
                        </MediaQuery>
                    </Grid.Col>
                    <Grid.Col span= {4}>
                        <MediaQuery
                                    query= "(min-width: 1068px)"
                                    styles= {{display:"none" }}>
                                        <ActionIcon size= "lg" className={classes.justIcon}>
                                            <IconBell size= {30} />
                                        </ActionIcon>
                        </MediaQuery>
                        <MediaQuery
                                 query= "(max-width: 1068px)"
                                styles= {{display:"none" }}
                                >
                                   <Button
                                    variant= "subtle"
                                    color= "gray"
                                    size= "lg"
                                    leftIcon= {<IconBell size={25} />}
                                    className= {classes.buttonH}>
                                    Notifications
                                    </Button>
                        </MediaQuery>
                    </Grid.Col>
                    <Grid.Col span= {4}>
                        <MediaQuery
                                    query= "(min-width: 1068px)"
                                    styles= {{display:"none" }}>
                                        <ActionIcon size= "lg" className={classes.justIcon}>
                                                <IconMail size= {30} />
                                        </ActionIcon>
                        </MediaQuery>
                        <MediaQuery
                                 query= "(max-width: 1068px)"
                                styles= {{display:"none" }}
                                >
                                   <Button
                                    variant= "subtle"
                                    color= "gray"
                                    size= "lg"
                                    leftIcon= {<IconMail size={25} />}
                                    className= {classes.buttonH}>
                                    Messages
                                    </Button>
                        </MediaQuery>
                    </Grid.Col>
                    <Grid.Col span= {4}>
                        <MediaQuery
                                    query= "(min-width: 1068px)"
                                    styles= {{display:"none" }}>
                                        <ActionIcon size= "lg" className={classes.justIcon}>
                                                {/* this is gonna be the dashboard */}
                                            <IconSubtask size= {30} />
                                        </ActionIcon>
                        </MediaQuery>
                        <MediaQuery
                                 query= "(max-width: 1068px)"
                                styles= {{display:"none" }}
                                >
                                        <Button
                                            variant= "subtle"
                                            color= "gray"
                                            size= "lg"
                                            leftIcon= {<IconSubtask size={25} />}
                                            className= {classes.buttonH}>
                                            Manage
                                        </Button>
                        </MediaQuery>
                    </Grid.Col>
                    <Grid.Col span= {4}>
                        <MediaQuery
                                    query= "(min-width: 1068px)"
                                    styles= {{display:"none" }}>
                                        <ActionIcon size= "lg" className={classes.justIcon}>
                                            <IconUserCircle size= {30} />
                                        </ActionIcon>
                        </MediaQuery>
                        <MediaQuery
                                 query= "(max-width: 1068px)"
                                styles= {{display:"none" }}
                                >
                                   <Button
                                    variant= "subtle"
                                    color= "gray"
                                    size= "lg"
                                    leftIcon= {<IconUserCircle size={25} />}
                                    className= {classes.buttonH}>
                                    Profile
                                    </Button>
                        </MediaQuery>
                    </Grid.Col>
                   
                </Grid>
        </>
    )
}