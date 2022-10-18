import React, {useState, useEffect, useRef, useContext} from 'react';
import {useRouter} from 'next/router'
import {Feed} from "./Feed";
import {RightSide} from "./RightSide";

/** Import Context */
import {GlobalContext} from "../../contexts/GlobalContext";
import orbisStyles from "../../styles/orbis.module.css"

/** Global component for group details */
export default function GroupHome() {
    const {user, setUser, group_id, orbis} = useContext(GlobalContext);
    const [group, setGroup] = useState();

    useEffect(() => {
        loadGroupDetails();
    }, []);

    async function loadGroupDetails() {
        let { data, error } = await orbis.getGroup(group_id);

        if(data) {
            setGroup(data);
        }
    }

    /** Use Next router to get group_id */
    const router = useRouter();
    const { channel_id } = router.query;

    return(
        <>
            <div className={orbisStyles["main-container"]}>
                {/** Feed container */}
                <div className={orbisStyles["main"] + " " + orbisStyles["dashed-card"]}>
                    <div className={orbisStyles["flex-column"] + " " + orbisStyles["flex-1"]}>
                        {/** Show channel details */}
                        <div
                            className={orbisStyles["channel-details"] + " " + orbisStyles["flex-column"] + " " + orbisStyles["v-justify-content-center"] + " " + orbisStyles["mbottom-15"]}>
                            <div className={orbisStyles["flex-row"]}>
                                <img src="/img/icons/group-home-white.png" height="15"
                                     className={orbisStyles["mright-5"]}/>
                                <p className={orbisStyles["m-0"] + " " + orbisStyles["fw-400"]}>home</p>
                            </div>
                            <p className={orbisStyles["secondary"] + " " + orbisStyles["m-0"] + " " + orbisStyles["mtop-5"] + " " + orbisStyles["fs-14"]}>Home
                                channel for this group.</p>
                        </div>

                        {/** Show posts feed */}
                        {group_id &&
                            <Feed type="feed" context={group_id} autoRefresh={true}/>
                        }
                    </div>
                </div>

                {/** Right side */}
                <RightSide type="group-members" details={group_id} />
            </div>
        </>
    )
}