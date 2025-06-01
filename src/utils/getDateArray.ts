import { DateObject } from "react-multi-date-picker";
import { ValueType } from "../dataTypes/Input.type";
type GetDateArrayPropsType = {
  startDate: ValueType;
  endDate: ValueType;
};

export const getDateArray = ({ startDate, endDate }: GetDateArrayPropsType) => {
  let enterDay = new DateObject(startDate);
  const exitDay = new DateObject(endDate);
  const dates = [];
  if (exitDay >= enterDay) {
    while (enterDay < exitDay) {
      dates.push(enterDay.format());
      enterDay.add(1, "day");
    }
  }

  return dates;
};
