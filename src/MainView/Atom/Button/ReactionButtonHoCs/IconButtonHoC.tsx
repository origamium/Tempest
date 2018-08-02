import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";

type Props = {
    handleClick: Function,
    id: string,
};

const IconButtonHoC = (Icon: React.ComponentType<SvgIconProps>): Function => (
    (props: Props) => (
        <IconButton onClick={(e) => props.handleClick({
            id: props.id,
        })}>
            <Icon/>
        </IconButton>
));

export default IconButtonHoC;
