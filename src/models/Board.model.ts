import { model, models, Schema, Types } from "mongoose";

const BoardSchema = new Schema(
  {
    title: { type: String, required: true },
    stared: { type: Boolean },
    creator: { type: Types.ObjectId, ref: "User", required: true },
    // columnsIds: {type: [Types.ObjectId], ref: "Column", default: []},
    setting: { type: Object },
  },
  { timestamps: true },
);

const BoardModel = models.Board || model("Board", BoardSchema);

export default BoardModel;
