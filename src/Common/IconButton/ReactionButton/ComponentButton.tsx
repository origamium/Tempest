import * as React from "react";
import { styled, css } from "../../../Theme";
import ButtonBase, { ButtonBaseProps } from "@material-ui/core/ButtonBase";
import { IconButtonProps } from "../IconButton";

type StyledButtonAttr = { size: string | number; color: string };
const StyledButton = styled(ButtonBase)<StyledButtonAttr>`
    && {
        ${({ size, color }) => css`
            width: ${size};
            height: ${size};
            border-radius: 50%;

            & > * {
                fill: ${color};
                width: 100%;
                height: 100%;
            }
        `}
    }
` as React.FC<StyledButtonAttr & ButtonBaseProps & React.HTMLAttributes<HTMLButtonElement>>;

export const ComponentButton: React.FC<IconButtonProps> = (props) => (
    <StyledButton
        color={props.active ? props.style.activeColor || props.style.negativeColor : props.style.negativeColor}
        size={props.style.size}
        onClick={props.handleClick}
    >
        {props.children}
    </StyledButton>
);
