import * as React from 'react';
import { pure } from 'recompose';
import styled from 'styled-components';

export type ThumbnailProps = {
    source: File,
    handleDelete: (e: React.MouseEvent<HTMLDivElement>) => void,
};

const Styled = {
    Root: styled.div`
        position: relative;
        overflow: hidden;
        border: solid 1px gray;
        border-radius: 10%;
    `,
    Image: styled.img`
    `,
    DeleteButton: styled.div`

    `,
};

export const Thumbnail: React.SFC<ThumbnailProps> = (props: ThumbnailProps) => (
    <Styled.Root>
        <Styled.Image />
        <Styled.DeleteButton onClick={props.handleDelete}/>
    </Styled.Root>
);

export default pure(Thumbnail);
