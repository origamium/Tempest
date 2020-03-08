import React from "react";
import { styled } from "@styled";
import Thumbnail from "./Thumbnail";
import { IUICommonAttribute } from "../../datatype/UI/UICommonAttribute";

export interface ThumbnailListProps extends IUICommonAttribute {
    /* source id is content. */
    sourceId?: string;

    /* file or uri list */
    lists: File[] | string[];

    /* deletable? */
    isDeletable?: boolean;

    /* image clicked */
    handleClick?: (Object) => void;

    /* if isDeletable enabled, delete button onClick handler */
    handleDelete?: (index) => void;
}

const Styled = {
    Root: styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        height: 100%;
        margin: 0.2em;
    `
};

const Thumbnails: React.FunctionComponent<ThumbnailListProps> = ({
    account,
    column,
    isDeletable,
    lists: sources,
    handleClick: _handleClick,
    handleDelete: _handleDelete
}) => {
    const lists = React.useMemo(() => {
        if (typeof lists === "string") {
            return lists;
        } else if (lists[0] instanceof File) {
            return lists.map(v => URL.createObjectURL(v)); // Ouch
        }
    }, []);
    const handleClick = React.useCallback(
        (index: number) => (e: React.MouseEvent<HTMLImageElement>) => {
            e.preventDefault();
            if (_handleClick) {
                _handleClick({
                    account,
                    columnId: column,
                    src: lists,
                    index
                });
            }
        },
        [_handleClick, account, column, lists]
    );

    const handleDelete = React.useCallback(
        (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (_handleDelete) {
                _handleDelete(index);
            }
        },
        [_handleDelete]
    );

    return (
        <>
            {lists.map((v, i) => (
                <Thumbnail
                    key={i}
                    index={i}
                    source={v}
                    handleClick={handleClick ? handleClick(i) : undefined}
                    handleDelete={isDeletable ? handleDelete(i) : undefined}
                />
            ))}
        </>
    );
};

export const ThumbnailList: React.FunctionComponent<ThumbnailListProps> = props => {
    return props.lists ? (
        <Styled.Root>
            <Thumbnails {...props} />
        </Styled.Root>
    ) : (
        <div />
    );
};

export default ThumbnailList;
