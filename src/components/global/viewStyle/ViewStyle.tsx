import { CiGrid2H, CiGrid41 } from "react-icons/ci";
import "./viewStyle.scss";

export default function ViewStyle({
  setView,
}: {
  setView: (view: "grid" | "list") => void;
}) {
  return (
    <div className="viewStyle-container">
      <CiGrid2H onClick={() => setView("list")} className="icon" />
      <CiGrid41 onClick={() => setView("grid")} className="icon" />
    </div>
  );
}
