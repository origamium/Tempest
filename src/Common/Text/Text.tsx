import * as React from "react";
import { onlyUpdateForKeys } from "recompose";
import { Typography } from "@material-ui/core";
import { Variant } from "@material-ui/core/styles/createTypography";

export type TextProps = {
    text: string;
    variant?: Variant;
    maxLinkLength?: number;
    handleLinkClick: (href: string) => void;
};

export const Text = onlyUpdateForKeys(["text"])((props: TextProps) => (
    <Typography variant={props.variant}>{props.text}</Typography>
));

Text.defaultProps = {
    maxLinkLength: 64
};

export const Text = onlyUpdateForKeys(["text"])(Text_);
