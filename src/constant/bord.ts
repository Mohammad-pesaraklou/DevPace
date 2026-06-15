export const BordMoreOptons = [
  { id: 1, title: "Delete", key: "delete" },
  { id: 2, title: "Rename", key: "rename" },
  { id: 3, title: "Move to other bord", key: "move" },
];
export const TaskMoreOptons = [
  { id: 1, title: "Delete", key: "delete" },
  { id: 2, title: "Edit", key: "edit" },
];
export type TaskMoreOptonType = (typeof TaskMoreOptons)[number];
export type TBordMoreOptions = (typeof BordMoreOptons)[number];
