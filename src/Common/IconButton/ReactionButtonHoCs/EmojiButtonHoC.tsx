import * as React from "react";
import { IconButton } from "@material-ui/core";

type Props = {
    handleClick: Function;
    id: string;
};

export const EmojiButtonHoC = (Emoji: String): Function => (props: Props) => {
    const handleClick = (e: React.MouseEvent<any>): void => {
        props.handleClick({ id: props.id });
    };

    return <IconButton onClick={handleClick}>{Emoji}</IconButton>;
};
