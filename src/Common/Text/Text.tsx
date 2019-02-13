import * as React from 'react';
import {onlyUpdateForKeys} from "recompose";
import Typography from '@material-ui/core/Typography';
import * as linkify from 'linkifyjs';
import Linkify from 'linkifyjs/react';
import hashtag from 'linkifyjs/plugins/hashtag';
import mention from 'linkifyjs/plugins/mention';
import {ThemeStyle} from "@material-ui/core/styles/createTypography";

// apply plugin
hashtag(linkify);
mention(linkify);

export type TextProps = {
    text: string,
    variant?: ThemeStyle,
    maxLinkLength?: number,
    handleLinkClick: (href: string) => void,
}

const linkifyOption = (props: TextProps) => ({
    format: (value, type) => {
        if(type === "url" && value.length > 64){
            return value.slice(0, (props.maxLinkLength || 64) - 12) + '…';
        }
        return value;
    },
    attributes: {
        onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            const target: HTMLAnchorElement = e.target as HTMLAnchorElement;
            if (target.href) {
                if(target.text[0] === "h"){
                    props.handleLinkClick(target.href)
                } else {
                    props.handleLinkClick(target.text);
                }
            }
        }
    }
});

// TODO: multibyte-text hashtag
export const Text = onlyUpdateForKeys(['text'])(
    (props: TextProps) => (
        <Linkify options={linkifyOption(props)}>
            <Typography variant={props.variant}>{props.text}</Typography>
        </Linkify>
));

Text.defaultProps = {
    maxLinkLength: 64,
};

export default Text;
