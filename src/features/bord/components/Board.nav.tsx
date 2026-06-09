import NewColumnModal from "@/shared/ui/modals/NewColumnModal";
import { Toolbar, Typography } from "@mui/material";
import { getBoardData } from "../actions/bord.actions";

async function BoardNav({ bordId }: { bordId: string }) {
  // const bordData = await getBoardData(bordId);
  // if (!bordData?.data) return null;
  // const {
  //   data: { bord },
  // } = bordData;
  // console.log({ bordData });
  return (
    <Toolbar
      sx={{ width: "100%" }}
      className="flex items-center justify-between"
    >
      <Typography variant="h1" align="center" className="py-9">
        {/* {bord.title || "Board Page"} */}
        BORDS
      </Typography>

      <NewColumnModal />
    </Toolbar>
  );
}

export default BoardNav;
