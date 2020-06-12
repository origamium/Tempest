export default abstract class Exportable {
    public abstract export(): string | never; // json.stringify
}
