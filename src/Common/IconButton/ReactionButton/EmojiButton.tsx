import * as React from "react";
import { IconButton } from "@material-ui/core";

export type CharButtonProps = {
    handleClick: Function;
    id: string;
    char: string; // TODO: URLにも対応させる
};

export const CharButton: React.FC<CharButtonProps> = (props) => {
    const handleClick = (e: React.MouseEvent<any>): void => {
        props.handleClick({ id: props.id });
    };

    return <IconButton onClick={handleClick}>{props.char}</IconButton>;
};
