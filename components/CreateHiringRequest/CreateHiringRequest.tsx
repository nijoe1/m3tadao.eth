import { Button, Container, FileInput, Stack, Textarea, TextInput } from "@mantine/core"
import { IconPhoto, IconCheck, IconAlertCircle } from "@tabler/icons"
import { useForm } from "@mantine/form"
import { showNotification, updateNotification } from "@mantine/notifications"
import { useRouter, Router } from "next/router"
import useContract from "../../hooks/useContract"
import useTableland from "../../hooks/useTableland"
import { useAccount } from "wagmi"

export function CreateHiringRequest({ organisationID, title }: any) {
    const router = useRouter()
    console.log("title", title)
    const form = useForm({
        initialValues: {
            title: title,
            description: "",
        },
    })

    const { address } = useAccount()
    const { createHiringRequest } = useContract()

    const handleSubmit = async () => {
        showNotification({
            id: "load-data",
            loading: true,
            title: "Creating hiring request...",
            message: "Please wait while we create your hiring request",
            autoClose: false,
            disallowClose: true,
        })
        try {
            const res = await createHiringRequest(organisationID, form.values.title, form.values.description)

            console.log("res", res)

            updateNotification({
                id: "load-data",
                color: "teal",
                title: "Success",
                message: "Hiring request created successfully",
                icon: <IconCheck size={16} />,
                autoClose: 2000,
            })

            router.reload()
            // router.push("/home")
        } catch (e) {
            console.log(e)
            updateNotification({
                id: "load-data",
                color: "red",
                title: "Error",
                message: "Failed to create hiring request",
                icon: <IconAlertCircle size={16} />,
                autoClose: 2000,
            })
        }
    }

    return (
        <Stack
            sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: {
                    width: "90%",
                },
                width: "50%",
            })}
        >
            <TextInput disabled placeholder="Title" label={"Title"} required {...form.getInputProps("title")} />
            <Textarea placeholder="Why should we hire you?" label={"Description"} required autosize minRows={4} maxRows={6} {...form.getInputProps("description")} />
            <Button onClick={() => handleSubmit()} variant={"filled"}>
                Create Hiring Request
            </Button>
        </Stack>
    )
}
