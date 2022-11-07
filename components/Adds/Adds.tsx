import { Grid, createStyles, Title, ScrollArea, Space} from "@mantine/core"
import {HomeProjectCard} from "../../components/HomeProjectCard"


const useStyles = createStyles((theme) => ({

    addsWindow: {
        zIndex: 1,
        display: "flex",
        flexDirection:"column",       
        // paddingTop:"30px",
        paddingLeft:"4px",
        paddingRight:"4px",
    },

}));

export function Adds(){
    const {classes, cx} = useStyles()

    return(
        <>           
            <Grid className={classes.addsWindow}>
            <Title order={4}>This is new...</Title>
            <Space h="md" />
                            <ScrollArea
                                style={{height: "80vh"}}
                                scrollbarSize={4}
                                scrollHideDelay={500}
                            >
                                <HomeProjectCard
                                    title={"m3tadao"}
                                    description={
                                        "Hey all and welcome to m3tadao..."
                                    }
                                    image={"https://images.pexels.com/photos/13291092/pexels-photo-13291092.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                />
                                <HomeProjectCard
                                    title={"moog3"}
                                    description={
                                        "Moog3 is a new type of NFTs..."
                                    }
                                    image={"https://images.pexels.com/photos/12346579/pexels-photo-12346579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                />
                                <HomeProjectCard
                                    title={"moog3"}
                                    description={
                                        "Moog3 is a new type of NFTs..."
                                    }
                                    image={"https://images.pexels.com/photos/12346579/pexels-photo-12346579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                />
                                <HomeProjectCard
                                    title={"moog3"}
                                    description={
                                        "Moog3 is a new type of NFTs..."
                                    }
                                    image={"https://images.pexels.com/photos/12346579/pexels-photo-12346579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                />
                                <HomeProjectCard
                                    title={"moog3"}
                                    description={
                                        "Moog3 is a new type of NFTs..."
                                    }
                                    image={"https://images.pexels.com/photos/12346579/pexels-photo-12346579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                />
                                <HomeProjectCard
                                    title={"moog3"}
                                    description={
                                        "Moog3 is a new type of NFTs..."
                                    }
                                    image={"https://images.pexels.com/photos/12346579/pexels-photo-12346579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                                />
                            </ScrollArea>
                   
                </Grid>
        </>
    )
}