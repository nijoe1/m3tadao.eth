import { useAccount, useSigner } from "wagmi"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { Orbis } from "@orbisclub/orbis-sdk"
import useOrbis from "../../hooks/useOrbis"

const AuthWrapper = (props) => {
    // const {Component, pageProps} = props
    const router = useRouter()
    const { data: signer } = useSigner()

    const [mounted, setMounted] = useState(false)
    const orbis = new Orbis()
    const { isConnected, isDisconnected, status } = useAccount()
    // const { connectOrbis } = useOrbis()
    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        console.log("authwrapper", signer)
        if (router && orbis) {
            if (isDisconnected && router.pathname !== "/" && router.pathname !== "/registration") {
                handleAuth()
            }
        }
    }, [status, router, orbis])

    const handleAuth = async () => {
        let connectStatus = await orbis.isConnected()
        if (connectStatus.status != 200) {
            const res = await orbis.connect(window.ethereum)
        } else {
            console.log("reached")
            router.push("/")
        }
        connectStatus = await orbis.isConnected()
        if (connectStatus.status == 200) {
            console.log("reached")
            router.push("/")
        }
    }

    return mounted && isConnected
        ? props.children
        : router.pathname === "/" || router.pathname === "/registration"
        ? props.children
        : null
}

export default AuthWrapper
