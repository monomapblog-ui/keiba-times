import { after, connection } from "next/server";
import { recordView } from "@/lib/views";

export default async function ViewTracker({ slug }: { slug: string }) {
  await connection();
  after(() => recordView(slug));
  return null;
}
