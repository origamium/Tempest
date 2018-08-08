import * as React from 'react';
import styled from 'styled-components';
import ButtonBase from '@material-ui/core/ButtonBase';
import {SvgIconProps} from "@material-ui/core/SvgIcon/SvgIcon";
import {ButtonStyle} from "../StyleType/ButtonStyleObject";

type Props = {
    style: ButtonStyle,
    id: string,
    handleClick: Function,
};

const StyledButton = styled(ButtonBase)<any>`
    && {
        ${(props: Props)=> `
            fill: ${props.style.color}
        `};
    }
`;

const IconButtonHoC = (Icon: React.ComponentType<SvgIconProps>): Function => (
    (props: Props) => (
        <StyledButton onClick={() => props.handleClick({
            id: props.id,
        })}>
            <Icon/>
        </StyledButton>
));

export default IconButtonHoC;
