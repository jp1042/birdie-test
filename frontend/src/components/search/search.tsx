import { useRef, useState } from "react";
import { useContext } from "react";
import { groupDates, queryDB } from "../../utils";
import { CareDataContext } from "../../CareRecipientDataContextProvider";
import { SearchInput } from "../SearchInput/SearchInput";
import { BarLoader } from "react-spinners";
import dayjs from "dayjs";

import "./search.scss";

const dataLoadedStyle = {
  width: "94%",
  height: "92vh",
  boxShadow: "none",
  top: "0rem",
};

const Search = () => {
  const { careData, setCareData } = useContext(CareDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dataLoaded = !!careData?.careRecipeintData?.length;
  const careRecipientName = careData.careRecipeintData[0]?.careRecipientName;
  const selectedDay = dataLoaded
    ? dayjs(careData.careRecipeintData[0].timestamp).format("ddd D MMM YYYY")
    : "";

  const handleSearch = async () => {
    setLoading(true);
    const id = inputRef.current?.value;
    const [data, error] = await queryDB("care-recipient", id);
    if (error) setError(error);
    if (data) {
      setCareData((prev) => {
        prev.careRecipeintData = data;
        return { ...prev };
      });
      setError(error);
    }
    await getEventDates(id);
    setLoading(false);
  };

  const getEventDates = async (id) => {
    const [dates, error] = await queryDB("event-times", id);
    if (error) setError(error);
    if (dates) {
      const mappedDates = dates.map((d) => d.date_only);
      const groupedDates = groupDates(mappedDates);
      setCareData((prev) => {
        prev.eventDates = groupedDates;
        return { ...prev };
      });
    }
  };

  return (
    <div className="search" style={dataLoaded ? dataLoadedStyle : undefined}>
      <h2
        className="search-text"
        style={{ fontSize: dataLoaded ? "3rem" : "1.5rem" }}
      >
        {dataLoaded ? careRecipientName : "Find a Care Recipient"}
      </h2>
      <h3 className="selected-day">{selectedDay}</h3>
      <BarLoader
        color={"#00264D"}
        className="loader"
        loading={loading}
        width={"25rem"}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <SearchInput
        inputRef={inputRef}
        handleSearch={handleSearch}
        dataLoaded={dataLoaded}
      />
      <div className="error">{error}</div>
    </div>
  );
};

export { Search };
