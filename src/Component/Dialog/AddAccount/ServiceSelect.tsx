import * as React from "react";
import {
    DialogTitle,
    DialogContent,
    DialogActions,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemIcon,
    Collapse,
    Avatar,
    Typography,
    Button,
    Radio,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { useDialog } from "../../../hooks/useDialog";
import { styled } from "../../../Theme";

type ProviderListType = {
    key: string;
    name: string;
    icon?: string;
    description?: string;
};

type ServiceListType = {
    service: string;
    name: string;
    providers: ProviderListType[];
};

type ProviderSelector = Array<ProviderListType | ServiceListType>;

export type ServiceSelectProps = {};

const Styled = {
    Actions: styled.div`
      width: 100%;
      display: flex;
      justify-content: space-between;
`
}

export const ServiceSelect: React.FC<ServiceSelectProps> = () => {
    const [, , handleClose] = useDialog();

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
        // todo
    }, [])

    // todo
    const serviceAndProviders = React.useMemo<ProviderSelector>(() => {
        return [
            {
                key: "twitter:twitter",
                name: "Twitter",
            },
            {
                service: "mastodon",
                name: "Mastodon",
                providers: [
                    {
                        key: "mastodon:pawoo",
                        name: "Pawoo",
                        icon: "https://image.internetcom.jp/upload/20170427/images/pawoo.jpg",
                    },
                    {
                        key: "mastodon:poyo",
                        name: "Poyo",
                        description: "mastodon poyo server",
                    },
                ],
            },
            {
                service: "gnu_social",
                name: "GNU Social",
                providers: [
                    {
                        key: "gnu_social:social",
                        name: "Netflix",
                        icon: "https://image.internetcom.jp/upload/20170427/images/pawoo.jpg",
                    },
                    {
                        key: "gnu_social:wawawa",
                        name: "Wawa",
                        description: "mastodon poyo server",
                    },
                ],
            },
        ];
    }, []);

    return (
        <>
            <DialogTitle>
                <Typography>{"Select Provider"}</Typography>
            </DialogTitle>
            <DialogContent>
                <List style={{ minWidth: "280px", maxWidth: "480px", width: "80%", overflow: "auto" }}>
                    {serviceAndProviders.map((item, i) =>
                        "service" in item ? (
                            <>
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
                            </>
                        ) : (
                            <ListItem
                                key={i}
                                button
                                alignItems={"flex-start"}
                                data-provider-key={item.key}
                                onClick={handleSelectProvider}
                            >
                                <ListItemAvatar>
                                    <Avatar src={item?.icon}>{item.name.slice(0, 2)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={item.name} secondary={item?.description} />
                                <Radio value={item.key} checked={item.key === selected} />
                            </ListItem>
                        )
                    )}
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
