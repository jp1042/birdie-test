import { Chrono } from "react-chrono";
import { Card } from "../card/card";

import "./care-recipient.scss";
import { CareDataContext } from "../../CareRecipientDataContextProvider";
import { useContext } from "react";

const CareRecipient = () => {
  const { careData } = useContext(CareDataContext);
  const loadedData = !!careData?.careRecipeintData.length;
  const content = careData?.careRecipeintData?.map((entry) => (
    <Card entry={entry} />
  ));
  const Timeline = () => (
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
          <Timeline />
        </div>
      )}
      {!content && <div className="no-records">No record available</div>}
    </section>
  );
};

export { CareRecipient };
