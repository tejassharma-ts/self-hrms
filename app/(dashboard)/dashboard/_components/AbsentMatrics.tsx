import { delay } from "@/lib/utils";
import ValueCard from "./ValueCard";

export default async function AbsentMatrics() {
  // fetch the metrics
  // await delay(1500);

  return (
    <ValueCard
      key={2}
      value={40}
      title="Absent"
      subtitle="Not checked In + On Leave"
    />
  );
}
