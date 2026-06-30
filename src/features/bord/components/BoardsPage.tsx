import { IBord } from "@/shared/types/bord.types";
import BoardCard from "./Board.Card";
import { getBoards } from "../actions/bord.actions";
import { Grid2 } from "@mui/material";

interface Props {
  userId: string;
}

async function BoardsPage({ userId }: Props) {
  const bords = await getBoards(userId);
  const renderCondition = Array.isArray(bords);

  return (
    <div className="w-full p-8">
      <Grid2 container sx={{ width: "100%" }} rowSpacing={4} columnSpacing={4}>
        {renderCondition &&
          bords?.map((bord: IBord) => (
            <Grid2 key={String(bord._id)} size={{ xs: 12, md: 4 }}>
              <BoardCard {...bord} />
            </Grid2>
          ))}
      </Grid2>
    </div>
  );
}

export default BoardsPage;
