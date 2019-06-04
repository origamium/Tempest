import React from "react";
import { css, styled } from "@styled";
import { LinearProgress } from "@material-ui/core";
import { LinearProgressProps } from "@material-ui/core/es/LinearProgress";

export enum progressStatus {
    none = "none",
    inProgress = "progress",
    streaming = "streaming"
}

interface StatusBarProps {
    status: progressStatus;
    error?: boolean;
}

const childCss = css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
`;

const Styled = {
    Root: styled.div`
        width: 100%;
        height: 4px;
        position: relative;
        background-color: gray;
    `,
    Progress: styled(({ ...rest }: LinearProgressProps) => <LinearProgress {...rest} />)`
        && {
            ${childCss};
        }
    `,
    Streaming: styled.div<{ streaming: boolean }>`
        ${childCss};
        background-color: ${({ streaming }) => (streaming ? "#1e88e5" : "none")};
        transition: background-color 200ms;
    `,
    Error: styled.div<{ err: boolean }>`
        ${childCss};
        background-color: ${({ err }) => (err ? "#d50000" : "none")};
        transition: background-color 200ms;
    `
};

interface RenderProgressBar {
    status: progressStatus;
    err: boolean;
}
const renderProgressBar: React.FC<RenderProgressBar> = ({ status, err }: RenderProgressBar) => {
    return (
        <Styled.Root>
            <Styled.Streaming streaming={status === progressStatus.streaming} />
            {status === progressStatus.inProgress && <Styled.Progress />}
            <Styled.Error err={err} />
        </Styled.Root>
    );
};

export const StatusColorBar: React.FC<StatusBarProps> = (props: StatusBarProps) => {
    const [err, raiseErr] = React.useState<boolean>(false);
    React.useEffect(() => {
        if (props.error) {
            raiseErr(true);
            setTimeout(() => {
                raiseErr(false);
            }, 3000);
        }
    }, [props.error]);

    return <Styled.Root>{renderProgressBar({ status: props.status, err })}</Styled.Root>;
};
