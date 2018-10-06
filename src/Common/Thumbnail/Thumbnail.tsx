import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';
import { ClearButton } from "../IconButton/IconButton";

export type ThumbnailProps = {
    source: string,
    index: number,
    handleClick?: (e: React.MouseEvent<HTMLImageElement>) => void,
    handleDelete?: (e: React.MouseEvent<HTMLDivElement>) => void,
};

const Styled = {
    Root: styled.div<any>`
        position: relative;
        overflow: hidden;
        padding: 1px;
        border-radius: 3%;
        
        background: url(${({src}) => src}) center center;
        background-size: cover;
        min-width: 64px;
        width: 100%;
        min-height: 64px;
        height: auto;
        flex: 1 0 50%;
    `,
    DeleteButton: styled.div`
        position: absolute;
        background-color: rgba(41,41,41,0.5);
        border-radius: 50%;
        top: 5%;
        right: 5%;
    `,
};

export const Thumbnail: React.SFC<ThumbnailProps> = (props: ThumbnailProps) => (
    <Styled.Root src={props.source} onClick={props.handleClick}
        style={{cursor: props.handleClick ? "pointer" : "default"}}>
        {props.handleDelete ?
            <Styled.DeleteButton>
                <ClearButton
                    style={{negativeColor: "#ddd", size: "26px"}}
                    id={props.index.toString()+":"+props.source}
                    handleClick={props.handleDelete} />
            </Styled.DeleteButton>:
            <div />
        }
    </Styled.Root>
);

export default pure(Thumbnail);
