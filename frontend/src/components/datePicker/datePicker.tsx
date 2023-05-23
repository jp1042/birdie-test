import { useContext } from "react";
import { CareDataContext } from "../../CareRecipientDataContextProvider";
import { queryDB } from "../../utils";

import "./date-picker.scss";

const DatePicker = () => {
  const { careData, setCareData } = useContext(CareDataContext);
  const eventDates = careData?.eventDates;

  if (!eventDates || eventDates.length === 0) return null;

  const handleDateSearch = async (event, date) => {
    const formattedDate = `${event.year}-${event.month}-${date}`;
    const id = careData?.careRecipeintData[0].id;
    const [data] = await queryDB("events", id, formattedDate);

    if (data) {
      setCareData((prev) => {
        prev.careRecipeintData = data;
        return { ...prev };
      });
    }
  };

  const DateList = ({ event }) => (
    <ol className="date-list">
      {event.dates.map((date: string) => (
        <li className="dates" onClick={() => handleDateSearch(event, date)}>
          {date}
        </li>
      ))}
    </ol>
  );

  return (
    <ol className="event-date-list">
      {eventDates.map((event) => (
        <li className="event-date-list-item">
          <div className="group-year-month">
            <div className="date-title">{`${event.year}/${event.month}`}</div>
            <DateList event={event} />
          </div>
        </li>
      ))}
    </ol>
  );
};

export { DatePicker };
