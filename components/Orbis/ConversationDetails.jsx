import React, {useState, useEffect, useRef, useContext} from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import {getChannelIcon} from "../../utils";
import useIsGroupAdmin from "../../hooks/useIsGroupAdmin";
import {Feed} from "./Feed";
import {RightSide} from "./RightSide";
import orbisStyles from "../../styles/orbis.module.css"
/** Import Context */
import {GlobalContext, ModalsContext} from "../../contexts/GlobalContext";

import {useRouter} from 'next/router'

export default function ConversationDetails() {
    const [loading, setLoading] = useState(true);
    const [conversation, setConversation] = useState();

    const {user, conversationId, orbis} = useContext(GlobalContext);

    useEffect(() => {
        if(conversationId) {
            loadConversationDetails();
        }
    }, [conversationId])

    /** Load channels details */
    async function loadConversationDetails() {
        setLoading(true);
        let { data, error } = await orbis.getConversation(conversationId);
        console.log(data);

        if(error) {
            console.log("There was an error loading the conversation details: ", error);
        }

        if(data) {
            setConversation(data);
            setLoading(false);
        }
    }

    return (
        <>
            <Head>
                <title key="title">Orbis | Conversation details</title>
                <meta name="description"
                      content="Orbis is a fully decentralized social layer for the internet that any developers can use to build their own social apps or features."
                      key="description"></meta>
                <meta property="og:title" content={"Orbis | Group details"} key="og_title"/>
                <meta property="og:description"
                      content="Orbis is a fully decentralized social layer for the internet that any developers can use to build their own social apps or features."
                      key="og_description"/>
                <meta name="twitter:site" content="@OrbisClub"/>
                <meta property="og:image" content="/img/og_image.png"/>
                <meta name="twitter:card" content="app"/>
            </Head>
            <div className={orbisStyles["main-container"]}>
                {/** Feed container */}
                <div className={orbisStyles["main"] + " " + orbisStyles["dashed-card"]}>
                    {loading == false && conversation ?
                        <div className={orbisStyles["flex-column"] + " " + orbisStyles["flex-1"]}>
                            {/** Show channel details */}
                            <div
                                className={orbisStyles["channel-details"] + " " + orbisStyles["flex-row"] + " " + orbisStyles["v-justify-content-center"] + " " + orbisStyles["mbottom-15"]}>
                                <div className={orbisStyles["flex-column"] + " " + orbisStyles["flex-1"]}>
                                    <div className={orbisStyles["flex-row"]}>
                                        <img src={getChannelIcon(conversation, true)} height="15"
                                             className={orbisStyles["mright-5"]}/>
                                        <p className={orbisStyles["m-0"] + " " + orbisStyles["fw-400"]}>{conversation.content.name}</p>
                                    </div>
                                    {conversation.content.description &&
                                        <p className={orbisStyles["secondary"] + " " + orbisStyles["m-0"] + " " + orbisStyles["mtop-5"] + " " + orbisStyles["fs-14"]}>{conversation.content.description}</p>
                                    }
                                </div>
                                <div className={orbisStyles["flex"] + " " + orbisStyles["v-align-items-start"]}>
                                    {conversation &&
                                        <EditChannelContainer channel={conversation} setChannel={setConversation}/>
                                    }
                                </div>
                            </div>

                            {/** Show posts feed */}
                            <Feed type={conversation.content.type ? conversation.content.type : "feed"}
                                  encryptionRules={conversation.content?.encryptionRules} context={"m3tadao"}
                                  autoRefresh={true}/>
                        </div>
                        :
                        <p className={orbisStyles["center"] + " " + orbisStyles["w-100"]}>
                            <img src="/img/icons/loading-white.svg" height="35"/>
                        </p>
                    }

                </div>

                {/** Right side */}
                <RightSide type="group-members" details={conversationId} />
            </div>
        </>
    )
}

/** Container of the edit channel button */
function EditChannelContainer({channel, setChannel}) {
    const { user, orbis } = useContext(GlobalContext);
    const { setModalVis } = useContext(ModalsContext);
    const isAdmin = useIsGroupAdmin(user, channel);

    if(isAdmin) {
        return (
            <button className={orbisStyles["btn"] + " " + orbisStyles["white-border"]}
                    onClick={() => setModalVis("update-channel", true, channel, setChannel)}><img
                src="/img/icons/edit-white.png" height="12" className="mright-5"/><span>Edit</span></button>
        )
    } else {
        return null;
    }
}