import {Orbis} from "@orbisclub/orbis-sdk"
import {useProvider} from "wagmi";

const useOrbis = () => {
    const orbis = new Orbis()
    const provider = useProvider()
    const connectOrbis = async () => {
        return await orbis.connect(provider)
    }

    const createOrbisGroup = async (pfp, name, description) => {
        return await orbis.createGroup({pfp, name, description})
    }

    const updateOrbisGroup = async (groupId, pfp, name, description) => {
        return await orbis.updateGroup(groupId, {pfp, name, description})
    }

    const createOrbisChannel = async (groupId, content) => {
        return await orbis.createChannel(groupId, {
            group_id: groupId,
            name: content.name,
            description: content.description,
            type: content.type, // chat for discord-like, feed for twitter-like
            // TODO: Encryption rules
        })
    }

    const createOrbisPost = async (context, content) => {
        return await orbis.createPost({
            body: content.body,
            title: content.title,
            context,
            mentions: content.mentions || [],
        })
    }



    const updateOrbisChannel = async (groupId, channelId, content) => {
        return await orbis.updateChannel(channelId, {
            group_id: groupId,
            name: content.name,
            description: content.description,
            type: content.type, // chat for discord-like, feed for twitter-like
        })
    }

    const createOrbisConversation = async (recipients, name, description) => {
        return await orbis.createConversation({
            recipients,
            name,
            description,
        })
    }

    const sendConvoMessage = async (conversationId, content) => {
        return await orbis.sendMessage({conversation_id: conversationId, body: content})
    }

    return {
        connectOrbis,
        createOrbisGroup
    }
}