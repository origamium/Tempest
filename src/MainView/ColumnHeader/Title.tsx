import React, { useContext } from "react";
import { UserProperties } from "@tsuruclient/datatype";
import { Typography } from "@material-ui/core";
import { OwnerContext } from "../Column";

interface IHeaderProps {
    columnName: string;
}

export const Title: React.FC<IHeaderProps> = (props: IHeaderProps) => {
    const owner = useContext(OwnerContext);
    const ownerString = (owner[UserProperties.providerDomain] || "") + "@" + owner[UserProperties.screenName];

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
