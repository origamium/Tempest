import * as React from 'react';
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
    lists: File[] | string[],

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

const ExtractionUri = (source: Array<any>): Array<string> =>
    source.map((v: any): string => {
        if (typeof v === "string"){
            return v;
        } else if (v.preview) { // File
            return v.preview.toString();
        } else {
            console.log(v);
            throw new Error();
        }
    });

const handleClick = (props: ThumbnailListProps, index: number) => (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();
    const src = ExtractionUri(props.lists);
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

const Thumbnails = (props: ThumbnailListProps): React.ReactNode => {
    const lists: string[] = ExtractionUri(props.lists);
    return lists.map((v, i) => (
        <Thumbnail key={i} index={i} source={v}
            handleClick={props.handleClick ? handleClick(props, i) : undefined}
            handleDelete={props.isDeletable ? handleDelete(props, i) : undefined} />
        )
    )
};

export const ThumbnailList: React.FunctionComponent<ThumbnailListProps> = React.memo((props: ThumbnailListProps) => (
    <>
        {props.lists ?
            <Styled.Root>
                {Thumbnails(props)}
            </Styled.Root>:
            <div />
        }
    </>
));

export default ThumbnailList;
