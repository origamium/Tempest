import * as React from "react";
import { styled } from "./Theme";
import { Tabs, Tab } from "@material-ui/core";
import { Sidebar } from "./Component/Sidebar/Sidebar";
import { Columns } from "./Component/MainView/Columns";

const Styled = {
    Root: styled.div`
        display: flex;
        width: 100%;
        height: 100%;
    `,
    Body: styled.div`
        flex: 0 1 auto;
        overflow: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
    `,
    TabPanelBody: styled.div`
        flex: 1 0 auto;
        width: 100%;
    `,
};

interface TabPanelProps {
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ index, value }) => {
    return (
        <Styled.TabPanelBody
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            <Columns tabId={"394"} handleUpdate={() => {}} />
        </Styled.TabPanelBody>
    );
};

export const Body: React.FC = () => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleTabChange = React.useCallback((e: React.ChangeEvent<any>, newValue: number) => {
        setTabIndex(newValue);
    }, []);

    return (
        <Styled.Root>
            <Sidebar />
            <Styled.Body>
                <Tabs
                    value={tabIndex}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label={"Twitter"} />
                    <Tab label={"Twitter"} />
                </Tabs>
                <TabPanel index={1} value={1} />
            </Styled.Body>
        </Styled.Root>
    );
};
