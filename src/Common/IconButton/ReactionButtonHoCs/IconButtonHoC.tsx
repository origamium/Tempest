import * as React from 'react';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";
import {IconButtonProps} from "../IconButton";

const StyledButton = styled(ButtonBase)<any>`
    && {
        ${({size, color, active})=> `
            width: ${size};
            height: ${size};
            border-radius: 50%;
            
            & > *{
                fill: ${active ? color.active || color.negative : color.negative};
                width: 100%;
                height: 100%;
            }
        `}
    }
`;

const IconButtonHoC = (Icon: React.ComponentType<SvgIconProps>): Function => (
    (props: IconButtonProps) => (
        <StyledButton
            color={{active: props.style.activeColor, negative: props.style.negativeColor}}
            active={props.active}
            size={props.style.size}
            onClick={props.handleClick}>
            <Icon/>
        </StyledButton>
    )
);

export default IconButtonHoC;
