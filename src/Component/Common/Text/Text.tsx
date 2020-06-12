import * as React from "react";
import { css, styled } from "../../../Theme";
import { Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";
import twitterText from "@schemelisp/twitter-text";
import type { EntityWithIndices } from "twitter-text";

export type TextProps = {
    text: string;
    variant?: Variant;
    maxLinkLength?: number;
    handleLinkClick: (href: EntityWithIndices) => void;
};

const LinkText = styled.a`
    ${({ theme }) =>
        css`
            color: ${theme.text.color.secondary};
            text-decoration: ${theme.text.color.secondary} underline;
        `}
    word-break: break-all;
    cursor: pointer;
`;

export const Text: React.FC<TextProps> = ({ text, variant, maxLinkLength, handleLinkClick }) => {
    const transformedText = React.useMemo(() => {
        const parsed = twitterText.extractEntitiesWithIndices(text);
        if (parsed.length === 0) return [text];
        return parsed
            .reduce(
                (
                    accm: Array<EntityWithIndices | string>,
                    curr: EntityWithIndices,
                    i: number,
                    source: EntityWithIndices[]
                ): Array<EntityWithIndices | string> => {
                    if (i !== 0 && i !== source.length - 1) {
                        return [...accm, text.slice(source[i - 1].indices[1], curr.indices[0]), curr];
                    } else {
                        if (i === 0) {
                            return [
                                text.slice(0, curr.indices[0]),
                                curr,
                                text.slice(curr.indices[1], source[i].indices[0]),
                                ...accm,
                            ];
                        } else if (i === source.length - 1 && curr.indices[1] !== text.length - 1) {
                            return [
                                ...accm,
                                text.slice(source[i - 1].indices[1], curr.indices[0]),
                                curr,
                                text.slice(curr.indices[1], text.length),
                            ];
                        }
                        return accm;
                    }
                },
                []
            )
            .filter((v) => v !== "");
    }, [text]);

    const handleAnchorClick = React.useCallback(
        (v: EntityWithIndices) => (e: React.SyntheticEvent<HTMLAnchorElement>): void => {
            e.preventDefault();
            e.stopPropagation();
            handleLinkClick(v);
        },
        [handleLinkClick]
    );

    return (
        <Typography variant={variant}>
            {transformedText.map((v, i) =>
                typeof v === "string" ? (
                    <span key={i} style={{ wordBreak: "break-word" }}>
                        {v}
                    </span>
                ) : (
                    <LinkText key={i} onClick={handleAnchorClick(v)}>
                        {("hashtag" in v && `#${v.hashtag}`) ||
                            ("url" in v && v.url) ||
                            ("screenName" in v && `@${v.screenName}`)}
                    </LinkText>
                )
            )}
        </Typography>
    );
};

Text.defaultProps = {
    maxLinkLength: 64, // TODO
};
