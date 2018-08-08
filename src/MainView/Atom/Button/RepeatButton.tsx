import * as React from 'react'
import {pure} from "recompose";
import Repeat from '@material-ui/icons/Repeat';
import IconButtonHoC from './ReactionButtonHoCs/IconButtonHoC';
import {ButtonStyle} from "./StyleType/ButtonStyleObject";

type Props = {
    style: ButtonStyle,
    id: string,
    handleClick: Function,
};

const RepeatButton: React.SFC<Props>  = (props: Props)=> (
    IconButtonHoC(Repeat)(props)
);

export const RepeatButton_ = RepeatButton;
export default pure(RepeatButton);
