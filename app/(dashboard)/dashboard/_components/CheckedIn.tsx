import { delay } from "@/lib/utils";
import ValueCard from "./ValueCard";

export default async function CheckedIn() {
  return (
    <ValueCard key={1} value={200} title="Checked In" subtitle="Open/Closed" />
  );
}
