import Link from 'next/link'
import {getChannelIcon} from "../../utils"
import orbisStyles from "../../styles/orbis.module.css"

/** Global component to display a channel, returns the channel icon and channel name */
export function Channel({id, group_id, details, isLink}) {
    if (isLink) {
        return (
            <div className={orbisStyles["channel-container"] + " " + orbisStyles["pointer"]}>
                <div className={orbisStyles["channel-icon-container"]}>
                    <img src={getChannelIcon({content: details}, true)} className={orbisStyles["pfp"]}/>
                </div>

                <div className={orbisStyles["channel-name"]}>
                    <Link href={"/group/" + group_id + "/" + id}>{details.name}</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className={orbisStyles["channel-container"]}>
                <div className={orbisStyles["channel-icon-container"]}>
                    <img src={getChannelIcon({content: details}, true)} className={orbisStyles["pfp"]}/>
                </div>
                <div className={orbisStyles["channel-name"]}>{details.name}</div>
            </div>
        )
    }
}
