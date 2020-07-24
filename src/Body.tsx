import * as React from "react";
import { styled } from "./Theme";
import { Tabs, Tab } from "@material-ui/core";
import { Sidebar } from "./Component/Sidebar/Sidebar";
import { Columns } from "./Component/MainView/Columns";

const Styled = {
    Root: styled.div`
        display: flex;
        height: 100%;
    `,
    TabPanelBody: styled.div`
        height: 100%;
    `,
};

interface TabPanelProps {
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ index, value }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            <Styled.TabPanelBody>
                <Columns tabId={"394"} handleUpdate={() => {}} />
            </Styled.TabPanelBody>
        </div>
    );
};

export const Body: React.FC = () => {
    const [tabIndex, setTabIndex] = React.useState(0);
    const handleTabChange = React.useCallback((e: React.ChangeEvent<any>, newValue: number) => {
        setTabIndex(newValue);
    }, []);

    return (
        <Styled.Root>
            <Sidebar accounts={[]} addAction={() => {}} settingAction={() => {}} />
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
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
                <Tab label={"Twitter"} />
            </Tabs>
            <TabPanel index={1} value={1} />
        </Styled.Root>
    );
};
