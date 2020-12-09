export type TransformArraySchema = { _key: string; schema: TransformObjectSchema };

export type TransformObjectSchema =
    | {
          _key: string;
          schema: {
              [key: string]: TransformSchema;
          };
      }
    | {
          [key: string]: TransformSchema;
      };

// important: TransformSchemaObject[]の配列の長さは常に1
export type TransformSchema = string | TransformObjectSchema | TransformArraySchema[];
