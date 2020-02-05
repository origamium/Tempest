import * as React from "react";
import styled from "styled-components";
import ButtonBase from "@material-ui/core/ButtonBase";
import { SvgIconProps } from "@material-ui/core/SvgIcon/SvgIcon";
import { IconButtonProps } from "../IconButton";

const StyledButton = styled(ButtonBase)<any>`
    && {
        ${({ size, color }) => `
            width: ${size};
            height: ${size};
            border-radius: 50%;
            
            & > *{
                fill: ${color};
                width: 100%;
                height: 100%;
            }
        `}
    }
`;

const IconButtonHoC = (Icon: React.ComponentType<SvgIconProps>): Function => (props: IconButtonProps) => (
    <StyledButton
        color={props.active ? props.style.activeColor || props.style.negativeColor : props.style.negativeColor}
        size={props.style.size}
        onClick={props.handleClick}
    >
        <Icon />
    </StyledButton>
);

export default IconButtonHoC;
