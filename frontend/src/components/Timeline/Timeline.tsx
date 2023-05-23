import { Chrono } from "react-chrono";
import { CareDataContext } from "../../CareRecipientDataContextProvider";
import { Card } from "../Card/Card";
import { useContext } from "react";

import "./care-recipient.scss";

const Timeline = () => {
  const { careData } = useContext(CareDataContext);
  const loadedData = !!careData?.careRecipeintData.length;
  const content = careData?.careRecipeintData?.map((entry) => (
    <Card entry={entry} />
  ));
  const TimelineContent = () => (
    <Chrono
      theme={{ primary: "#00264d", secondary: "white" }}
      mode="VERTICAL_ALTERNATING"
      cardHeight={30}
      allowDynamicUpdate
    >
      {content}
    </Chrono>
  );

  return (
    <section className="care-recipient">
      {loadedData && (
        <div className="timeline-wrapper">
          <TimelineContent />
        </div>
      )}
    </section>
  );
};

export { Timeline };
