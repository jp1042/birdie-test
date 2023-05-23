import dayjs from "dayjs";
import { eventColorCode } from "../../utils";

import "./card.scss";

function transformString(input: string) {
  return input.charAt(0).toUpperCase() + input.replace(/_/g, " ").slice(1);
}

const Card = ({ entry }: any) => {
  const payload = JSON.parse(entry.payload);
  const {
    id,
    timestamp,
    fluid,
    consumed_volume,
    mood,
    note,
    task_completed,
    pad_condition,
    event_type,
  } = payload;

  return (
    <div className="card" key={id}>
      <div className="timestamp">{dayjs(timestamp).format("H:mm")}</div>
      <div className="event">{transformString(event_type)}</div>
      <div
        className="color-code"
        style={{ background: eventColorCode(event_type) }}
      ></div>
      <div>{fluid}</div>
      {consumed_volume && <div>{consumed_volume}ml</div>}
      <div className="mood">{mood}</div>
      {note && (
        <div className="note">
          <strong>Note</strong> {note}
        </div>
      )}
      {pad_condition && <div>Condition: {pad_condition}</div>}
      <div>{task_completed}</div>
      <div>
        <span>Care giver: </span>
        <span>{entry.caregiverFirstName + " "}</span>
        <span>{entry.caregiverLastName}</span>
      </div>
    </div>
  );
};

export { Card };
