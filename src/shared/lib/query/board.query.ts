import { BordPayload } from "@/shared/types/bord.types";
import { createBoard } from "@/features/bord/actions/bord.actions";

// export async function createBord({ title }: BordPayload) {
//   try {
//     const response = await queryFetcher("/api/bord", {
//       method: "POST",
//       body: JSON.stringify({ title }),
//     });
//     // if (response?.success) {
//     //   revalidateTag("boards");
//     // }
//     return response.data;
//   } catch (error) {
//     console.log("error happen in creating board", error);
//   }
// }

export const createBoardOpt = {
  mutationKey: ["create-board"],
  mutationFn: (payload: BordPayload) => createBoard(payload),
} as const;
