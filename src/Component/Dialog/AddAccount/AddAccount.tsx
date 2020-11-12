import * as React from "react";
import { DialogTitle } from "@material-ui/core";
import { ServiceSelect } from "./ServiceSelect";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../Redux/Store/StoreType";
import { DataStoreType } from "../../../Redux/Slices/dataStore/reducer";
import { requestAuthorizationSequenceAction } from "../../../Redux/Slices/authorization/requestAuthorizationSequence";
import { requestActivateCode } from "../../../Redux/Slices/authorization/requestActivateCode";
import { InputPIN } from "./InputPIN";

export type AddAccountProps = {
    pageNumber: number;
    handleClose: () => void;
};

export type ServiceListType = {
    service: string;
    name: string;
    providers: {
        key: string;
        name: string;
        icon?: string;
        description?: string;
    }[];
};

export type ProviderSelector = Array<ServiceListType>;

export const AddAccount: React.FC<AddAccountProps> = ({ pageNumber, handleClose }) => {
    const datastore = useSelector<StoreType, DataStoreType | null>((state) => state.dataStore);
    const [selectedProvider, setSelectedProvider] = React.useState<string>();
    const dispatch = useDispatch();

    const list = React.useMemo<ProviderSelector>(() => {
        if (datastore) {
            const { service, provider } = datastore;
            const services = service.getServices();
            const providers = provider.getProviders();
            return services.reduce(
                (accm: ProviderSelector, curr): ProviderSelector => [
                    ...accm,
                    {
                        service: curr.key,
                        name: curr.name,
                        providers: providers
                            .filter((v) => v.service === curr.key)
                            .map((v) => ({
                                key: `${curr.key},${v.key}`,
                                name: v.name,
                                description: "",
                                icon: v.name.slice(0, 2),
                            })),
                    },
                ],
                []
            );
        }
        return [];
    }, [datastore]);

    const handleSubmitProvider = React.useCallback(
        (key: string) => {
            setSelectedProvider(key);
            dispatch(requestAuthorizationSequenceAction(key));
        },
        [dispatch]
    );

    const handleSubmitPIN = React.useCallback(
        (key: string, code: string) => {
            dispatch(requestActivateCode({ key, code }));
        },
        [dispatch]
    );

    return (
        <>
            <DialogTitle>{"Add Account"}</DialogTitle>
            {pageNumber === 1 && (
                <ServiceSelect list={list} handleSubmitProvider={handleSubmitProvider} handleClose={handleClose} />
            )}
            {pageNumber === 2 && selectedProvider && (
                <InputPIN providerKey={selectedProvider} handleSubmitPIN={handleSubmitPIN} />
            )}
        </>
    );
};
