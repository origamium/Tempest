import * as React from "react";
import { CircularProgress, DialogContent, Typography } from "@material-ui/core";
import { styled } from "../../../Theme";

const Styled = {
    Body: styled.div`
        display: flex;
        justify-content: center;
        align-content: center;
    `,
};

export const Wait: React.FC = () => {
    return (
        <DialogContent>
            <Styled.Body>
                <CircularProgress />
                <Typography>{"Please wait..."}</Typography>
            </Styled.Body>
        </DialogContent>
    );
};
