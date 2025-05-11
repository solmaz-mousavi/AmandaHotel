import { DateObject } from "react-multi-date-picker";
type GetDateArrayPropsType = {
startDate:string; endDate:string
}

export const getDateArray = ({startDate, endDate}:GetDateArrayPropsType) => {
  let enterDay = new DateObject(startDate);
	const exitDay = new DateObject(endDate);
  const dates = [];

  while (enterDay < exitDay) {
    dates.push(enterDay.format());
    enterDay.add(1, "day");
  }

  return dates;
};