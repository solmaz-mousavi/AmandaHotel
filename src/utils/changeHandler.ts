import { DateObject } from "react-multi-date-picker";

export const changeHandler = (
  value: string | DateObject,
	name: string,
  tag: "date" | "number",
  setState: (state: string | DateObject) => void,
) => {
  if (tag === "date" && typeof value !== "string") {
    setState(value.format());
  }
  if (tag === "number" && typeof value === "string") {
    const newValue = value.replace(/,/g, "");
    if (newValue === "" || !isNaN(Number(newValue))) {
      setState(newValue);
    }
  }
};
