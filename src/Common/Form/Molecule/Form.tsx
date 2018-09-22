import * as React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import Field from '../Atom/Field';

export type FormProps = {
    /* unique key */
    id: string,
    /* accept file type.. */
    accept: string,
}

type FormState = {
    text: string,
    file: File[],
}

const Styled = {
    Root: styled(Dropzone)`
        width: 100%;
    `,
};

class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {
            text: "",
            file: [],
        };
    }

    render() {
        const {id, accept} = this.props;
        const {text} = this.state;
        return (
            <Styled.Root disableClick accept={accept}>
                <Field id={id} value={text} handleChange={this.handleFieldChange}/>
            </Styled.Root>
        )
    }

    shouldComponentUpdate(nextProps: FormProps, nextState: FormState): boolean{
        return true; // TODO
    }

    handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ text: event.target.value });
    };

    handleFileDrop = (): void => {

    };

    handleIsError = (): void => {

    }
}

export default Form;
