import * as React from "react";
import ButtonBase from "@material-ui/core/ButtonBase";
import { IconButtonProps } from "../IconButton";
import { useMemo } from "react";
import { css } from "@emotion/react";

export const ComponentButton: React.FC<IconButtonProps> = (props) => {
    const color = useMemo(
        () => (props.active ? props.style.activeColor || props.style.negativeColor : props.style.negativeColor),
        [props.active, props.style.activeColor, props.style.negativeColor],
    );
    const size = props.style.size;

    return (
        <ButtonBase
            onClick={props.handleClick}
            css={css`
                width: ${size};
                height: ${size};
                border-radius: 50%;

                & > * {
                    width: 100%;
                    height: 100%;
                    fill: ${color};
                }
            `}
        >
            {props.children}
        </ButtonBase>
    );
};
