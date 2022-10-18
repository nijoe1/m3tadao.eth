import Link from 'next/link'
import orbisStyles from "../../styles/orbis.module.css"
/** Global group component displaying the pfp and group name */
export function Group({id, details, isLink, showPfp = true}) {
  if(isLink) {
    return (
        <div className={orbisStyles["group-container"] + " " + orbisStyles["pointer"]}>
            {showPfp &&
                <div className={orbisStyles["group-pfp-container"]}>
                    {details?.pfp ?
                        <img src={details.pfp} className={orbisStyles["pfp"]}/>
                        :
                        <img src="/img/empty-state.png" className={orbisStyles["pfp"]}/>
                    }
                </div>
            }
            <div className={orbisStyles["group-name"]}>
                <Link href={"/group/" + id}>{details?.name ? details.name : "no-name"}</Link>
            </div>
        </div>
    )
  } else {
    return (
        <div className={orbisStyles["group-container"]}>
            {showPfp &&
                <div className={orbisStyles["group-pfp-container"]}>
                    {details?.pfp ?
                        <img src={details.pfp} className={orbisStyles["pfp"]}/>
                        :
                        <img src="/img/empty-state.png" className={orbisStyles["pfp"]}/>
                    }
                </div>
            }
            <div className={orbisStyles["group-name"]}>{details?.name}</div>
        </div>
    )
  }

}
