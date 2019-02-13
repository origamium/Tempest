import * as React from 'react';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';

export type FieldProps = {
    /* unique key */
    id: string,
    /* text field helper text */
    helperText?: string,
    /* warn? */
    warn?: string,
    /* error*/
    error?: string,
    /* text field max row */
    maxRow?: number,
    /* field string */
    value: string,
    /* field onChange function */
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
};

const Styled = {
    Root: styled.div`
        flex: auto 1 0;
    `,
};

const getHelperText = (props: FieldProps): string => {
    if(props.error || props.warn) {
        return props.error ? props.error : props.warn || "";
    }
    return props.helperText || "";
};

export const Field: React.FunctionComponent<FieldProps> = React.memo((props: FieldProps) => (
    <Styled.Root>
        <TextField
            value={props.value}
            onChange={props.handleChange}
            helperText={getHelperText(props)}
            id={props.id}
            error={!!props.error}
            multiline
            margin="none"
            fullWidth
            rowsMax={props.maxRow} />
    </Styled.Root>
));

Field.defaultProps = {
    error: undefined,
    warn: undefined,
    maxRow: 6,
};

export default Field;
