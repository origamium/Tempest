import * as React from "react";
import { ComponentButton } from "./ReactionButton/ComponentButton";
import { Clear, Reply, Repeat, Favorite, Send, AttachFile } from "@material-ui/icons";

export interface IconButtonStyle {
    activeColor?: string;
    negativeColor: string;
    size: string;
}

export interface IconButtonProps {
    style: IconButtonStyle;
    id: string;
    active?: boolean;
    handleClick: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const SendButton: React.FC<IconButtonProps> = (props) => (
    <ComponentButton {...props}>
        <Send />
    </ComponentButton>
);

export const AttachFileButton: React.FC<IconButtonProps> = (props) => (
    <ComponentButton {...props}>
        <AttachFile />
    </ComponentButton>
);

export const ClearButton: React.FC<IconButtonProps> = (props) => (
    <ComponentButton {...props}>
        <Clear />
    </ComponentButton>
);

export const ReplyButton: React.FC<IconButtonProps> = (props) => (
    <ComponentButton {...props}>
        <Reply />
    </ComponentButton>
);

export const RepeatButton: React.FC<IconButtonProps> = (props) => (
    <ComponentButton {...props}>
        <Repeat />
    </ComponentButton>
);

export const FavoriteButton: React.FC<IconButtonProps> = (props) => (
    <ComponentButton {...props}>
        <Favorite />
    </ComponentButton>
);
