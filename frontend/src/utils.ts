import dayjs from "dayjs";
import { validateSearch } from "./validation";
import { EventType } from "./types";

export function formatDate(timestamp: string) {
  const dayjsTimestamp = dayjs(timestamp);
  const date = {
    year: dayjsTimestamp.year(),
    month: dayjsTimestamp.month() + 1,
    day: dayjsTimestamp.date(),
  };
  return date;
}

export function groupDates(dates: string[]) {
  const group = Object.values(
    dates!.reduce((r: any, date: any) => {
      const [year, month, day] = date.substr(0, 10).split("-");
      const key = `${year}_${month}`;
      r[key] = r[key] || { month, year, dates: [] };
      r[key].dates.push(day);
      return r;
    }, [])
  ) as {
    year: string;
    month: string;
    dates: string[];
  }[];
  return group;
}

export async function queryDB(endpoint, id, timestamp = "") {
  let error = validateSearch(id);
  if (error) return [undefined, error];

  const recipientRes = await fetch(
    `/${endpoint}/${id}${timestamp ? "/" + timestamp : ""}`
  );
  let data = await recipientRes.json();

  if (!data || data.length === 0) {
    data = undefined;
    error = "Not found";
  }

  return [data, error];
}

export const eventColorCode = (eventType) => {
  switch (eventType) {
    case EventType.CheckIn:
      return "#ffeaa8";
    case EventType.FluidIntakeObservation:
      return "#b0ed99";
    case EventType.GeneralObservation:
      return "#e3beef";
    case EventType.CheckOut:
      return "#eb8989";
    case EventType.FoodIntakeObservation:
      return "#e49333";
    case EventType.MentalHealthObservation:
      return "#7e54eb";
    case EventType.IncontinencePadObservation:
      return "#829df1";
    case EventType.MoodObservation:
      return "#06d6b4";
    case EventType.TaskCompletionReverted:
      return "#8cff6d";
    case EventType.RegularMedicationTaken:
      return "#c3ff82";
    case EventType.TaskCompleted:
      return "#86e8ff";
    case EventType.VisitCompleted:
      return "#a5aba5";
  }
};
