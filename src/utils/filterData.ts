// ---- get object from an array by its id ----------------------------
interface IdInclude {
  id: string;
}
type GetResultByIDInput<T extends IdInclude> = {
  ID: string;
  data: T[];
};
function getResultByID<T extends IdInclude>({
  ID,
  data,
}: GetResultByIDInput<T>): T {
  const res = data.find((item) => item.id === ID);
  return res ? res : ({} as T);
}

// ---- get object from an array by its name ----------------------------
type GetResultByNameInput<T> = {
  data: T[];
  itemName: keyof T;
	itemAmount: any;
};

function getResultByName<T> ({
  data,
  itemName,
	itemAmount,
}: GetResultByNameInput<T>): T[] {
  const res = data.filter((item) => item[itemName] === itemAmount);
  return res ? res : ([] as T[]);
}

// ---- get some of an item of object from an array -------------------
type GetRangeSumOfDataInput<T> = {
  data: T[];
  range: keyof T;
};
function getRangeSumOfData<T>({
  data,
  range,
}: GetRangeSumOfDataInput<T>): number {
  let sum = 0;
  data.forEach((item) => {
    sum += Number(item[range]);
  });
  return sum;
}

export { getResultByID, getResultByName, getRangeSumOfData };
