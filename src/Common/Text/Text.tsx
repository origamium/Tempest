import * as React from "react";
import { onlyUpdateForKeys } from "recompose";
import { Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";
import twitterText from "@schemelisp/twitter-text";
import type { EntityWithIndices } from "twitter-text";

export type TextProps = {
    text: string;
    variant?: Variant;
    maxLinkLength?: number;
    handleLinkClick: (href: string) => void;
};

export const Text_: React.FC<TextProps> = ({ text, variant, maxLinkLength, handleLinkClick }) => {
    const transformedText = React.useMemo(
        () =>
            twitterText
                .extractEntitiesWithIndices(text)
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
                .filter((v) => v !== ""),
        [text]
    );
    return (
        <Typography variant={variant}>
            {transformedText.map((v, i) =>
                typeof v === "string" ? (
                    <span key={i}>{v}</span>
                ) : (
                    <a key={i}>
                        {("hashtag" in v && `#${v.hashtag}`) ||
                            ("url" in v && v.url) ||
                            ("screenName" in v && `@${v.screenName}`)}
                    </a>
                )
            )}
        </Typography>
    );
};

Text_.defaultProps = {
    maxLinkLength: 64, // TODO
};

export const Text = onlyUpdateForKeys(["text"])(Text_);
