import * as React from "react";
import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
    Popper,
    Paper,
    List,
    ListItem,
    Avatar,
    Button
} from "@material-ui/core";
import { NetworkCheck } from "@material-ui/icons";
import { styled } from "../../Theme";
import { StatusPopper, useStatusPopper } from "./Status";

const Styled = {
    Body: styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    `,
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

export const Header: React.FC = () => {
    const { checkButtonEl, handleClickCheckButton } = useStatusPopper();

    return (
        <>
            <AppBar position="relative" style={{ zIndex: 0 }}>
                <Toolbar>
                    <Styled.Body>
                        <Typography variant="h6">Tempest</Typography>
                        <div>
                            <IconButton onClick={handleClickCheckButton}>
                                <NetworkCheck style={{ fill: "white" }} />
                            </IconButton>
                            <Button variant={"contained"}>
                                <Typography variant="button">Sign in</Typography>
                            </Button>
                        </div>
                    </Styled.Body>
                </Toolbar>
            </AppBar>
            <StatusPopper checkButtonEl={checkButtonEl} />
        </>
    );
};
