import { Document } from 'mongoose';
export type CounterDocument = Counter & Document;
export declare class Counter {
    _id: string;
    seq: number;
}
export declare const CounterSchema: import("mongoose").Schema<Counter, import("mongoose").Model<Counter, any, any, any, Document<unknown, any, Counter> & Counter & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Counter, Document<unknown, {}, import("mongoose").FlatRecord<Counter>> & import("mongoose").FlatRecord<Counter> & Required<{
    _id: string;
}>>;
