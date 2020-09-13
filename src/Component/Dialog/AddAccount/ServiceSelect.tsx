import * as React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Typography,
    Button,
} from "@material-ui/core";
import { useDialog } from "../../../hooks/useDialog";

type ServiceView = {
    key: string;
    name: string;
    icon?: string;
    description?: string;
};

export type ServiceSelectProps = {};

export const ServiceSelect: React.FC<ServiceSelectProps> = () => {
    const [, , handleClose] = useDialog();
    // todo
    const services = React.useMemo<ServiceView[]>(() => {
        return [
            {
                key: "twitter:twitter",
                name: "Twitter",
            },
            {
                key: "mastodon:pawoo",
                name: "Pawoo",
            },
        ];
    }, []);

    return (
        <>
            <DialogTitle>
                <Typography>{"Select Provider"}</Typography>
            </DialogTitle>
            <DialogContent>
                <List>
                    {services.map((item) => (
                        <>
                            <ListItem alignItems={"flex-start"}>
                                <ListItemAvatar>
                                    <Avatar src={item?.icon}>{item.name}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={item?.description} />
                            </ListItem>
                            <Divider />
                        </>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleClose}>
                    Cancel
                </Button>
            </DialogActions>
        </>
    );
};
