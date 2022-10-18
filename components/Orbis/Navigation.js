import React, {useState, useEffect, useRef, useContext} from 'react';
import Link from 'next/link'
import {useRouter} from 'next/router'
import orbisStyles from "../../styles/orbis.module.css"
/** Import internal components */
import {GroupDetails} from "./GroupDetails"

/** Import Context */
import {GlobalContext, ModalsContext} from "../../contexts/GlobalContext";

/** Global component for the left navigation */
export function Navigation() {
    const {user, groups} = useContext(GlobalContext);
    const wrapperRef = useRef(null);

  /** Manage router */
  const router = useRouter()
  const { asPath } = useRouter()
  const { group_id, conversation_id } = router.query;

  return (
      <div className={"navigation-container"} ref={wrapperRef}>
          {/** Show current group details */}
          <div className={orbisStyles["navigation-level-2-container"]}>
              <div className={orbisStyles["navigation-level-2"]}>
                  <div className={orbisStyles["item-group-label"]}>GROUP DETAILS</div>
                  <div className={orbisStyles["group-menu"]}>
                      <GroupDetails/>
                  </div>
              </div>
          </div>
      </div>
  )
}
