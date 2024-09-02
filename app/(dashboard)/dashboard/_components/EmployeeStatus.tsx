import CheckedIn from "./CheckedIn";
import AbsentMatrics from "./AbsentMatrics";

export default function EmployeeStatus() {
  return (
    <>
      <div className="col-span-2 mb-4">
        <CheckedIn />
      </div>
      <div className="col-span-2 mb-4">
        <AbsentMatrics />
      </div>
    </>
  );
}
