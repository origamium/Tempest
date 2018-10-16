import * as React from 'react';
import {onlyUpdateForKeys} from "recompose";
import Typography from '@material-ui/core/Typography';
import * as linkify from 'linkifyjs';
import Linkify from 'linkifyjs/react';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention';

// apply plugin
hashtag(linkify);
mention(linkify);

export type TextProps = {
    text: string,
    maxLinkLength?: number,
    handleLinkClick: (text: string) => void,
}

const linkifyOption = (props: TextProps) => ({
    format: (value, type) => {
        if(type === "url" && value.length > 64){
            return value.slice(0, 64 - 12) + '…';
        }
        return value;
    },
    attributes: {
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
            if (target.textContent) {
                props.handleLinkClick(target.textContent);
            }
        }
    }
});

export const Text = (props: TextProps) => (
    <Linkify options={linkifyOption(props)}>
        <Typography variant="body1">{props.text}</Typography>
    </Linkify>
);

Text.defaultProps = {
    maxLinkLength: 64,
};

export default onlyUpdateForKeys(['text'])(Text);
