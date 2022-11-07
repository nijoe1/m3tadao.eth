import { HeaderSimple } from "../HeaderSimple"
import { AppShell, MediaQuery, createStyles} from "@mantine/core"
// import { Footer } from "../Footer"
import { Grid, ActionIcon} from "@mantine/core"
import { Sidebar } from "../SideBar"
import { Adds } from "../Adds"


const useStyles = createStyles((theme) => ({

    sideColumn: {      
        paddingTop:"45px",
    },

}));

export function Layout({ children }) {
    const {classes, cx} = useStyles()

    return (
        <>
     
        <AppShell
            padding="md"
            // header={<HeaderSimple />}
            // header={<BottomBar />}
            // footer={<Footer />}
            // show footer only if you're not logged - only for the landing page
            styles={(theme) => ({
                main: {
                    backgroundColor:
                        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
                },
            })}
        >  
         <Grid>
            <Grid.Col className={classes.sideColumn} span={2} px="xl">
                <Sidebar/>
            </Grid.Col>
            <Grid.Col span={8}> {children}
            </Grid.Col> 
            <MediaQuery
                query="(max-width: 1194px)"
                styles={{display:"none" }}>
                    <Grid.Col className={classes.sideColumn} span={2} px="sm">
                        <Adds/>
                    </Grid.Col>
            </MediaQuery>
            
            
        </Grid>

        </AppShell>            
        
        </>
    )
}
