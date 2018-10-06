import * as React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import Field from './Field';
import {ThumbnailList} from '../Thumbnail';
import IconButtonHoC from "../IconButton/ReactionButtonHoCs/IconButtonHoC";
import SendIcon from '@material-ui/icons/Send';
import ClipIcon from '@material-ui/icons/AttachFile';
import {IconButtonStyle} from "../IconButton/IconButton";
import StatusCard from '../Card/StatusCard';
import {IStatus} from "../../../lib/data/src/index";

export type FormProps = {
    /* unique key. column uid */
    id: string,
    /* account id */
    account: string,
    /* unique column id */
    columnId: string,
    /* reply source */
    replySource?: IStatus
    /* accept file type.. */
    accept?: string,
    /* open file upload dialog */
    handleFileUpload?: (Function, file: File[]) => void,
    /* max text length, will occur warn. */
    maxTextLength?: number,
    /* max file amount */
    maxFileLength?: number, // TODO
    /* error message */
    error?: string,
    /* post it! */
    requestPost: (Function, object: {account: string, id: string, text: string, file?: File[]}) => void, //TODO: object type move tsuruclient/data
}

type FormState = {
    text: string,
    file: File[],
    warn?: string,
}

const Styled = {
    Root: styled(Dropzone)`
        width: 100%;
    `,
    Body: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
    `,
    Row: styled.div`
        display: flex;
        width: 100%;
        align-items: flex-end;
    `,
    Buttons: styled.div`
        height: 100%;
        flex: auto 0 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    `,
};

const ButtonStyle: IconButtonStyle = {
    size: "32px",
    activeColor: "#7D7D7D",
    negativeColor: "7D7D7D",
};

class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = Form.defaultState;
        this.fileInput = React.createRef();
    }

    private fileInput: any;

    static defaultState: FormState = {
        text: "",
        file: [],
        warn: undefined,
    };

    render() {
        const {id, account, columnId, accept, error, replySource} = this.props;
        const {text, warn} = this.state;
        return (
            <Styled.Root disableClick accept={accept} onDrop={this.handleFileDrop} innerRef={node => this.fileInput = node}>
                <Styled.Body>
                    <Styled.Row>
                        <Field id={id} value={text} warn={warn} error={error} handleChange={this.handleFieldChange} />
                        <Styled.Buttons>
                            {IconButtonHoC(ClipIcon)({style: ButtonStyle, id, active: false, handleClick: () => this.fileInput.open()})}
                            {IconButtonHoC(SendIcon)({style: ButtonStyle, id, active: false, handleClick: this.handleRequestPost})}
                        </Styled.Buttons>
                    </Styled.Row>
                    <Styled.Row>
                        <ThumbnailList
                            account={account}
                            columnId={columnId}
                            lists={this.state.file}
                            isDeletable
                            handleDelete={this.handleDeleteFile}/>
                    </Styled.Row>
                    <Styled.Row>
                        {replySource ? <StatusCard account={account} target={replySource}/> : <div />}
                    </Styled.Row>
                </Styled.Body>
            </Styled.Root>
        )
    }

    shouldComponentUpdate(nextProps: FormProps, nextState: FormState): boolean{
        return true; // TODO
    }

    handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ text: event.target.value });
    };

    handleFileDrop = (file: File[]): void => {
        if (this.props.handleFileUpload) {
            this.props.handleFileUpload((source: string) => this.setState({text: this.state.text + source}), file);
        } else {
            this.handleAddFile(file);
        }
    };

    handleAddFile = (file: File[]): void => {
        this.setState({
            file: [...this.state.file, ...file],
        });
    };

    handleDeleteFile = (index: number): void => {
        let newFileArray = this.state.file.concat();
        newFileArray.splice(index,1);
        this.setState({
            file: newFileArray
        });
    };

    handleClear = (): void => {
        this.setState(Form.defaultState);
    };

    handleRequestPost = (e: Event): void => {
        e.preventDefault();
        const {account, id} = this.props;
        const {text, file} = this.state;
        this.props.requestPost(this.handleClear, {account, id, text, file});
    }
}

export default Form;
