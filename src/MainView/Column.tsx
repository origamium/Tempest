import React from "react";
import { styled } from "@styled";
import { Paper } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";

export interface IColumnProps {
    id: string;
    width: number;
}

interface TsuruColumnPaperProps extends PaperProps {
    width: number;
}

const Styled = {
    Paper: styled(({ width, ...rest }: TsuruColumnPaperProps) => <Paper {...rest}>{rest.children}</Paper>)`
        && {
            margin: 4px;
            width: ${({ width }) => width}px;
            height: 100%;
        }
    `
};

const _Column: React.FC<IColumnProps> = (props: IColumnProps) => {
    return (
        <Styled.Paper width={props.width}>
            <header />
            <main>はいじゃないが</main>
            <footer />
        </Styled.Paper>
    );
};

export const Column = React.memo(_Column);
