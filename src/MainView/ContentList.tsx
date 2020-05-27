import * as React from "react";
import { CellMeasurer, CellMeasurerCache, List, ListRowRenderer } from "react-virtualized";
import { ArticleType } from "../datatype/Contents/Article/ArticleType";
import { Content } from "../Common/Status/Content";
import { IUICommonAttribute } from "../datatype/UI/UICommonAttribute";

export interface ContentListProps extends IUICommonAttribute {
    articles: ArticleType[];
}

export const ContentList: React.FC<ContentListProps> = ({ articles, ...uiAttr }) => {
    const cache = React.useRef(new CellMeasurerCache({ minHeight: 60 }));

    const rowRenderer: ListRowRenderer = React.useMemo(
        () => ({ index, key, parent, style }) => {
            return (
                <CellMeasurer key={key} cache={cache.current} parent={parent} rowIndex={index} columnIndex={0}>
                    {({ measure, registerChild }) => (
                        <div ref={registerChild as any} style={style}>
                            <Content target={articles[index]} {...uiAttr} measure={measure} />
                        </div>
                    )}
                </CellMeasurer>
            );
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [uiAttr]
    );

    return (
        <div style={{ backgroundColor: "azure" }}>
            <List
                deferredMeasurementCache={cache.current}
                rowHeight={cache.current.rowHeight}
                rowCount={articles.length}
                overscanRowCount={10}
                width={320}
                height={1000}
                rowRenderer={rowRenderer}
            />
        </div>
    );
};
