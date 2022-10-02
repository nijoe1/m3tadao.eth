import { Orbis } from "@orbisclub/orbis-sdk"
import { useProvider } from "wagmi"

const useOrbis = () => {
    const orbis = new Orbis()
    // const provider = useProvider()

    const connectOrbis = async () => {
        return await orbis.connect(window.ethereum)
    }

    const createOrbisGroup = async (pfp, name, description) => {
        return await orbis.createGroup({ pfp, name, description })
    }

    const updateOrbisGroup = async (groupId, pfp, name, description) => {
        return await orbis.updateGroup(groupId, { pfp, name, description })
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
        return await orbis.sendMessage({ conversation_id: conversationId, body: content })
    }

    const getOrbisPosts = async (context, did, page = 0) => {
        return await orbis.getPosts({ context, did }, page)
    }

    const getOrbisPost = async (post_id) => {
        return await orbis.getPost(post_id)
    }

    const getOrbisGroup = async (group_id) => {
        return await orbis.getGroup(group_id)
    }

    const getOrbisGroupMembers = async (group_id) => {
        return await orbis.getGroupMembers(group_id)
    }

    const getOrbisIsGroupMember = async (group_id, did) => {
        return await orbis.getIsGroupMember(group_id, did)
    }

    const getOrbisIsChannel = async (channel_id) => {
        return await orbis.getIsChannel(channel_id)
    }

    const getOrbisDids = async (address) => {
        return await orbis.getDids(address)
    }

    const getOrbisProfile = async (address) => {
        return await orbis.getProfile(address)
    }

    const getOrbisProfileGroups = async (did) => {
        return await orbis.getProfileGroups(did)
    }

    const getOrbisIsFollowing = async (did_following, did_followed) => {
        return await orbis.getIsFollowing(did_following, did_followed)
    }

    const getOrbisProfileFollowing = async (did) => {
        return await orbis.getProfileFollowing(did)
    }

    const getOrbisProfileFollowers = async (did) => {
        return await orbis.getProfileFollowers(did)
    }

    const getOrbisConversations = async (did, context) => {
        return await orbis.getConversations({ did, context })
    }

    const getOrbisConversation = async (conversation_id) => {
        return await orbis.getConversation(conversation_id)
    }

    const getOrbisMessages = async (conversation_id) => {
        return await orbis.getMessages(conversation_id)
    }

    return {
        connectOrbis,
        createOrbisGroup,
        updateOrbisGroup,
        createOrbisChannel,
        createOrbisPost,
        updateOrbisChannel,
        createOrbisConversation,
        sendConvoMessage,
        getOrbisPosts,
        getOrbisPost,
        getOrbisGroup,
        getOrbisGroupMembers,
        getOrbisIsGroupMember,
        getOrbisIsChannel,
        getOrbisDids,
        getOrbisProfile,
        getOrbisProfileGroups,
        getOrbisIsFollowing,
        getOrbisProfileFollowing,
        getOrbisProfileFollowers,
        getOrbisConversations,
        getOrbisConversation,
        getOrbisMessages,
    }
}

export default useOrbis
