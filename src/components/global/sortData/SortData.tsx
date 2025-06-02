import "./sortData.scss";
import { TbSortDescending } from "react-icons/tb";
import { useState } from "react";

export type SortInfoType<T> = {
  id: string;
  title: string;
  fieldName: keyof T;
  sortMethod:
    | "ValueMinToMax"
    | "ValueMaxToMin"
    | "AlphabetMinToMax"
    | "AlphabetMaxToMin";
};
type SortDataPropsType<T> = {
  searchResults: T[];
  setSearchResults: (searchResults: T[]) => void;
  setFilteredData: (filteredData: T[]) => void;
  sortInfo: SortInfoType<T>[];
};

export default function SortData<T>({
  searchResults,
  setSearchResults,
  setFilteredData,
  sortInfo,
}: SortDataPropsType<T>) {
  const [sort, setSort] = useState(
    [sortInfo[0].fieldName, sortInfo[0].sortMethod].join("_")
  );

  const sortDataHandler = (valueAndMethod: any) => {
    setSort(valueAndMethod);
    const [value, sortMethod] = valueAndMethod.split("_");
    let sortedData;

    const sorting = sortInfo.find(
      (i) => i.fieldName === value && i.sortMethod === sortMethod
    );

    switch (sorting?.sortMethod) {
      case "ValueMinToMax":
        sortedData = [...searchResults].sort(
          (a, b) => Number(a[sorting.fieldName]) - Number(b[sorting.fieldName])
        );
        break;

      case "ValueMaxToMin":
        sortedData = [...searchResults].sort(
          (a, b) => Number(b[sorting.fieldName]) - Number(a[sorting.fieldName])
        );
        break;

      case "AlphabetMinToMax":
        sortedData = [...searchResults];
        break;

      case "AlphabetMaxToMin":
        sortedData = [...searchResults];
        break;

      default:
        break;
    }

    sortedData && setSearchResults(sortedData);
    sortedData && setFilteredData(sortedData);
  };

  return (
    <div className="sort-data-container">
      <TbSortDescending className="icon sort-icon" />
      <select
        name="sortBy"
        id="sortBy"
				className="input"
        value={sort}
        onChange={(event) => sortDataHandler(event.target.value)}
      >
        {sortInfo.map((item) => (
          <option
            value={[item.fieldName, item.sortMethod].join("_")}
            key={item.id}
          >
            {item.title}
          </option>
        ))}
      </select>
    </div>
  );
}
