import * as React from "react";
import { DialogTitle } from "@material-ui/core";
import { ServiceSelect } from "./ServiceSelect";
import { useDispatch, useSelector } from "react-redux";
import { StoreType } from "../../../Redux/Store/StoreType";
import { DataStoreType } from "../../../Redux/Slices/dataStore/reducer";
import { requestAuthorizationSequenceAction } from "../../../Redux/Slices/authorization/requestAuthorizationSequence";

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

export const AddAccount: React.FC = () => {
    const datastore = useSelector<StoreType, DataStoreType | null>((state) => state.dataStore);
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
            dispatch(requestAuthorizationSequenceAction(key));
        },
        [dispatch]
    );

    return (
        <>
            <DialogTitle>アカウントの追加</DialogTitle>
            <ServiceSelect list={list} handleSubmitProvider={handleSubmitProvider} />
        </>
    );
};
