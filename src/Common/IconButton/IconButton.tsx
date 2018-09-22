import * as React from 'react'
import Reply from '@material-ui/icons/Reply';
import Repeat from '@material-ui/icons/Repeat';
import Favorite from '@material-ui/icons/Favorite';
import IconButtonHoC from './ReactionButtonHoCs/IconButtonHoC';

export type IconButtonStyle = {
    activeColor: string,
    negativeColor: string,
    size: number,
};

export type IconButtonProps = {
    style: IconButtonStyle,
    id: string,
    active: boolean,
    handleClick: Function,
};

export const ReplyButton: React.SFC<IconButtonProps> = (props: IconButtonProps)=> (
    IconButtonHoC(Reply)(props)
);

export const RepeatButton: React.SFC<IconButtonProps> = (props: IconButtonProps)=> (
    IconButtonHoC(Repeat)(props)
);

export const FavoriteButton: React.SFC<IconButtonProps> = (props: IconButtonProps)=> (
    IconButtonHoC(Favorite)(props)
);
