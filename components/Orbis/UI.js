/** Styled Radio Button */
import orbisStyles from "../../styles/orbis.module.css"
export const RadioButton = ({selected, action, labelLeft, labelRight}) => {

    /** Perform select action only if action props is passed */
    function select() {
      console.log("Select action Radio: ", action)
        if(action) {
            action(!selected)
        }
    }

    /** Return component */
    return (
        <div className={orbisStyles["radio-select-container"]} onClick={() => select()}>
            {/** Show label left if exists */}
            {labelLeft &&
                <span className={selected ? "secondary" : "primary fw-500"}>{labelLeft}</span>
            }

            {/** Show radio button selected or not */}
            {selected === true ?
                <div className={orbisStyles["radio-select"] + " " + orbisStyles["selected"]}>
                    <div className={orbisStyles["radio-circle"]}></div>
                </div>
                :
                <div className={orbisStyles["radio-select"]}>
                    <div className={orbisStyles["radio-circle"]}></div>
                </div>
            }

            {/** Show label right if exists */}
            {labelRight &&
                <span className={selected ? "mleft-10 primary fw-500" : "mleft-10 secondary"}>{labelRight}</span>
            }
        </div>
    )
}
