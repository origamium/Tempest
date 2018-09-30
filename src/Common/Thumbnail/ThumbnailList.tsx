import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';
import Thumbnail from './Thumbnail';

export type ThumbnailListProps = {
    account: string,
    lists: File[] | string[],
    isDeletable: boolean,
    handleClick?: (e: React.MouseEvent<HTMLImageElement>) => void,
};

const Styled = {
    Root: styled.div`
        
    `,
};

const ExtractionUri = (source: Array<File | string>): Array<string> =>
    source.map((v: File | string): string => {
        if (typeof v === "string"){
            return v;
        } else if (v instanceof File) {
            return v.name;
        } else {
            throw new Error();
        }
    });

const handleClick = (props: ThumbnailListProps) => (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

};

export const ThumbnailList: React.SFC<ThumbnailListProps> = (props: ThumbnailListProps) => (
    <>
        {props.lists ?
            <Styled.Root>
                {props.lists.map((v, i) =>
                    <Thumbnail
                        key={i}
                        handleClick={props.handleClick}/>)}
            </Styled.Root>:
            <div />
        }
    </>
);

あきた

export default pure(ThumbnailList);
