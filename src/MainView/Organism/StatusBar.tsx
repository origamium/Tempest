import React from "react";
import { styled } from "@styled";
import { LinearProgress } from "@material-ui/core";
import { LinearProgressProps } from "@material-ui/core/es/LinearProgress";

export enum progressStatus {
    none = "none",
    inProgress = "progress",
    streaming = "streaming",
    error = "error"
}

interface StatusBarProps {
    status: progressStatus;
}

interface BlankBarProps {
    error?: boolean;
    streaming?: boolean;
}

const Styled = {
    Root: styled.div`
        width: 100%;
        height: 4px;
    `,
    ProgressBar: styled(({ ...rest }: LinearProgressProps) => <LinearProgress {...rest} />)`
        && {
            width: 100%;
            height: 100%;
        }
    `,
    BlankBar: styled.div<BlankBarProps>`
        width: 100%;
        height: 100%;
        background-color: ${({ error, streaming }: BlankBarProps) =>
            error ? "#d50000" : streaming ? "#1e88e5" : "gray"};
    `
};

const renderProgressBar: React.FC<StatusBarProps & { err: boolean }> = props => {
    if (!props.err) {
        switch (props.status) {
            case progressStatus.inProgress:
                return <Styled.ProgressBar />;
            case progressStatus.streaming:
                return <Styled.BlankBar streaming />;
            default:
                return <Styled.BlankBar />;
        }
    } else {
        return <Styled.BlankBar error />;
    }
};

export const StatusBar: React.FC<StatusBarProps> = (props: StatusBarProps) => {
    const [err, raiseErr] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (props.status === progressStatus.error) {
            raiseErr(true);
            setTimeout(() => {
                raiseErr(false);
            }, 3000);
        }
    }, [props]);

    return <Styled.Root>{renderProgressBar({ ...props, err })}</Styled.Root>;
};
