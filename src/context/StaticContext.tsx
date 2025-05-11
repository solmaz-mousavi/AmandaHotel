import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { createContext } from "react";
import { StaticDataType } from "../dataTypes/StaticData.type";
type StaticDataContextPropsType = {
	staticData : StaticDataType;
}
export const StaticDataContext = createContext<StaticDataContextPropsType>(
	{} as StaticDataContextPropsType
);

function StaticDataProvider({ children }:{children:ReactNode}) {
  const [staticData, setStaticData] = useState<StaticDataType>({} as StaticDataType);

  useEffect(() => {
    axios
      .get("/AmandaHotel/data/staticDB.json")
      .then((res) => setStaticData(res.data));
  }, []);

  return (
    <StaticDataContext.Provider
      value={{
        staticData,
      }}
    >
      {children}
    </StaticDataContext.Provider>
  );
}

export default StaticDataProvider;