import React, { useEffect, useState } from "react";

import { Loading } from "../Loading";
import { AlertSuccess, AlertErr } from "../Alert";
import { IDataRepair } from "../over-view/Repair";
import { EdataFilters } from "../over-view/OverViewComponent";
import { listInput } from "./ListInput";

export function AddList() {
  const [value, setValue] = useState<IDataRepair>({
    title: "",
    status: "",
    description: "",
    time: "",
    date: "",
    checkTime: 0,
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAlertStatus, setUsAlertStatus] = useState<string>("");
  const [isValidation, setIsValidation] = useState<{
    title: boolean;
    status: boolean;
    description: boolean;
    date: boolean;
    time: boolean;
  }>({
    title: true,
    status: true,
    description: true,
    date: true,
    time: true,
  });

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

  const handleSubmit = () => {
    setIsLoading(true);
    fetch("http://localhost:8000/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setUsAlertStatus("true");
          setIsLoading(false);
        } else {
          setTimeout(() => {
            setUsAlertStatus("false");
            setIsLoading(false);
          }, 5000);
        }
      })
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 200);
      });
  };

  useEffect(() => {
    setTimeout(() => {
      setUsAlertStatus("");
    }, 3000);
  }, [isAlertStatus]);
  useEffect(() => {
    setTimeout(() => {
      setUsAlertStatus("");
    }, 3000);
  }, [isAlertStatus]);

  const regex = /^[a-z ,.'-]+$/i;
  const date_regex = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  const regex_des = /\s/g;

  const validationInput = () => {
    setIsValidation((data) => {
      return { ...data, title: regex.test(value.title) };
    });

    setIsValidation((data) => {
      return {
        ...data,
        description:
          regex_des.test(value.description) || value.description !== "",
      };
    });

    setIsValidation((data) => {
      return {
        ...data,
        status:
          value.status === EdataFilters.Completed ||
          value.status === EdataFilters.Active,
      };
    });

    setIsValidation((data) => {
      return { ...data, date: !!value.date.match(date_regex) };
    });

    setIsValidation((data) => {
      return { ...data, time: value.time !== "" };
    });
  };

  return (
    <>
      {isAlertStatus === "true" ? (
        <AlertSuccess />
      ) : isAlertStatus === "false" ? (
        <AlertErr />
      ) : null}
      {isLoading ? <Loading /> : null}
      <div className="add-list-container">
        <div className="repair-content repair-content-add ">
          {listInput &&
            listInput?.map(
              (
                data: { label: string; type: string; name: string },
                index: number
              ) => {
                return (
                  <div className="input-repair" key={index}>
                    <div
                      className={
                        !isValidation.title ? "lable lable-validation" : "lable"
                      }
                    >
                      <label
                        // className="lable-validation lable"
                        htmlFor={data.name}
                      >
                        {data.label}
                      </label>
                    </div>
                    <input
                      onChange={handleChange}
                      type={data.type}
                      name={data.name}
                      onBlur={validationInput}
                    />
                  </div>
                );
              }
            )}
          <div className="input-repair">
            <div
              className={
                !isValidation.status ? "lable lable-validation" : "lable"
              }
            >
              <label htmlFor="status">Status</label>
            </div>
            <select
              onChange={handleChange}
              name="status"
              className="status"
              onSelect={validationInput}
              onBlur={validationInput}
            >
              <option>Open this select menu</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="button-repair  button-repair-add">
            <button type="button" onClick={handleSubmit}>
              Save
            </button>
            <button type="button">Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}
