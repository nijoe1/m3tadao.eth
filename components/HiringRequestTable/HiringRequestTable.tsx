import {Avatar, Table, Group, Text, ActionIcon, Menu, ScrollArea, Modal, Title, Center} from '@mantine/core';
import {IconMessages, IconNote, IconTrash, IconDots, IconCheck, IconAlertCircle,} from '@tabler/icons'
import makeBlockie from "ethereum-blockies-base64"
import {useState} from 'react';
import useContract from '../../hooks/useContract';
import {CreateStream} from '../CreateStream';
import {showNotification, updateNotification} from "@mantine/notifications";
import {useRouter} from "next/router";


export function HiringRequestTable({data}: any) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [receiver, setReceiver] = useState("")
    const {deleteHiring} = useContract()
    const router = useRouter()

    let postModal = <Modal
        opened={isModalOpen}
        size="60%"
        transition="fade"
        transitionDuration={500}
        transitionTimingFunction="ease"
        title={<Title>Send Stream <Text color={"dimmed"} size={"sm"}>Powered by Superfluid</Text></Title>}
        onClose={() => setIsModalOpen(false)}>
        <Center>
            <CreateStream receiver={receiver}/>
        </Center>
    </Modal>

    const handleClick = (address: string) => {
        setReceiver(address)
        setIsModalOpen(true)
    }

    const handleDelete = async (hireID: string) => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Deleting request...",
            message: "Please wait while we delete this hiring request",
            autoClose: false,
            disallowClose: true,
        })
        try {

            await deleteHiring(hireID)

            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: "Hiring Request deleted successfully",
                icon: <IconCheck size={16}/>,
                autoClose: 2000,
            })

            router.reload()
        } catch (e) {
            console.log(e)
            updateNotification({
                id: "load-data",
                color: "red",
                title: "Error",
                message: "Failed to delete hiring request",
                icon: <IconAlertCircle size={16}/>,
                autoClose: 2000,
            })
        }

    }

    const rows = data && data.map((item: any) => (
        <tr key={item[0]}>
            <td>
                <Group spacing="sm">
                    <Avatar size={40} src={makeBlockie(item[1])} radius={40}/>
                    <div>
                        <Text size="sm" weight={500}>
                            {item[1].slice(0, 6) + "..." + item[1].slice(-4)}
                        </Text>
                    </div>
                </Group>
            </td>
            <td>
                <Text size="sm">{item[3]}</Text>
            </td>
            <td>
                <Text size="sm">{item[4]}</Text>
            </td>
            <td>
                <Group spacing={0} position="right">
                    <Menu transition="pop" withArrow position="bottom-end">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={16} stroke={1.5}/>
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item icon={<IconMessages size={16} stroke={1.5}/>}>Send message</Menu.Item>
                            <Menu.Item onClick={() => handleClick(item[1])}
                                       icon={<IconNote size={16} stroke={1.5}/>}>Start payment stream</Menu.Item>
                            <Menu.Item onClick={() => handleDelete(item[0])} icon={<IconTrash size={16} stroke={1.5}/>} color="red">
                                Terminate contract
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    return (<>
            <ScrollArea sx={{overflow: "visible"}}>
                <Table sx={{minWidth: 800}} verticalSpacing="md">
                    <tbody>{rows}</tbody>
                </Table>
            </ScrollArea>
            {postModal}
        </>
    );
}