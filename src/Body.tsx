import * as React from "react";
import { Sidebar } from "./Component/Sidebar/Sidebar";
import { Columns } from "./Component/MainView/Columns";
import { Tab, Tabs } from "@material-ui/core";
import { useTab } from "./Redux/Selector/UI/getTabs";
import styled from "styled-components";

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
    id: string;
    selected: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ index, id, selected }) => {
    return (
        <Styled.TabPanelBody
            role="tabpanel"
            hidden={selected !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
        >
            <Columns tabId={id} handleUpdate={() => {}} />
        </Styled.TabPanelBody>
    );
};

export const Body: React.FC = () => {
    const { tab, selectedIndex } = useTab();

    return (
        <Styled.Root>
            <Sidebar />
            <Styled.Body>
                <Tabs
                    value={0}
                    onChange={() => {}}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    {tab.map((v) => (
                        <Tab key={v.id} label={v.name} />
                    ))}
                </Tabs>
                {tab.map((v, i) => (
                    <TabPanel key={v.id} index={i} id={v.id} selected={selectedIndex} />
                ))}
            </Styled.Body>
        </Styled.Root>
    );
};
