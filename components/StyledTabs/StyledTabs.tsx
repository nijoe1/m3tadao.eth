import {Tabs, TabsProps} from "@mantine/core";

export function StyledTabs(props: TabsProps) {
    return (
        <Tabs
            defaultValue={props.defaultValue}
            unstyled
            styles={(theme) => ({
                root: {
                    margin: "md"
                },
                tab: {
                    ...theme.fn.focusStyles(),
                    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
                    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[9],
                    border: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[4]}`,
                    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
                    cursor: 'pointer',
                    fontSize: theme.fontSizes.sm,
                    display: 'flex',
                    alignItems: 'center',

                    '&:disabled': {
                        opacity: 0.5,
                        cursor: 'not-allowed',
                    },

                    '&:not(:first-of-type)': {
                        borderLeft: 0,
                    },

                    '&:first-of-type': {
                        borderTopLeftRadius: theme.radius.md,
                        borderBottomLeftRadius: theme.radius.md,
                    },

                    '&:last-of-type': {
                        borderTopRightRadius: theme.radius.md,
                        borderBottomRightRadius: theme.radius.md,
                    },

                    '&[data-active]': {
                        backgroundColor: theme.colors.blue[7],
                        borderColor: theme.colors.blue[7],
                        color: theme.white,
                    },
                },

                tabIcon: {
                    marginRight: theme.spacing.xs,
                    display: 'flex',
                    alignItems: 'center',
                },

                tabsList: {
                    display: 'flex',
                    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
                        overflowX: 'auto',
                    },
                },
            })}
            {...props}
        />
    );
}