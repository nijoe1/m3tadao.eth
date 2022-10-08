import { ethers } from "ethers"
import { contractAddresses, lensAbi, m3taDaoAbi, valistAbi } from "../constants/"
import { useAccount, useSigner } from "wagmi"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../utils/uploadToIpfs"
import { v4 as uuidv4 } from "uuid"
import { defaultAbiCoder } from "ethers/lib/utils"
import useOrbis from "./useOrbis"
import { AccountMeta, create } from "@valist/sdk"

const isJsonEmpty = (jsonObj) => {
    return (
        jsonObj &&
        Object.keys(jsonObj).length === 0 &&
        Object.getPrototypeOf(jsonObj) === Object.prototype
    )
}

const useContract = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const { address } = useAccount()
    const { updateProfile, createOrbisGroup, connectOrbis } = useOrbis()

    const createUserProfile = async (
        orbisDid,
        userAddress,
        handle, // name
        image,
        banner,
        description,
        designation,
        github,
        twitter,
        website,
        interests,
        skills
    ) => {
        const externalJson = {
            website,
            twitter,
            github,
            interests,
            skills,
            designation,
        }

        let bannerURI
        if (banner) {
            bannerURI = await uploadFileToIpfs(banner, "image")
        } else {
            bannerURI = ""
        }

        let imageURI
        if (image) {
            imageURI = await uploadFileToIpfs(image, "image")
        } else {
            imageURI = ""
        }

        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        const res = await updateProfile(imageURI, bannerURI, handle, description, externalJson)
        console.log("res", res)

        // const groupId = await createOrbisGroup(imageURI, handle, description)
        const tx = await m3taDaoContractInstance.indexProfile(
            orbisDid,
            groupId.doc,
            handle,
            imageURI,
            description,
            { gasLimit: 500000 }
        )
        return await tx.wait()
    }

    const createProjectAccount = async (
        accountName,
        website,
        image,
        description,
        members
    ) => {
        let imageURI
        if (image) {
            imageURI = await uploadFileToIpfs(image, "image")
        } else {
            imageURI = ""
        }
        const externalJson = { website, description, accountName, imageURI }
        const externalURI = await uploadJsonToIpfs(externalJson, "json")

        // valist
        const valist = await create(signer.provider, { signer, metaTx: true })
        const valistAccountTx = await valist.createAccount(
            accountName,
            new AccountMeta(accountName, description, externalURI, imageURI),
            members
        )
        // console.log("valistAccountTx", valistAccountTx)
        const valistAccountTxRes = await valistAccountTx.wait()
        // console.log("valistAccountTxRes", valistAccountTxRes)

        await connectOrbis()
        const orbisGroup = await createOrbisGroup(imageURI, accountName, description)
        // console.log("orbisGroup", orbisGroup)
        const groupID = orbisGroup.doc

        // console.log("valistAccountTx", valistAccountTx)
        const accountID = await valist.generateID(ethers.BigNumber.from("80001"), accountName)
        // console.log("accountID", accountID)

        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        const tx = await m3taDaoContractInstance.indexProjectOrganization(
            accountID,
            groupID,
            accountName,
            imageURI,
            description,
            {
                gasLimit: 500000,
            }
        )

        return await tx.wait()
    }

    const updateProjectAccountRequirements = async (
        accountID,
        reqTitle,
        reqDescription,
        reqTags,
        reqPrice,
        reqDeadline
    ) => {
        const inputStruct = {
            accountID,
            reqTitle,
            reqDescription,
            reqTags,
            reqPrice,
            reqDeadline,
        }
        const requirementsURI = await uploadJsonToIpfs(inputStruct, "json")

        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        var tx = await m3taDaoContractInstance.updateAccountMetadata(accountID, requirementsURI, {
            gasLimit: 5000000,
        })

        return await tx.wait()
    }

    const createSubProject = async (
        accountID,
        projectName,
        projectType,
        image,
        description,
        // we should add into the members the contract address of metadao to be able to make updates
        members,
        displayName,
        website,
        shortDescription,
        youTubeLink,
        tags
    ) => {
        let imageURI
        if (image) {
            imageURI = await uploadFileToIpfs(image, "image")
        } else {
            imageURI = ""
        }

        const metaURIObject = { displayName, description, website, youTubeLink, tags }
        const metaURI = await uploadJsonToIpfs(metaURIObject, "json")
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        // const ProjectStruct = [
        //     (sender = "0x0000000000000000000000000000000000000000"),
        //     (id = 0),
        //     accountID,
        //     (projectID = "1"),
        //     (metadataTable = "a"),
        //     (projectHex = "e"),
        //     projectName,
        //     metaURI,
        //     projectType,
        //     imageURI,
        //     description,
        //     members,
        // ]

        const ProjectStruct = [
            address,
            "0",
            accountID,
            "1",
            "a",
            "e",
            projectName,
            metaURI,
            projectType,
            imageURI,
            shortDescription,
            [...members, contractAddresses.m3taDao],
        ]

        var tx = await m3taDaoContractInstance.createSubProject(ProjectStruct, {
            gasLimit: 5000000,
        })
        return await tx.wait()
    }

    const createRelease = async (
        projectID,
        releaseName,
        metaURI,
        releaseType,
        imageURI,
        description,
        releaseURI
    ) => {
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        const ReleaseStruct = [
            (sender = "0x0000000000000000000000000000000000000000"),
            (id = "0"),
            (releaseID = "0"),
            projectID,
            (metadataTable = "a"),
            (releaseHex = "a"),
            releaseName,
            metaURI,
            releaseType,
            imageURI,
            description,
            releaseURI,
        ]

        var tx = await m3taDaoContractInstance.createRelease(ReleaseStruct, { gasLimit: 5000000 })
        return await tx
    }

    const createPost = async (accountID, postDescription, postTitle, postGalery) => {
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        let postGaleryURI
        if (postGalery) {
            postGaleryURI = await uploadFileToIpfs(postGalery, "image")
        } else {
            postGaleryURI = ""
        }

        const PostStruct = [address, "0", accountID, "a", postDescription, postTitle, postGalery]

        var tx = await m3taDaoContractInstance.createPost(PostStruct, { gasLimit: 5000000 })
        return await tx.wait()
    }

    const deletePost = async (accountID, postID) => {
        const m3taDaoContractInstance = new ethers.Contract(
            contractAddresses.m3taDao,
            m3taDaoAbi,
            signer
        )

        var tx = await m3taDaoContractInstance.createPost(accountID, postID, { gasLimit: 5000000 })
        return await tx.wait()
    }

    const createLensPost = async (profId, postTitle, postDescription, image) => {
        const lensContractInstance = new ethers.Contract(contractAddresses.lens, lensAbi, signer)

        let imageURI
        if (image) {
            imageURI = await uploadFileToIpfs(image, "image")
        } else {
            imageURI = ""
        }

        // const ipfsResult = await uploadJsonToIpfs({
        //     version: "1.0.0",
        //     mainContentFocus: "TEXT_ONLY",
        //     metadata_id: v4uuid(),
        //     description: description,
        //     locale: "en-US",
        //     content: "Content",
        //     external_url: null,
        //     image: imageURI,
        //     imageMimeType: null,
        //     name: name,
        //     attributes: [],
        //     tags: tags,
        //     appId: "m3tadao.eth",
        // })

        const jsonObj = {
            version: "1.0.0",
            metadata_id: uuidv4(),
            description: postDescription,
            content: postTitle,
            external_url: null,
            image: imageURI,
            imageMimeType: null,
            name: "Post by @donosonaumczuk",
            attributes: [],
            media: [],
            appId: "m3tadao.eth",
            address: address,
        }

        // const jsonObj = {
        //     title: postTitle,
        //     description: postDescription,
        //     image: imageURI,
        //     appId: "m3tadao.eth",
        // }

        const contentURI = await uploadJsonToIpfs(jsonObj, "json")

        const inputStruct = {
            profileId: profId,
            contentURI: contentURI,
            collectModule: contractAddresses.freeCollectModule,
            collectModuleInitData: defaultAbiCoder.encode(["bool"], [true]),
            referenceModule: "0x0000000000000000000000000000000000000000",
            referenceModuleInitData: [],
        }

        var tx = await lensContractInstance.post(inputStruct, { gasLimit: 5000000 })
        return await tx.wait()
    }

    const getLensPostCount = async (profId) => {
        const lensContractInstance = new ethers.Contract(contractAddresses.lens, lensAbi, signer)
        console.log("profID", profId)
        var tx = await lensContractInstance.getPubCount(profId, { gasLimit: 5000000 })
        return tx.toString()
    }

    // pubId is probably count number
    const getLensPost = async (profId, pubId) => {
        const lensContractInstance = new ethers.Contract(contractAddresses.lens, lensAbi, signer)
        console.log("profID", profId)
        var tx = await lensContractInstance.getPub(profId, pubId, { gasLimit: 5000000 })
        return tx.toString()
    }

    const createFollow = async (profileIDs) => {
        const lensContractInstance = new ethers.Contract(contractAddresses.lens, lensAbi, signer)

        var tx = await lensContractInstance.follow(profileIDs, [[]], { gasLimit: 5000000 })
        return await tx.wait()
    }

    const addValistMember = async (accountID, newUserWalletAddress) => {
        const valistContractInstance = new ethers.Contract(
            contractAddresses.valist,
            valistAbi,
            signer
        )

        var tx = await valistContractInstance.addAccountMember(accountID, newUserWalletAddress, {
            gasLimit: 5000000,
        })
        return await tx.wait()
    }

    const deleteValistMember = async (accountID, newUserWalletAddress) => {
        const valistContractInstance = new ethers.Contract(
            contractAddresses.valist,
            valistAbi,
            signer
        )

        var tx = await valistContractInstance.removeAccountMember(
            accountID,
            newUserWalletAddress,
            { gasLimit: 5000000 }
        )
        return await tx.wait()
    }

    return {
        createUserProfile,
        createProjectAccount,
        updateProjectAccountRequirements,
        createSubProject,
        createRelease,
        createPost,
        deletePost,
        createLensPost,
        getLensPostCount,
        getLensPost,
        createFollow,
        addValistMember,
        deleteValistMember,
    }
}

export default useContract
