export abstract class Exportable {
    public abstract export(): string | object | never; // json.stringifyable
}
