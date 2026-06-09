import { InferSchemaType, Model, model, models, Schema, Types } from "mongoose";

const ColumnSchema = new Schema(
  {
    name: { type: String, required: true },
    order: { type: Number, required: true },
    bordId: { type: Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false },
);

type Column = InferSchemaType<typeof ColumnSchema>;

const ColumnModel: Model<Column> =
  models.Column || model("Column", ColumnSchema);

export default ColumnModel;
