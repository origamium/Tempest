import React from "react";
import { styled } from "../../Theme";
import { Paper, IconButton } from "@material-ui/core";
import { AccountList, IAccountProps } from "./AccountList";
import { Settings } from "@material-ui/icons";
import { SidebarAddButton } from "./Buttons/Add";

export interface ISidebarProps {
    accounts: IAccountProps[];
    settingAction: () => void;
}

const Styled = {
    Root: styled.div<{ width: number }>`
        width: ${({ width }) => width + 24}px;
        height: 100%;
        & > * {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: calc(100% - 16px);
            padding-left: 8px;
            margin: 8px 0 8px -8px;
        }
    `,
};

export const Sidebar: React.FC<ISidebarProps> = (props: ISidebarProps) => {
    const sidebarBodyRef = React.useRef<HTMLDivElement>(null);
    const [sidebarClientWidth, setSidebarClientWidth] = React.useState<number>(0);
    const calcSidebarBodyWidth = React.useCallback<() => number>(() => sidebarBodyRef.current?.clientWidth ?? 0, []);

    React.useLayoutEffect(() => {
        setSidebarClientWidth(calcSidebarBodyWidth());
    }, [calcSidebarBodyWidth]);

    return (
        <Styled.Root width={sidebarClientWidth}>
            <Paper ref={sidebarBodyRef}>
                <div>
                    <SidebarAddButton />
                </div>
                <div>
                    <AccountList accounts={props.accounts} />
                </div>
                <div>
                    <IconButton onClick={props.settingAction}>
                        <Settings />
                    </IconButton>
                </div>
            </Paper>
        </Styled.Root>
    );
};
