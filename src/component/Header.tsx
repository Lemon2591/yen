import React, { useEffect, useState, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsChevronDown } from "react-icons/bs";
import { BiFilterAlt } from "react-icons/bi";
import { DataInfoContext } from "../context/DataContext";
import { IRepair } from "./over-view/Repair";
import { EdataFilters } from "./over-view/OverViewComponent";
import { Search } from "react-router-dom";

interface Filter {
  dataFilter: (data: string) => void;
  setDataSearch: (data: string) => void;
}

export function Header({ dataFilter, setDataSearch }: Filter) {
  const data: {
    data: IRepair["dataProps"][];
    setCheckData: () => void;
  }[] = useContext(DataInfoContext);
  const [actives, setActives] = useState<string[]>([]);
  // const [dataSearch, setDataSearch] = useState<{ search: string }>({
  //   search: "",
  // });
  const [completeds, setCompleteds] = useState<string[]>([]);
  const handleFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dataFilter(e.target.value);
  };

  const setTextSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setDataSearch({
    //   ...dataSearch,
    //   [e.target.name]: e.target.value,
    // });
    setDataSearch(e.target.value);
  };
  useEffect(() => {
    let active: string[] = [];
    let completed: string[] = [];
    data[0].data.map((data) => {
      if (data.status === EdataFilters.Active) {
        active.push(data.status);
        setActives(active);
      } else {
        if (data.status === EdataFilters.Completed) {
          completed.push(data.status);
          setCompleteds(completed);
        }
      }
    });

    // const a = data[0].data.filter((data) =>
    //   dataSearch.search ? data.title.includes(dataSearch.search) : data
    // );
  }, [data]);

  return (
    <div className="header-main">
      <div className="header-container">
        <ul>
          <li>
            <span className="header-icon-search">
              <AiOutlineSearch />
            </span>
            <span className="header-input">
              <input
                type="text"
                placeholder="Tìm kiếm"
                name="search"
                onChange={setTextSearch}
              />
            </span>
          </li>
          <li className="infor">
            <span>
              <MdOutlineContactSupport />
            </span>
            <span>
              <IoMdNotificationsOutline />
            </span>
            <span>
              <div className="user">
                <p>anhtuan</p>
                <i>
                  <BsChevronDown />
                </i>
              </div>
            </span>
            <span>
              <div className="img-user">
                <img
                  src="https://blogphanmem.vn/wp-content/uploads/2022/08/image_2022-08-31_145226057.png"
                  alt=""
                />
              </div>
            </span>
          </li>
        </ul>
        <ul className="menu-short">
          <li>
            <span>
              <p>Total: {data[0].data.length} items</p>
            </span>
            <span>
              Completed: {completeds.length}/{data.length} items
            </span>
            <span>
              Active: {actives.length}/{data.length} items
            </span>
          </li>
          <li>
            <i>
              <BiFilterAlt />
            </i>
            Short by
            <select onChange={handleFilter}>
              <option defaultValue="All">All</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
}
