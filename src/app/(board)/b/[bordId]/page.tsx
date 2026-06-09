import { getBordData } from "@/features/bord/actions/bord.actions";
import { Params } from "@/shared/types/types";
import ColumnList from "@/features/columns/components/ColumnList";
import BoardNav from "@/features/bord/components/Board.nav";
import { Suspense } from "react";
import ColumnSkeletonWrapper from "@/shared/ui/skeletones/ColumnSkeleton";
import { getSession } from "@/shared/lib/auth";
import { unstable_cache } from "next/cache";
import { redirect } from "next/navigation";
import { Typography } from "@mui/material";
import { IBordDetails } from "@/shared/types/bord.types";

async function BoardPage({ params }: Params<{ bordId: string }>) {
  const { bordId } = await params;

  return (
    <div className="px-5 w-full h-[calc(100%-_174px)]">
      <BoardNav bordId={bordId} />
      <Suspense fallback={<ColumnSkeletonWrapper />}>
        <BordContent bordId={bordId} />
      </Suspense>
    </div>
  );
}

async function BordContent({ bordId }: { bordId: string }) {
  const session = await getSession();
  if (!session) redirect("/login");
  let error: string | null = null;
  const bordData = await unstable_cache(
    async () => await getBordData(bordId, String(session.id)),
    [`bord/${bordId}`],
    { tags: [`bord/${bordId}`] },
  )();

  if (bordData) error = null;
  if (error) return <Typography variant="h3">{error}</Typography>;
  return <ColumnList bordData={filterRawBoardData(bordData, bordId)} />;
}

export default BoardPage;

function filterRawBoardData(
  bordData: IBordDetails | undefined,
  bordId: string,
) {
  if (!bordData?.bord) return;

  const filtredBoardData = bordData.columns
    .filter((col) => String(col.bordId) === bordId)
    .sort((a, b) => a.order - b.order);

  const finalBoardData: IBordDetails = {
    ...bordData,
    columns: filtredBoardData,
  };

  return finalBoardData;
}
