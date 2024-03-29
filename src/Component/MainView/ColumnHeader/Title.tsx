import * as React from "react";
import { Typography } from "@material-ui/core";
import { IUser, UserProperties } from "../../../datatype/Contents/User";

interface IHeaderProps {
    owner?: IUser;
    columnName: string;
}

export const Title: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    const ownerString = React.useMemo(
        () =>
            props.owner
                ? (props.owner?.[UserProperties.providerDomain] || "") + "@" + props.owner?.[UserProperties.screenName]
                : "",
        [props.owner],
    );

    return (
        <div>
            <Typography variant={"h6" /* TODO: fix this */} style={{ marginBottom: "-8px" }}>
                {props.columnName}
            </Typography>
            <Typography variant={"caption"} style={{ marginTop: "-8px" }}>
                {ownerString}
            </Typography>
        </div>
    );
};
