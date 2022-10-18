import React, {useState, useEffect, useRef, useContext} from 'react';
import orbisStyles from "../../styles/orbis.module.css"

/** Modal component */
export function Modal({visible, setVisible, title, tabs, tabSelected = 0, setTabSelected, children}) {

    if (visible) {
        return (
            <>
                {/**  */}
                <div className={orbisStyles["modal-background"]} onClick={() => setVisible(false)}>
                </div>

                <div className={orbisStyles["modal"]}>
                    {/** Show title modal if passed as a parameter */}
                    {title &&
                        <div className={orbisStyles["modal-head"]}>
                            <h2>{title}</h2>
                        </div>
                    }

                    {/** Show navigation tabs if available */}
                    {tabs && tabs.length > 0 &&
                        <div className={orbisStyles["modal-tabs"]}>
                            <Tabs tabs={tabs} tabSelected={tabSelected} setTabSelected={setTabSelected}/>
                        </div>
                    }

                    {/** Show children */}
                    {children}
                </div>
      </>
    )
  } else {
    return null;
  }
}

/** Loop through all tabs and display their content */
function Tabs({tabs, tabSelected, setTabSelected}) {
  return tabs.map((tab, key) => {
    if(key == tabSelected) {
      return(
          <div className={orbisStyles["modal-tab"] + " " + orbisStyles["active"]}>{tab}</div>
      )
    } else {
      return (
          <div className={orbisStyles["modal-tab"]}
               onClick={setTabSelected ? () => setTabSelected(key) : console.log("You haven't added the function to select a new tab.")}>{tab}</div>
      )
    }

  });
}
