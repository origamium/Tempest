import * as React from "react";
import { storiesOf } from "@storybook/react";
import { color, text, number, boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import centered from "@storybook/addon-centered";
import { ComponentButton } from "./ReactionButton/ComponentButton";
import CheckIcon from "@material-ui/icons/Check";
import { FavoriteButton, RepeatButton, ReplyButton } from "./IconButton";

const sampleId = "sample-id-0123456789";
const negativeColor = "#7D7D7D";

storiesOf("Common Components/Button/ComponentButton", module)
    .addDecorator(centered)
    .add("Info", () => (
        <ComponentButton
            id={text("id", sampleId)}
            style={{
                activeColor: color("active color", "#4E66FF"),
                negativeColor: color("negative color", negativeColor),
                size: `${number("size", 32)}px`,
            }}
            active={boolean("active", true)}
            handleClick={action("clicked")}
        >
            <CheckIcon />
        </ComponentButton>
    ));

storiesOf("Common Components/Button/ComponentButton/Buttons", module)
    .addDecorator(centered)
    .add(
        "Reply Button",
        () => (
            <ReplyButton
                id={text("id", sampleId)}
                style={{
                    activeColor: color("active color", "#49A4EF"),
                    negativeColor: color("negative color", negativeColor),
                    size: `${number("size", 32)}px`,
                }}
                active={boolean("active", true)}
                handleClick={action("clicked")}
            />
        ),
        {},
    )
    .add(
        "Repeat Button",
        () => (
            <RepeatButton
                id={text("id", sampleId)}
                style={{
                    activeColor: color("active color", "#4EBD67"),
                    negativeColor: color("negative color", negativeColor),
                    size: `${number("size", 32)}px`,
                }}
                active={boolean("active", true)}
                handleClick={action("clicked")}
            />
        ),
        {},
    )
    .add(
        "Favorite Button",
        () => (
            <FavoriteButton
                id={text("id", sampleId)}
                style={{
                    activeColor: color("active color", "#D2255F"),
                    negativeColor: color("negative color", negativeColor),
                    size: `${number("size", 32)}px`,
                }}
                active={boolean("active", true)}
                handleClick={action("clicked")}
            />
        ),
        {},
    );
