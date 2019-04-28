import React from "react";
import { styled } from "@styled";
import { Paper } from "@material-ui/core";
import { PaperProps } from "@material-ui/core/Paper";

export interface IColumnProps {
    id: string;
    width: number;
}

const Styled = {
    Root: styled.article<{ width: number }>`
        padding: 4px;
        width: ${({ width }) => width}px;
        height: 100%;
    `,
    Paper: styled((props: PaperProps) => <Paper {...props}>{props.children}</Paper>)`
        && {
            width: 100%;
            height: 100%;
        }
    `
};

const _Column: React.FC<IColumnProps> = (props: IColumnProps) => {
    return (
        <Styled.Root width={props.width}>
            <Styled.Paper>
                <header />
                <main>はいじゃないが</main>
                <footer />
            </Styled.Paper>
        </Styled.Root>
    );
};

export const Column = React.memo(_Column);
