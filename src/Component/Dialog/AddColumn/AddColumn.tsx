import * as React from "react";
import { useGetColumnSelectorData } from "../../../Redux/Selector/Account/getColumnSelectorData";
import { styled } from "../../../Theme";
import {
    Avatar,
    Button,
    Checkbox,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    TextField,
} from "@material-ui/core";
import { UserProperties } from "../../../datatype/Contents/User";
import { UIActionElement } from "../../../Redux/Logics/DataFlow/UIActions/UIActionControl";
import { useDispatch } from "react-redux";
import { addColumnAction, ColumnSourceElement } from "../../../Redux/Slices/dataStore/column";
import { requestSaveDataStore } from "../../../Redux/Slices/dataStore/requestSaveDataStore";

type AddColumnProps = {
    handleClose: () => void;
};

const Styled = {
    ListBody: styled.div`
        display: flex;
        justify-content: space-between;
        width: 430px;
        max-height: 60%;
    `,
    AccountList: styled(List)`
        flex: 0 1 30%;
        overflow-y: auto;
    `,
    SourceList: styled(List)`
        flex: 1 0 auto;
        overflow-y: auto;
    `,
};

export const AddColumn: React.FC<AddColumnProps> = ({ handleClose }) => {
    const [selectedAccountIndex, setSelectedAccountIndex] = React.useState<number>();
    const [selectedSource, setSelectedSource] = React.useState<ColumnSourceElement[]>([]);
    const [columnName, setColumnName] = React.useState<string>("");

    const handleChangeColumnName = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setColumnName(e.target.value);
    }, []);

    const sources = useGetColumnSelectorData();
    const dispatch = useDispatch();

    const handleClickAccount = React.useCallback(
        (accountIndex: number) => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            setSelectedAccountIndex(accountIndex);
        },
        [],
    );

    const selectedAccountSources = React.useMemo(() => {
        if (selectedAccountIndex === undefined) {
            return undefined;
        }

        const account = sources[selectedAccountIndex].account;
        const sourceList = sources[selectedAccountIndex].sources;

        return {
            account: account,
            src: Object.entries(sourceList ?? {}).map(([key, value]) => ({
                key,
                ...value,
            })),
        };
    }, [selectedAccountIndex, sources]);

    const isSourceChecked = React.useCallback(
        (source: UIActionElement & { key: string }, accountKey: string) => {
            return !!selectedSource?.find((v) => v.sourceKey === source.key && v.accountKey === accountKey);
        },
        [selectedSource],
    );

    const handleClickSource = React.useCallback(
        (source: UIActionElement & { key: string }, accountKey: string) => () => {
            const uiAction = { ...source };
            const sourceKey = source.key;
            const target = { uiAction, sourceKey, accountKey };

            const alreadyChecked = isSourceChecked(source, accountKey);
            if (alreadyChecked) {
                setSelectedSource((prev) =>
                    prev.filter((v) => v.sourceKey !== source.key && v.accountKey !== accountKey),
                );
            } else {
                setSelectedSource((prev) => [...prev, target]);
            }
        },
        [isSourceChecked],
    );

    const isConfirmAllow = React.useMemo(
        () => selectedSource.length > 0 && columnName.length > 0,
        [selectedSource.length],
    );

    const handleConfirm = React.useCallback(() => {
        handleClose();
        dispatch(addColumnAction(columnName, selectedSource));
        dispatch(requestSaveDataStore());
    }, [columnName, dispatch, handleClose, selectedSource]);

    return (
        <>
            <DialogTitle>{"Add Column"}</DialogTitle>
            <TextField label={"insert column name"} required value={columnName} onChange={handleChangeColumnName} />
            <DialogContent>
                <Styled.ListBody>
                    <Styled.AccountList>
                        {sources.map((v, i) => (
                            <ListItem
                                key={v.account.key}
                                button
                                onClick={handleClickAccount(i)}
                                selected={i === selectedAccountIndex}
                            >
                                <ListItemAvatar>
                                    <Avatar src={v.accountData[UserProperties.avatarImage]} />
                                </ListItemAvatar>
                                <ListItemText primary={v.accountData[UserProperties.screenName]} />
                            </ListItem>
                        ))}
                    </Styled.AccountList>
                    <Styled.SourceList>
                        {selectedAccountSources?.src.map((v) => (
                            <ListItem
                                style={{ width: "100%" }}
                                key={`${v.key}${selectedAccountSources?.account.key}`}
                                button
                                onClick={handleClickSource(v, selectedAccountSources?.account.key)}
                            >
                                <ListItemText primary={v.name} secondary={v.description} />
                                <ListItemSecondaryAction>
                                    <Checkbox
                                        edge={"end"}
                                        onClick={handleClickSource(v, selectedAccountSources?.account.key)}
                                        checked={isSourceChecked(v, selectedAccountSources?.account.key)}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                    </Styled.SourceList>
                </Styled.ListBody>
            </DialogContent>
            <DialogActions style={{ display: "flex", justifyContent: "space-between" }}>
                <Button onClick={handleClose}>{"Cancel"}</Button>
                <Button variant={"contained"} color={"primary"} disabled={!isConfirmAllow} onClick={handleConfirm}>
                    {"Confirm"}
                </Button>
            </DialogActions>
        </>
    );
};
