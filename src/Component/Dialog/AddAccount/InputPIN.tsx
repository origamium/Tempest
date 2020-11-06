import * as React from "react";
import { Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";

export type InputPINProps = {
    providerKey: string;
    handleSubmitPIN: (providerKey: string, code: string) => void;
};

export const InputPIN: React.FC<InputPINProps> = () => {
    return (
        <form>
            <DialogTitle>
                <Typography>{"Input PIN"}</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField label={"INSERT PIN HERE"} variant={"filled"} />
                <DialogActions>
                    <Button variant="contained" color="primary">
                        {"Activate"}
                    </Button>
                </DialogActions>
            </DialogContent>
        </form>
    );
};
