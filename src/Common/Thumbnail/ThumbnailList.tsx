import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';

export type ThumbnailListProps = {
    /* unique account key*/
    accountKey: string,

    /* unique column key */
    columnKey: string,

    /* source id is content. */
    sourceId?: string,

    /* file or uri list */
    lists: string[],

    /* deletable? */
    isDeletable?: boolean,

    /* image clicked */
    handleClick?: (Object) => void,

    /* if isDeletable enabled, delete button onClick handler */
    handleDelete?: (index) => void,
};

const Styled = {
    Root: styled.div`
        display: flex;
        flex-wrap: wrap;
        margin: 0.2em;
        height: 100%;
        width: 100%;
    `,
};

const handleClick = (props: ThumbnailListProps, index: number) => (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const src = props.lists;
    if(props.handleClick) {
        props.handleClick({
            account: props.accountKey,
            columnId: props.columnKey,
            src,
            index
        });
    }
};

const handleDelete = (props: ThumbnailListProps, index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if(props.handleDelete) {
        props.handleDelete(index);
    }
};

const Thumbnails = (props: ThumbnailListProps) => {
    return props.lists.map((v, i) => (
        <Thumbnail key={i} index={i} source={v}
            handleClick={props.handleClick ? handleClick(props, i) : undefined}
            handleDelete={props.isDeletable ? handleDelete(props, i) : undefined} />
        )
    )
};

export const ThumbnailList: React.SFC<ThumbnailListProps> = (props: ThumbnailListProps) => (
    <>
        {props.lists ?
            <Styled.Root>
                {Thumbnails(props)}
            </Styled.Root>:
            <div />
        }
    </>
);

export default pure(ThumbnailList);
