import * as React from 'react';
import { pure } from 'recompose';
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
    Root: styled(TextField)`
        && {
            // ...
        }
    `,
};

const getHelperText = (props: FieldProps): string => {
    if(props.error || props.warn) {
        return props.error ? props.error : props.warn || "";
    }
    return props.helperText || "";
};

const Field: React.SFC<FieldProps> = (props: FieldProps) => (
    <Styled.Root
        value={props.value}
        onChange={props.handleChange}
        helperText={getHelperText(props)}
        id={props.id}
        error={!!props.error}
        multiline
        margin="none"
        fullWidth
        rowsMax={6}/>
);

Field.defaultProps = {
    error: undefined,
    warn: undefined,
    maxRow: 8,
};

export const Field_ = Field;
export default pure(Field);
