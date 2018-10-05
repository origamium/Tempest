import * as React from 'react'
import IconButtonHoC from './ReactionButtonHoCs/IconButtonHoC';
import {Clear, Reply, Repeat, Favorite, Send, AttachFile} from "@material-ui/icons";

export type IconButtonStyle = {
    activeColor?: string,
    negativeColor: string,
    size: string,
};

export type IconButtonProps = {
    style: IconButtonStyle,
    id: string,
    active?: boolean,
    handleClick: Function,
};

export const SendButton: React.SFC<IconButtonProps> = (props: IconButtonProps) => (
    IconButtonHoC(Send)(props)
);

export const AttachFileButton: React.SFC<IconButtonProps> = (props: IconButtonProps) => (
    IconButtonHoC(AttachFile)(props)
);

export const ClearButton: React.SFC<IconButtonProps> = (props: IconButtonProps) => (
    IconButtonHoC(Clear)(props)
);

export const ReplyButton: React.SFC<IconButtonProps> = (props: IconButtonProps)=> (
    IconButtonHoC(Reply)(props)
);

export const RepeatButton: React.SFC<IconButtonProps> = (props: IconButtonProps)=> (
    IconButtonHoC(Repeat)(props)
);

export const FavoriteButton: React.SFC<IconButtonProps> = (props: IconButtonProps)=> (
    IconButtonHoC(Favorite)(props)
);
