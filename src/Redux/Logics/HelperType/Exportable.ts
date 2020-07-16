export abstract class Exportable {
    public abstract export(): object | never; // json.stringifyable
}

export abstract class ExportableRoot {
    public abstract export(): string;
}
