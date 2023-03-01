import React, { useEffect, useState } from "react";
import { Loading } from "../Loading";
import { EdataFilters } from "./OverViewComponent";

export interface IDataRepair {
  title: string;
  status: string;
  description: string;
  time: string;
  date: string;
  checkTime: number;
}

export interface IRepair {
  closeModel: (data: boolean) => void;
  dataProps: {
    id: number;
    title: string;
    status: string;
    description: string;
    time: string;
    date: string;
    checkTime: number;
  };
  checkAlerts: (data: string) => void;
}

export function Repair({ closeModel, dataProps, checkAlerts }: IRepair) {
  const [value, setValue] = useState<IDataRepair>({
    title: "",
    status: "",
    description: "",
    time: "",
    date: "",
    checkTime: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [checkAlert, setCheckAlert] = useState<string>("");

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const pushData = () => {
    setValue({
      title: dataProps.title,
      status: dataProps.status,
      description: dataProps.description,
      time: dataProps.time,
      date: dataProps.date,
      checkTime: dataProps.checkTime,
    });
  };

  useEffect(() => {
    pushData();
  }, []);

  useEffect(() => {
    checkAlerts(checkAlert);
  }, [checkAlert]);

  const closeModelChild = () => {
    closeModel(true);
  };
  const handleUpdate = () => {
    setIsLoading(true);
    fetch(`http://localhost:8000/data/${dataProps.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setCheckAlert(EdataFilters.Success);
        }
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
  };

  return (
    <>
      {isLoading ? <Loading /> : null}
      <div className="repair-container">
        <div className="repair-main">
          <div className="repair-content">
            <div className="input-repair">
              <div>
                <label htmlFor="title">Title</label>
              </div>
              <input
                onChange={handleChange}
                type="text"
                name="title"
                value={value.title}
              />
            </div>

            <div className="input-repair">
              <div>
                <label htmlFor="status">Status</label>
              </div>
              <select name="status" className="status" onChange={handleChange}>
                <option>Open this select menu</option>
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="input-repair">
              <div>
                <label htmlFor="description">Description</label>
              </div>
              <input
                onChange={handleChange}
                type="text"
                name="description"
                value={value.description}
              />
            </div>
            <div className="input-repair">
              <div>
                <label htmlFor="date">Date</label>
              </div>
              <input
                onChange={handleChange}
                type="date"
                name="date"
                value={value.date}
              />
            </div>
            <div className="input-repair">
              <div>
                <label htmlFor="time">Time</label>
              </div>
              <input
                onChange={handleChange}
                type="time"
                name="time"
                value={value.time}
              />
            </div>
            <div className="button-repair">
              <button type="button" onClick={handleUpdate}>
                Save
              </button>
              <button type="button" onClick={closeModelChild}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
