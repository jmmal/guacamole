import { Previous } from "grommet-icons";
import { format } from "date-fns";

import { Mapbox, Loading } from "../Shared/components";
import { Activity } from "../Shared/types";
import {
  ElevationChart,
  PaceChart,
  SplitsChart,
  HeartRateChart,
} from "../Charts";
import { createUseStyles } from "react-jss";
import { Button, Heading } from "grommet";

type DetailedActivityProps = {
  activity?: Activity;
  handleGoBack(): void;
};

const useStyles = createUseStyles({
  header: {
    position: "sticky",
    top: 0,
    borderBottom: "1px solid #e0e0e0",
    zIndex: 1000,
    backgroundColor: "white",
    padding: "1rem",
    display: "flex",
    justifyContent: "center",
  },
  headerLayout: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    justifyContent: "center",
    maxWidth: "55rem",
    width: "100%",
  },
  marginAuto: {
    margin: "auto",
    marginRight: 0,
  },
  statsHeader: {
    padding: "0rem 1rem",
  },
});

const DetailedActivity = ({
  activity,
  handleGoBack,
}: DetailedActivityProps) => {
  const css = useStyles();

  return (
    <div className="activity-component">
      <div className={css.header}>
        <div className={css.headerLayout}>
          <div>
            <Button
              onClick={handleGoBack}
              icon={<Previous />}
              label="Activities"
              size="small"
            />
          </div>
          <Heading level="3" className={css.marginAuto}>
            {activity?.type ? activity.type : "Loading"}
          </Heading>
        </div>
      </div>

      {activity?.polyline && <Mapbox polyline={activity.polyline} />}
      {activity && activity.streamData ? (
        <>
          <Heading level="2" className={css.statsHeader}>{`${format(
            new Date(activity.startTime),
            "EEEE, LLLL d, yyyy"
          )} at ${format(new Date(activity.startTime), "HH:mm aaa")}`}</Heading>

          <Heading level="3" className={css.statsHeader}>
            Heart Rate
          </Heading>
          <HeartRateChart
            streamData={activity.streamData}
            distance={activity.distance}
          />

          <Heading level="3" className={css.statsHeader}>
            Elevation
          </Heading>
          <ElevationChart
            points={activity.streamData}
            distance={activity.distance}
          />

          <Heading level="3" className={css.statsHeader}>
            Pace
          </Heading>
          <PaceChart points={activity.streamData} />

          <Heading level="3" className={css.statsHeader}>
            Splits
          </Heading>
          <SplitsChart points={activity.streamData} />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default DetailedActivity;
