import * as React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";

export type FieldProps = {
    /* unique key */
    id: string;
    /* text field helper text */
    helperText?: string;
    /* warn? */
    warn?: string;
    /* error*/
    error?: string;
    /* text field max row */
    maxRow?: number;
    /* field string */
    value: string;
    /* field onChange function */
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Styled = {
    Root: styled.div`
        flex: auto 1 0;
    `
};

export const Field: React.FunctionComponent<FieldProps> = ({
    id,
    helperText,
    warn,
    error,
    maxRow,
    value,
    handleChange
}) => {
    const getHelperText = React.useMemo(() => {
        if (error || warn) {
            return error ? error : warn || "";
        }
        return helperText || "";
    }, [error, helperText, warn]);

    return (
        <Styled.Root>
            <TextField
                value={value}
                onChange={handleChange}
                helperText={getHelperText}
                id={id}
                error={!!error}
                multiline={true}
                margin="none"
                fullWidth={true}
                rowsMax={maxRow}
            />
        </Styled.Root>
    );
};

Field.defaultProps = {
    error: undefined,
    warn: undefined,
    maxRow: 6
};

export default Field;
