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
import {IStatus} from "../../../lib/data";

export type FormProps = {
    /* unique account key */
    accountKey: string,
    /* unique column key */
    columnKey: string,
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
    /* reply source clicked */
    handleClickReply: (object: {accountKey: string, columnKey: string, sourceId: string}) => void,
    /* post it! */
    requestPost: (object: {handleClear: Function, accountKey: string, columnKey: string, text: string, file?: string[]}) => void, //TODO: object type move tsuruclient/data
    /* register reducer. */
    registerColumn: (object: {handleAddReply: Function}) => void,
}

type FormState = {
    text: string,
    replySource?: IStatus,
    file: string[],
    warn?: string,
};

const Styled = {
    Root: styled(Dropzone)`
        width: 100%;
    `,
    Body: styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
    `,
    Input: styled.input`
        display: none;
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

class Form extends React.PureComponent<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = Form.defaultState;
        this.reader = new FileReader;
        this.fileInput = React.createRef();
    }

    private reader: FileReader;
    private readonly fileInput: React.RefObject<any>;

    static defaultState: FormState = {
        text: "",
        file: [],
        replySource: undefined,
        warn: undefined,
    };

    render() {
        const {accountKey, columnKey, accept, error} = this.props;
        const {text, warn, replySource} = this.state;
        return (
            <Styled.Root accept={accept} onDrop={this.handleFileDrop}>
                {({getRootProps, getInputProps}) =>
                    <Styled.Body {...getRootProps()}>
                        <Styled.Input {...getInputProps()} ref={this.fileInput} />
                        <Styled.Row>
                            <Field id={columnKey} value={text} warn={warn} error={error}
                                   handleChange={this.handleFieldChange}/>
                            <Styled.Buttons>
                                {IconButtonHoC(ClipIcon)({
                                    style: ButtonStyle,
                                    id: columnKey,
                                    active: false,
                                    handleClick: this.handleAddFileClicked
                                })}
                                {IconButtonHoC(SendIcon)({
                                    style: ButtonStyle,
                                    id: columnKey,
                                    active: false,
                                    handleClick: this.handleRequestPost
                                })}
                            </Styled.Buttons>
                        </Styled.Row>
                        <Styled.Row>
                            <ThumbnailList
                                accountKey={accountKey}
                                columnKey={columnKey}
                                lists={this.state.file}
                                isDeletable
                                handleDelete={this.handleDeleteFile}/>
                        </Styled.Row>
                        <Styled.Row>
                            {replySource ? <StatusCard accountKey={accountKey} target={replySource}/> : <div/>}
                        </Styled.Row>
                    </Styled.Body>
                }
            </Styled.Root>
        )
    }

    componentDidMount() {
        this.reader = new FileReader;
            this.reader.addEventListener("load", () => {
                this.setState({
                    file: [...this.state.file, this.reader.result as string]
                });
        }, false);
        this.props.registerColumn({handleAddReply: this.handleAddReply});
    };

    handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({ text: event.target.value });
    };

    handleAddReply = (source: IStatus): void => {
        this.setState({
            replySource: source,
        });
    };

    handleAddFileClicked = (event: React.MouseEvent<HTMLInputElement>) => {
        if(this.fileInput && this.fileInput.current){
            this.fileInput.current.click();
        }
    }

    handleDeleteReply = (): void => {
        this.setState({
            replySource: undefined
        });
    };

    handleFileDrop = (acceptFile: File[], rejectedFile: File[]): void => {
        if (this.props.handleFileUpload) {
            this.props.handleFileUpload((source: string) => this.setState({text: this.state.text + source}), acceptFile);
        } else {
            this.handleAddFile(acceptFile);
        }
    };

    handleAddFile = (file: File[]): void => {
        file.forEach((v: File) => {
            this.reader.readAsDataURL(v);
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
        const {accountKey, columnKey} = this.props;
        const {text, file} = this.state;
        this.props.requestPost({handleClear: this.handleClear, accountKey, columnKey, text, file});
    }
}

export default Form;
