import * as React from 'react';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";
import {IconButtonProps} from "../IconButton";

const StyledButton = styled(ButtonBase)<any>`
    && {
        ${({size, color})=> `
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            
            & > *{
                fill: ${color};
                padding: 3px;
                width: ${size - 6}px;
                height: ${size - 6}px;
            }
        `};
    }
`;

const IconButtonHoC = (Icon: React.ComponentType<SvgIconProps>): Function => (
    (props: IconButtonProps) => (
        <StyledButton
            color={props.active ? props.style.activeColor : props.style.negativeColor}
            size={props.style.size}
            onClick={props.handleClick}>
            <Icon/>
        </StyledButton>
    )
);

export default IconButtonHoC;
