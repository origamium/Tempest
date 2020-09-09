import * as React from "react";
import { storiesOf } from "@storybook/react";
import centered from "@storybook/addon-centered";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Thumbnail } from "./Thumbnail";

import origamiIcon from "../../__testdata__/icon/origami.png";
import simulaculaIcon from "../../__testdata__/icon/simulacla.jpg";

import { ThumbnailList } from "./ThumbnailList";

const box = (story) => <div style={{ width: "50vw" }}>{story()}</div>;

storiesOf("Common Components/Thumbnail", module)
    .addDecorator(centered)
    .add(
        "Thumbnail info",
        () => (
            <Thumbnail
                source={origamiIcon}
                index={1}
                measure={() => {}}
                handleClick={action("image is clicked!")}
                handleDelete={action("delete button is clicked!")}
            />
        ),
        {}
    )
    .add(
        "Thumbnail no deletable",
        () => <Thumbnail source={origamiIcon} index={1} measure={() => {}} handleClick={action("image is clicked!")} />,
        {}
    );

storiesOf("Common Components/ThumbnailList", module)
    .addDecorator(centered)
    .addDecorator(box)
    .add(
        "ThumbnailList info",
        () => (
            <div style={{ width: "50vw", height: "50vh" }}>
                <ThumbnailList
                    account={""}
                    column={""}
                    lists={[origamiIcon, simulaculaIcon, simulaculaIcon]}
                    isDeletable={boolean("isDeletable", true)}
                    handleClick={action("Thumbnail Clicked")}
                    handleDelete={action("Thumbnail delete clicked!")}
                />
            </div>
        ),
        {}
    );
