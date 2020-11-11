import * as React from "react";
import { Button, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@material-ui/core";

export type InputPINProps = {
    providerKey: string;
    handleSubmitPIN: (providerKey: string, code: string) => void;
};

export const InputPIN: React.FC<InputPINProps> = ({ providerKey, handleSubmitPIN }) => {
    const [pin, setPin] = React.useState<string>();
    const handleChangePin = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPin(e.currentTarget.value);
    }, []);

    const handleSubmit = React.useCallback(() => {
        if (pin) {
            handleSubmitPIN(providerKey, pin);
        }
    }, [handleSubmitPIN, pin, providerKey]);

    return (
        <>
            <DialogTitle>
                <Typography>{"Input PIN"}</Typography>
            </DialogTitle>
            <DialogContent>
                <TextField label={"INSERT PIN HERE"} variant={"filled"} value={pin} onChange={handleChangePin} />
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>
                        {"Activate"}
                    </Button>
                </DialogActions>
            </DialogContent>
        </>
    );
};
