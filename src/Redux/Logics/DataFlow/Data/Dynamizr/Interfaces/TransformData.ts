export type TransformArraySchema = { key: string; schema: TransformSchemaObject };

export type TransformSchemaObject = {
    [key: string]: TransformSchema;
};

// important: TransformSchemaObject[]の配列の長さは常に1
export type TransformSchema = string | TransformSchemaObject | TransformArraySchema[];
