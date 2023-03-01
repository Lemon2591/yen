import React, { useState } from "react";
import { Header } from "./Header";
import { OverViewComponent } from "./over-view/OverViewComponent";
import { EdataFilters } from "./over-view/OverViewComponent";

export function DasboardMain() {
  const [dataFilters, setDataFilter] = useState<string>(EdataFilters.All);

  const [dataTest, setDataTest] = useState<string>("");

  const setDataSearch = (data: string) => {
    setDataTest(data);
  };

  const dataFilter = (data: string) => {
    setDataFilter(data);
  };

  return (
    <div className="DasboardMain-main">
      <Header dataFilter={dataFilter} setDataSearch={setDataSearch} />
      <OverViewComponent dataFilters={dataFilters} dataTest={dataTest} />
    </div>
  );
}
