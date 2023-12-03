import * as React from "react";
import Dropzone, { FileRejection, Accept } from "react-dropzone";
import Field from "./Field";
import { ThumbnailList } from "../Thumbnail";
import { ComponentButton } from "../IconButton/ReactionButton/ComponentButton";
import { Send as SendIcon, AttachFile as ClipIcon } from "@material-ui/icons";
import { IconButtonStyle } from "../IconButton/IconButton";
import { StatusCard } from "../Card/StatusCard";
import { IStatus } from "../../../datatype/Contents/Article/Status";
import { IUICommonAttribute } from "../../../datatype/UI/UICommonAttribute";
import styled from "styled-components";
import { useCallback, useEffect } from "react";

export interface FormProps extends IUICommonAttribute {
    /* accept file type.. */
    accept?: Accept;
    /* open file upload dialog */
    handleFileUpload?: (Function, file: File[]) => void;
    /* max text length, will occur warn. */
    maxTextLength?: number;
    /* max file amount */
    maxFileLength?: number; // TODO
    /* error message */
    error?: string;
    /* reply source clicked */
    handleClickReply: (object: { account: string; column: string; sourceId: string }) => void;
    /* post it! */
    requestPost: (object: {
        handleClear: Function;
        account: string;
        column: string;
        text: string;
        file?: string[];
    }) => void; // TODO: object type move tsuruclient/data
    /* register reducer. */
    registerColumn: (object: { handleAddReply: Function }) => void;
}

const Styled = {
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
        align-items: flex-end;
        width: 100%;
    `,
    Buttons: styled.div`
        display: flex;
        flex: auto 0 0;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    `,
};

const ButtonStyle: IconButtonStyle = {
    size: "32px",
    activeColor: "#7D7D7D",
    negativeColor: "#7D7D7D",
};

export const Form: React.FC<FormProps> = ({
    account,
    column,
    accept,
    error,
    registerColumn,
    handleFileUpload,
    handleClickReply,
    maxFileLength,
    maxTextLength,
    requestPost,
}) => {
    const fileInput = React.useRef<HTMLInputElement>(null);
    const [text, setText] = React.useState<string>("");
    const [warn, setWarn] = React.useState<string>();
    const [replySource, setReplySource] = React.useState<IStatus>();
    const [file, setFile] = React.useState<string[]>([]);

    useEffect(() => {
        registerColumn({ handleAddReply });
    }, [registerColumn]);

    const handleFieldChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setText(event.target.value);
    }, []);

    const handleAddReply = (source: IStatus): void => {
        setReplySource(source);
    };

    const handleAddFileClicked = useCallback((event: React.SyntheticEvent<HTMLButtonElement>) => {
        event.preventDefault();
        if (fileInput && fileInput.current) {
            fileInput.current.click();
        }
    }, []);

    const handleDeleteReply = useCallback((): void => {
        setReplySource(undefined);
    }, []);

    const handleAddFile = useCallback((file: string[]): void => {
        setFile((prev) => [...prev, ...file]);
    }, []);

    const handleFileDrop = useCallback(
        (acceptFile: File[], rejectedFile: FileRejection[]): void => {
            if (handleFileUpload) {
                handleFileUpload((source: string) => setText((prev) => prev + source), acceptFile);
            } else {
                handleAddFile(acceptFile.map((v: File) => URL.createObjectURL(v)));
            }
        },
        [handleAddFile, handleFileUpload],
    );

    const handleDeleteFile = useCallback(
        (index: number): void => {
            const newFileArray = file.concat();
            newFileArray.splice(index, 1).forEach((v: string) => URL.revokeObjectURL(v));
            setFile(newFileArray);
        },
        [file],
    );

    const handleClear = useCallback((): void => {
        file.forEach((v: string) => URL.revokeObjectURL(v));
        setFile([]);
        setText("");
        setReplySource(undefined);
    }, [file]);

    const handleRequestPost = useCallback(
        (e: React.SyntheticEvent<HTMLButtonElement>): void => {
            e.preventDefault();
            requestPost({ handleClear, account, column, text, file });
        },
        [account, column, file, handleClear, requestPost, text],
    );

    return (
        <Dropzone accept={accept} onDrop={handleFileDrop}>
            {({ getRootProps, getInputProps }) => (
                <Styled.Body {...getRootProps()}>
                    <Styled.Input {...getInputProps()} ref={fileInput} />
                    <Styled.Row>
                        <Field id={column} value={text} warn={warn} error={error} handleChange={handleFieldChange} />
                        <Styled.Buttons>
                            <ComponentButton style={ButtonStyle} id={column} handleClick={handleAddFileClicked}>
                                <ClipIcon />
                            </ComponentButton>
                            <ComponentButton style={ButtonStyle} id={column} handleClick={handleRequestPost}>
                                <SendIcon />
                            </ComponentButton>
                        </Styled.Buttons>
                    </Styled.Row>
                    <Styled.Row>
                        <ThumbnailList
                            account={account}
                            column={column}
                            lists={file}
                            isDeletable={true}
                            handleDelete={handleDeleteFile}
                        />
                    </Styled.Row>
                    <Styled.Row>
                        {replySource ? <StatusCard account={account} target={replySource} /> : <div />}
                    </Styled.Row>
                </Styled.Body>
            )}
        </Dropzone>
    );
};

export default Form;
