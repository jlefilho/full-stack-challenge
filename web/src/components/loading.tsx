import { ClipLoader } from "react-spinners";

export function Loading() {
  return <ClipLoader size={60} color="var(--orange-low)" loading={true} />;
}
