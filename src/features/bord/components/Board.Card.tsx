import { Card, CardContent } from "@mui/material";
import { IBord } from "@/shared/types/bord.types";
import { formatDateString } from "@/shared/utils/util";
import Link from "next/link";

function BoardCard({ _id, createdAt, title }: IBord) {
  return (
    <Card
      sx={{
        width: "100%",
        minHeight: "112px",
      }}
    >
      <Link href={`/b/${_id}`} className="block">
        <CardContent className="flex flex-col gap-5">
          <h6 className="text-[20px] font-medium leading-tight">{title}</h6>
          <p className="text-sm text-gray-500">
            {formatDateString(String(createdAt))}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
}

export default BoardCard;
