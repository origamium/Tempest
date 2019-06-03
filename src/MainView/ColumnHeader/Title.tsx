import React from "react";
import { IUICommonAttribuite, IUser, UserProperties } from "@tsuruclient/datatype";
import { Typography } from "@material-ui/core";

interface IHeaderProps extends IUICommonAttribuite {
    columnName: string;
    owner: IUser;
}

export const Title: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    const ownerString =
        (props.owner[UserProperties.providerDomain] || "") + "@" + props.owner[UserProperties.screenName];

    return (
        <div>
            <Typography variant={"headline"} style={{ marginBottom: "-8px" }}>
                {props.columnName}
            </Typography>
            <br />
            <Typography variant={"caption"} style={{ marginTop: "-8px" }}>
                {ownerString}
            </Typography>
        </div>
    );
};
