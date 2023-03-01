import React, { useContext, useEffect, useState } from "react";
import { MdOutlineAttachFile } from "react-icons/md";
import { VscLayersActive } from "react-icons/vsc";
import { DataInfoContext } from "../../context/DataContext";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { Repair } from "./Repair";
import { AlertSuccess, AlertErr } from "../Alert";
import { Loading } from "../Loading";
import { IDataRepair, IRepair } from "./Repair";

export enum EdataFilters {
  All = "All",
  Active = "Active",
  Completed = "Completed",
  Open = "Open this select menu",
  Success = "success",
  TimeDefautl = 0,
  TimeDeadline = 1,
  TimeOut = 2,
}

interface IFilter {
  dataFilters: string;
  dataTest: string;
}

function OverViewComponent({ dataFilters, dataTest }: IFilter) {
  const [isRepair, setIsRepair] = useState<boolean>(false);
  const [dataProps, setDataProps] = useState<IRepair["dataProps"]>({
    id: 0,
    title: "",
    status: "",
    description: "",
    time: "",
    date: "",
    checkTime: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const data: {
    data: IRepair["dataProps"][];
    setCheckData: () => void;
  }[] = useContext(DataInfoContext);

  let datas: IRepair["dataProps"][] = [];

  if (dataFilters === EdataFilters.All) {
    datas = data[0].data;
  } else {
    if (
      dataFilters === EdataFilters.Active ||
      dataFilters === EdataFilters.Completed
    ) {
      const result = data[0].data.filter((data) => {
        return data.status === dataFilters;
      });
      datas = result;
    }
  }

  if (dataTest !== "") {
    const a = data[0].data.filter((data) => {
      return dataTest ? data.title.includes(dataTest) : data;
    });
    datas = a;
  }

  const handleDel = (id: number) => {
    setIsLoading(true);
    fetch(`http://localhost:8000/data/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        window.location.reload();
      });
  };

  const openModel = (id: number) => {
    data[0].data?.map((data) => {
      if (data.id === id) {
        setDataProps(data);
      }
    });
    setIsRepair(true);
  };

  const closeModel = (data: boolean) => {
    if (data) {
      setIsRepair(false);
    }
  };

  const checkAlert = (data: string) => {
    if (data === "success") {
      setIsSuccess(true);
    }
  };

  const callBackData: () => void = () => {
    data[0].setCheckData();
  };

  const interval = setInterval(() => {
    const today: Date = new Date();
    const dd: string = String(today.getDate()).padStart(2, "0");
    const mm: string = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy: number = today.getFullYear();
    let hours: string = String(today.getHours());
    let min: string = String(today.getMinutes());
    let se: string = String(today.getSeconds());

    let a: number;
    if (hours.length === 1) {
      hours = "0" + hours;
    }
    if (min.length === 1) {
      min = "0" + min;
    }
    data[0].data?.map((data) => {
      const year: string = data.date.slice(0, 4);
      const month: string = data.date.slice(5, 7);
      const day: string = data.date.slice(8, 11);
      const h: string = data.time.slice(0, 2);
      const m: string = data.time.slice(3, 5);

      if (yyyy - Number(year) === 0) {
        if (Number(mm) - Number(month) === 0) {
          if (Number(dd) - Number(day) === 0) {
            if (Number(h) - Number(hours) <= 1 && Number(m) <= Number(min)) {
              if (data.checkTime === EdataFilters.TimeDefautl) {
                const value = {
                  title: data.title,
                  status: data.status,
                  description: data.description,
                  time: data.time,
                  date: data.date,
                  checkTime: 1,
                };
                fetch(`http://localhost:8000/data/${data.id}`, {
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(value),
                })
                  .then((res) => res.json())
                  .then((data) => data)
                  .then(() => {
                    callBackData();
                  });
              } else {
              }
            }

            if (
              (Number(h) === Number(hours) && Number(m) === Number(min)) ||
              (Number(h) === Number(hours) && Number(m) < Number(min))
            ) {
              const value = {
                title: data.title,
                status: data.status,
                description: data.description,
                time: data.time,
                date: data.date,
                checkTime: 2,
              };
              fetch(`http://localhost:8000/data/${data.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value),
              })
                .then((res) => res.json())
                .then((data) => data)
                .then(() => {
                  clearInterval(interval);
                })
                .then(() => {
                  callBackData();
                });
            } else {
            }
          }
        }
      }
    });
  }, 1000);

  return (
    <>
      {isLoading ? <Loading /> : null}
      {isSuccess ? <AlertSuccess /> : null}
      {isRepair ? (
        <Repair
          closeModel={closeModel}
          dataProps={dataProps}
          checkAlerts={checkAlert}
        />
      ) : null}

      <div className="over-view-main">
        <div className="over-view-container">
          {datas &&
            datas?.map((data, index) => {
              return (
                <div className="over-view-col" key={index}>
                  <div className="col-main">
                    <div className="col-header">
                      <h3 className="data-title">{data?.title}</h3>
                      <i className="menu-control">
                        <div className="col-menu-control">
                          <ul>
                            <li
                              className="repair"
                              onClick={() => {
                                openModel(data.id);
                              }}
                            >
                              Repair
                            </li>
                            <li
                              className="repair"
                              onClick={() => {
                                handleDel(data.id);
                              }}
                            >
                              Delete
                            </li>
                          </ul>
                        </div>
                        <BiDotsVerticalRounded />
                      </i>
                    </div>
                    <div className="col-content col-header">
                      <p>Status</p>
                      <span>
                        <p>{data?.status}</p>
                        <i>
                          <VscLayersActive />
                        </i>
                      </span>
                    </div>

                    <div className="col-description">
                      <div className="des-header">
                        <i>
                          <MdOutlineAttachFile />
                        </i>
                      </div>
                      <div className="des-content">
                        <p>{data?.description}</p>
                      </div>
                    </div>

                    <div className="col-time">
                      <p>Date: {data?.date} (yy/mm/dd)</p>
                      <p>Time: {data?.time}</p>

                      {data?.checkTime === EdataFilters.TimeDeadline ? (
                        <div className="deadline-notify">
                          <p>Sắp hết thời gian hoàn thành</p>
                        </div>
                      ) : data?.checkTime === EdataFilters.TimeOut ? (
                        <div className="deadline-notify">
                          <p>Đã hết thời gian</p>
                        </div>
                      ) : (
                        <div className="deadline-notify">
                          <p>&emsp;</p>
                        </div>
                      )}
                    </div>

                    <div className="col-footer">
                      <p>{data?.id}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export { OverViewComponent };
