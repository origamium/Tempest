import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';

type Props = {
    handleClick: Function,
    id: string,
};

const EmojiButtonHoC = (Emoji: String): Function => (
    (props: Props) => (
        <IconButton onClick={(e) => props.handleClick({
            id: props.id,
        })}>
            {Emoji}
        </IconButton>
    ));

export default EmojiButtonHoC;
