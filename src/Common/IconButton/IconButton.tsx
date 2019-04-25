import * as React from "react";
import IconButtonHoC from "./ReactionButtonHoCs/IconButtonHoC";
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
    handleClick: Function;
}

export const SendButton: React.FC<IconButtonProps> = (props: IconButtonProps) => IconButtonHoC(Send)(props);

export const AttachFileButton: React.FC<IconButtonProps> = (props: IconButtonProps) => IconButtonHoC(AttachFile)(props);

export const ClearButton: React.FC<IconButtonProps> = (props: IconButtonProps) => IconButtonHoC(Clear)(props);

export const ReplyButton: React.FC<IconButtonProps> = (props: IconButtonProps) => IconButtonHoC(Reply)(props);

export const RepeatButton: React.FC<IconButtonProps> = (props: IconButtonProps) => IconButtonHoC(Repeat)(props);

export const FavoriteButton: React.FC<IconButtonProps> = (props: IconButtonProps) => IconButtonHoC(Favorite)(props);
