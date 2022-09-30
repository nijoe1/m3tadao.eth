import {useAccount, useSigner} from "wagmi"
import {useRouter} from "next/router"
import {useEffect, useState} from "react"

const AuthWrapper = (props) => {
    // const {Component, pageProps} = props
    const router = useRouter()
    const {data: signer} = useSigner()

    const [mounted, setMounted] = useState(false)
    const {isConnected, isDisconnected, status} = useAccount()
    useEffect(() => {
        setMounted(true)
    }, [])
    useEffect(() => {
        console.log("authwrapper", signer)
        if (router) {
            if (isDisconnected && router.pathname !== "/" && router.pathname !== "/registration") {
                console.log("reached")
                router.push("/")
            }
        }
    }, [status, router])

    return (mounted &&
        isConnected
            ? props.children
            : router.pathname === "/" || router.pathname === "/registration"
                ? props.children
                : null
    )
}

export default AuthWrapper
