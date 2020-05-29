import * as React from "react";
import { styled } from "../../Theme";
import { ClearButton } from "../IconButton/IconButton";

export interface ThumbnailProps {
    source: string;
    index: number;
    measure: () => void;
    handleClick?: (e: React.SyntheticEvent<HTMLDivElement>) => void;
    handleDelete?: (e: React.SyntheticEvent<HTMLButtonElement>) => void;
}

const Styled = {
    Root: styled.div`
        position: relative;
        box-sizing: border-box;
        flex: 1 0 50%;
        width: 100%;
        min-width: 64px;
        min-height: 64px;
        max-height: 120px;
        padding: 1px;
        overflow: hidden;
        border: solid 1px white;
        border-radius: 3%;

        & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `,
    DeleteButton: styled.div`
        position: absolute;
        top: 5%;
        right: 5%;
        background-color: rgba(41, 41, 41, 0.5);
        border-radius: 50%;
    `,
};

export const Thumbnail: React.FunctionComponent<ThumbnailProps> = ({
    source,
    index,
    measure,
    handleClick,
    handleDelete,
}) => (
    <Styled.Root style={{ cursor: handleClick ? "pointer" : "default" }} onClick={handleClick}>
        <img src={source} onLoad={measure} alt={source} />
        {handleDelete ? (
            <Styled.DeleteButton>
                <ClearButton
                    style={{ negativeColor: "#ddd", size: "26px" }}
                    id={`${index.toString()}:${source}`}
                    handleClick={handleDelete}
                />
            </Styled.DeleteButton>
        ) : (
            <div />
        )}
    </Styled.Root>
);
