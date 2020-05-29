import React from "react";
import { styled } from "../../Theme";
import { Thumbnail } from "./Thumbnail";
import { IUICommonAttribute } from "../../../datatype/UI/UICommonAttribute";

export interface ThumbnailListProps extends IUICommonAttribute {
    /* source id is content. */
    sourceId?: string;

    /* file or uri list */
    lists: string[];

    /* deletable? */
    isDeletable?: boolean;

    /* image clicked */
    handleClick?: (obj: { account: string; columnId: string; src: string[]; index: number }) => void;

    /* if isDeletable enabled, delete button onClick handler */
    handleDelete?: (index: number) => void;

    measure?: () => void;
}

const Styled = {
    Root: styled.div`
        display: inline-flex;
        flex-wrap: wrap;
        width: 100%;
        margin: 0.2em;
    `,
};

const Thumbnails: React.FunctionComponent<ThumbnailListProps> = ({
    account,
    column,
    isDeletable,
    lists,
    handleClick: _handleClick,
    handleDelete: _handleDelete,
    measure = () => {},
}) => {
    const handleClick = React.useCallback(
        (index: number) => (e: React.SyntheticEvent<HTMLDivElement>) => {
            e.preventDefault();
            if (_handleClick) {
                _handleClick({
                    account,
                    columnId: column,
                    src: lists,
                    index,
                });
            }
        },
        [_handleClick, account, column, lists]
    );

    const handleDelete = React.useCallback(
        (index: number) => (e: React.SyntheticEvent<HTMLButtonElement>) => {
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
                    measure={measure}
                    handleClick={handleClick ? handleClick(i) : undefined}
                    handleDelete={isDeletable ? handleDelete(i) : undefined}
                />
            ))}
        </>
    );
};

export const ThumbnailList: React.FunctionComponent<ThumbnailListProps> = (props) => {
    return props.lists.length > 0 ? (
        <Styled.Root>
            <Thumbnails {...props} />
        </Styled.Root>
    ) : (
        <div />
    );
};
