export interface UIAction {
    id: string;
    name: string;
    description?: string;
    action: Function;
}