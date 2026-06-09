import { Suspense } from "react";
import { getSession } from "@/shared/lib/auth";
// components
import Loader from "@/shared/ui/loaders/Loader";
import Hero from "@/features/home/components/HomePage";
import BoardsPage from "@/features/bord/components/BoardsPage";

async function HomePage() {
  const session = await getSession();
  if (!session) {
    return <Hero />;
  }

  return (
    <Suspense fallback={<Loader />}>
      <BoardsPage userId={String(session.id)} />
    </Suspense>
  );
}

export default HomePage;
