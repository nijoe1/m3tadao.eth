import {
    Stack,
    Text,
    ScrollArea,
} from '@mantine/core';

import {Dropzone} from '@mantine/dropzone';
import * as Icon from 'tabler-icons-react';
import useStyles from './FileInput.styles';

export interface FileInputProps {
    onChange: (files: File[]) => void;
    value?: File[];
}

export function FileInput(props: FileInputProps) {
    const {classes} = useStyles();
    return (
        <Dropzone
            classNames={classes}
            onDrop={props.onChange}
            multiple
        >
            <Stack align="center" justify="center" style={{height: '100%'}}>
                <Icon.FileUpload color={'#9595A8'} size={64}/>
                <Text color="dimmed">Click or drop files to upload.</Text>
            </Stack>
        </Dropzone>
    );
}