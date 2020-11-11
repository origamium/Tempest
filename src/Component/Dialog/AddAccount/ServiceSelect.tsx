import * as React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Collapse,
    Avatar,
    Typography,
    Button,
    Radio,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { styled } from "../../../Theme";
import { ProviderSelector } from "./AddAccount";

export type ServiceSelectProps = {
    list: ProviderSelector;
    handleSubmitProvider: (key: string) => void;
    handleClose: () => void;
};

const Styled = {
    Actions: styled.div`
        width: 100%;
        display: flex;
        justify-content: space-between;
    `,
};

export const ServiceSelect: React.FC<ServiceSelectProps> = ({ list, handleSubmitProvider, handleClose }) => {
    const [listOpen, setListOpen] = React.useState<string[]>([]);
    const [selected, setSelect] = React.useState<string>();

    const handleClickExpandableListItem = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const target = e.currentTarget.dataset.listname;
        if (target) {
            setListOpen((prev) => (prev.includes(target) ? prev.filter((v) => v !== target) : [...prev, target]));
        }
    }, []);

    const handleSelectProvider = React.useCallback((e: React.SyntheticEvent<HTMLDivElement>) => {
        const target = e.currentTarget.dataset.providerKey;
        if (target) {
            setSelect(target);
        }
    }, []);

    const handleNext = React.useCallback(() => {
        if (selected) {
            handleSubmitProvider(selected);
        }
    }, [handleSubmitProvider, selected]);

    return (
        <>
            <DialogTitle>
                <Typography>{"Select Provider"}</Typography>
            </DialogTitle>
            <DialogContent>
                <List style={{ minWidth: "280px", maxWidth: "480px", width: "80%", overflow: "auto" }}>
                    {list.map((item, i) => (
                        <div key={i}>
                            <ListItem
                                button
                                alignItems={"flex-start"}
                                data-listname={item.service}
                                onClick={handleClickExpandableListItem}
                            >
                                <ListItemText primary={item.name} />
                                {listOpen.includes(item.service) ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={listOpen.includes(item.service)} timeout="auto" unmountOnExit>
                                {item.providers.map((v, i) => (
                                    <ListItem
                                        key={i}
                                        button
                                        alignItems={"flex-start"}
                                        data-provider-key={v.key}
                                        onClick={handleSelectProvider}
                                    >
                                        <ListItemAvatar>
                                            <Avatar src={v?.icon}>{v.name.slice(0, 2)}</Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={v.name} secondary={v?.description} />
                                        <Radio value={v.key} checked={v.key === selected} />
                                    </ListItem>
                                ))}
                            </Collapse>
                        </div>
                    ))}
                </List>
            </DialogContent>
            <DialogActions>
                <Styled.Actions>
                    <Button variant="contained" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="primary" disabled={!selected} onClick={handleNext}>
                        Next
                    </Button>
                </Styled.Actions>
            </DialogActions>
        </>
    );
};
