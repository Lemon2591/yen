import React, { useState, useEffect, createContext, ReactNode } from "react";
import { AlertErr, AlertSuccess } from "../component/Alert";
import { Loading } from "../component/Loading";
import { IRepair } from "../component/over-view/Repair";

export interface DataChildrenContextProps {
  children: ReactNode;
}

export const DataInfoContext = createContext<
  {
    data: IRepair["dataProps"][];
    setCheckData: () => void;
  }[]
>([]);

function DataContext({ children }: DataChildrenContextProps) {
  const [data, setData] = useState<IRepair["dataProps"][]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlert, setIsAlert] = useState<boolean>(false);
  const [isCheckData, setIsCheckData] = useState<boolean>(false);

  const setCheckData = () => {
    setIsCheckData(true);
  };

  const checkAlert = () => {
    let i: number = 0;
    const interval: NodeJS.Timer = setInterval(() => {
      i = i + 1;
      if (i === 5 && data.length === 0) {
        setIsLoading(false);
        setIsAlert(true);
      } else if (i === 8) {
        setIsAlert(false);
      } else if (i === 9) {
        clearInterval(interval);
      }
    }, 1000);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8000/data", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
        setIsCheckData(false);
      })
      .catch(() => {
        checkAlert();
      });
  }, [isCheckData]);
  return (
    <DataInfoContext.Provider value={[{ data, setCheckData }]}>
      {children}
      {/* {isLoading ? <Loading /> : null} */}
      {isAlert ? <AlertErr /> : null}
    </DataInfoContext.Provider>
  );
}

export default DataContext;
