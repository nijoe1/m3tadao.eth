import { ethers } from "ethers"
import { contractAddresses, lensAbi, m3taDaoAbi, valistAbi } from "../constants/"
import { useAccount, useSigner } from "wagmi"
import { uploadFileToIpfs, uploadJsonToIpfs } from "../utils/uploadToIpfs"
import { v4 as uuidv4 } from "uuid"
import { defaultAbiCoder } from "ethers/lib/utils"
import useOrbis from "./useOrbis"
import { AccountMeta, create, ProjectMeta } from "@valist/sdk"
import { Orbis } from "@orbisclub/orbis-sdk"

const isJsonEmpty = (jsonObj) => {
    return jsonObj && Object.keys(jsonObj).length === 0 && Object.getPrototypeOf(jsonObj) === Object.prototype
}

const useContract = () => {
    const { data: signer, isError, isLoading } = useSigner()
    const { address } = useAccount()
    const { updateProfile, createOrbisGroup, createOrbisChannel, connectOrbis, createOrbisPost } = useOrbis()

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

        const m3taDaoContractInstance = new ethers.Contract(contractAddresses.m3taDao, m3taDaoAbi, signer)

        const res = await updateProfile(imageURI, bannerURI, handle, description, externalJson)
        console.log("res", res)

        const tx = await m3taDaoContractInstance.indexProfile(orbisDid, handle, imageURI, description, { gasLimit: 500000 })
        return await tx.wait()
    }

    const createProjectAccount = async (accountName, website, image, description, members) => {
        console.log("members", members)
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
        const valistAccountTx = await valist.createAccount(accountName, new AccountMeta(accountName, description, externalURI, imageURI), members)
        // console.log("valistAccountTx", valistAccountTx)
        const valistAccountTxRes = await valistAccountTx.wait()
        // console.log("valistAccountTxRes", valistAccountTxRes)

        await connectOrbis()
        const orbisGroup = await createOrbisGroup(imageURI, accountName, description)
        // console.log("orbisGroup", orbisGroup)
        const groupID = orbisGroup.doc

        const requirementsChannel = await createOrbisChannel(groupID, {
            name: "Requirements",
            description: "Requirements for this organisation",
            type: "feed",
        })
        const requirementsChannelID = requirementsChannel.doc

        // console.log("valistAccountTx", valistAccountTx)
        const accountID = await valist.generateID(ethers.BigNumber.from("80001"), accountName)
        // console.log("accountID", accountID)

        const m3taDaoContractInstance = new ethers.Contract(contractAddresses.m3taDao, m3taDaoAbi, signer)

        const tx = await m3taDaoContractInstance.indexProjectOrganization(
            accountID,
            groupID,
            // requirementsChannelID,
            accountName,
            imageURI,
            description,
            {
                gasLimit: 500000,
            }
        )

        return await tx.wait()
    }

    const updateProjectAccountRequirements = async (channelId, reqTitle, reqDescription, reqTags, reqPrice, reqDeadline) => {
        const inputStruct = {
            reqDescription,
            reqTags,
            reqPrice,
            reqDeadline,
        }
        await connectOrbis()
        const post = JSON.stringify(inputStruct)
        const postRes = await createOrbisPost(channelId, { title: reqTitle, body: post })
        return postRes.status === 200
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

        // valist
        const valist = await create(signer.provider, { signer, metaTx: true })
        console.log("valist", valist)
        const meta = new ProjectMeta()
        meta.name = displayName
        meta.description = description
        meta.image = `https://ipfs.io/ipfs/${imageURI}/image`
        meta.external_url = website
        meta.launch_external = website
        meta.short_description = shortDescription
        if (youTubeLink) meta.gallery = [{ name: "", type: "youtube", src: youTubeLink }]
        meta.tags = tags
        // const meta = {
        //     name : displayName,
        //     description : description,
        //     image : `https://ipfs.io/ipfs/${imageURI}/image`,
        //     external_url : website,
        //     launch_external : website,
        //     short_description : shortDescription,
        //     gallery : [{ name: '', type: 'youtube', src: youTubeLink }],
        //     tags : tags
        // };
        console.log("meta", meta)
        const valistProjectTx = await valist.createProject(ethers.BigNumber.from(accountID), projectName, meta, members)
        const temp = await valistProjectTx.wait()
        console.log("temp", temp)
        return temp
    }

    const createRelease = async (projectID, releaseName, metaURI, releaseType, imageURI, description, releaseURI) => {
        const m3taDaoContractInstance = new ethers.Contract(contractAddresses.m3taDao, m3taDaoAbi, signer)

        const ReleaseStruct = [(sender = "0x0000000000000000000000000000000000000000"), (id = "0"), (releaseID = "0"), projectID, (metadataTable = "a"), (releaseHex = "a"), releaseName, metaURI, releaseType, imageURI, description, releaseURI]

        var tx = await m3taDaoContractInstance.createRelease(ReleaseStruct, { gasLimit: 5000000 })
        return await tx
    }

    const createPost = async (accountID, postDescription, postTitle, postGalery) => {
        const m3taDaoContractInstance = new ethers.Contract(contractAddresses.m3taDao, m3taDaoAbi, signer)

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

    const createHiringRequest = async (accountID, title, description) => {
        const m3taDaoContractInstance = new ethers.Contract(contractAddresses.m3taDao, m3taDaoAbi, signer)

        var tx = await m3taDaoContractInstance.createHiringRequest(accountID, title, description, { gasLimit: 5000000 })
        return await tx.wait()
    }

    const deletePost = async (accountID, postID) => {
        const m3taDaoContractInstance = new ethers.Contract(contractAddresses.m3taDao, m3taDaoAbi, signer)

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
        const valistContractInstance = new ethers.Contract(contractAddresses.valist, valistAbi, signer)

        var tx = await valistContractInstance.addAccountMember(accountID, newUserWalletAddress, {
            gasLimit: 5000000,
        })
        return await tx.wait()
    }

    const deleteValistMember = async (accountID, newUserWalletAddress) => {
        const valistContractInstance = new ethers.Contract(contractAddresses.valist, valistAbi, signer)

        var tx = await valistContractInstance.removeAccountMember(accountID, newUserWalletAddress, { gasLimit: 5000000 })
        return await tx.wait()
    }

    return {
        createUserProfile,
        createProjectAccount,
        updateProjectAccountRequirements,
        createSubProject,
        createRelease,
        createPost,
        createHiringRequest,
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
