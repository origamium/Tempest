import { Avatar, List, ListItem, Paper, Popper, Typography } from "@material-ui/core";
import * as React from "react";
import { styled } from "../../Theme";
import { SyntheticEvent } from "react";

export type StatusPopperProps = {
    checkButtonEl: HTMLElement | null;
};

export type StatusPopperHooksType = {
    checkButtonEl: HTMLElement | null;
    handleClickCheckButton: (e: SyntheticEvent<HTMLElement>) => void;
};

export const useStatusPopper = (): StatusPopperHooksType => {
    const [checkButtonEl, setCheckButtonEl] = React.useState<null | HTMLElement>(null);
    const handleClickCheckButton = React.useCallback(
        (e: SyntheticEvent<HTMLElement>) => {
            e.preventDefault();
            if (checkButtonEl) {
                setCheckButtonEl(null);
            } else {
                setCheckButtonEl(e.currentTarget);
            }
        },
        [checkButtonEl]
    );

    return { checkButtonEl, handleClickCheckButton };
};

const Styled = {
    OperationalPopperPaper: styled(Paper)`
        padding: 1em 0.3em;
    `,
    ListItemBody: styled.div`
        display: flex;
        & > * {
            margin: 0.2em;
        }
    `,
};

export const StatusPopper: React.FC<StatusPopperProps> = ({ checkButtonEl }) => {
    return (
        <Popper open={!!checkButtonEl} anchorEl={checkButtonEl} placement="bottom-end">
            <Styled.OperationalPopperPaper>
                <Typography variant={"h5"} style={{ marginLeft: "1rem" }}>
                    Status
                </Typography>
                <Typography variant={"body1"}>
                    <List>
                        <ListItem>
                            <Styled.ListItemBody>
                                <div>
                                    <Avatar
                                        variant="square"
                                        src={"https://symbols.getvecta.com/stencil_104/15_zeit-icon.003d7d67b7.png"}
                                    />
                                </div>
                                <div>
                                    <Typography variant={"body1"}>Vercel</Typography>
                                    <Typography
                                        variant={"body2"}
                                    >{`Using: Web Page Hosting, Service Authorization Functions.`}</Typography>
                                    <Typography>
                                        <a
                                            rel={"noreferrer noopener"}
                                            target={"_blank"}
                                            href={"https://www.vercel-status.com/"}
                                        >
                                            {"Status Page"}
                                        </a>
                                    </Typography>
                                </div>
                            </Styled.ListItemBody>
                        </ListItem>
                    </List>
                </Typography>
            </Styled.OperationalPopperPaper>
        </Popper>
    );
};
