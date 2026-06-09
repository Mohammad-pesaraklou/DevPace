import { InferSchemaType, Model, model, models, Schema, Types } from "mongoose";

const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["block", "pending", "done"] },
    columnId: { type: Types.ObjectId, ref: "Column" },
    boardId: { type: Types.ObjectId, ref: "Board" },
    order: { type: Number, required: true },
  },
  { timestamps: true },
);
const TaskModel = models.Task || model("Task", TaskSchema);

export default TaskModel;
