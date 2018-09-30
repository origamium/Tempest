import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';
import { ClearButton } from "../IconButton/IconButton";

export type ThumbnailProps = {
    source: File | string,
    index: number,
    handleClick?: (e: React.MouseEvent<HTMLImageElement>) => void,
    handleDelete?: (e: React.MouseEvent<HTMLDivElement>) => void,
};

const Styled = {
    Root: styled.div`
        position: relative;
        overflow: hidden;
        border: solid 1px gray;
        border-radius: 10%;
    `,
    Image: styled.img`
        object-fit: cover;
    `,
    DeleteButton: styled.div`
        position: absolute;
        top: 0;
        right: 0;
    `,
};

export const Thumbnail: React.SFC<ThumbnailProps> = (props: ThumbnailProps) => (
    <Styled.Root>
        <Styled.Image onClick={props.handleClick} />
        {props.handleDelete ?
            <Styled.DeleteButton>
                <ClearButton
                    style={{negativeColor: "#999", size: 16}}
                    active={false}
                    id={props.index.toString()}
                    handleClick={props.handleDelete} />
            </Styled.DeleteButton>:
            <div />
        }
    </Styled.Root>
);

export default pure(Thumbnail);
