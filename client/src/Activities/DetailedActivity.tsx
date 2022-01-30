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
import { Box, Button, Heading } from "@primer/react";

import { ArrowLeftIcon } from "@primer/octicons-react";

type DetailedActivityProps = {
  activity?: Activity;
  handleGoBack(): void;
};

const useStyles = createUseStyles({
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
    <Box maxWidth="60rem" margin="auto" height="100%">
      <Box
        bg="canvas.default"
        borderBottomColor="border.default"
        borderBottomWidth={1}
        borderBottomStyle="solid"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          padding: "1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            justifyContent: "center",
            maxWidth: "55rem",
            width: "100%",
          }}
        >
          <div>
            <Button onClick={handleGoBack}>
              <ArrowLeftIcon />
              Activities
            </Button>
          </div>
          <Heading
            as="h3"
            sx={{
              margin: "auto",
              marginRight: 0,
              fontSize: 2,
            }}
          >
            {activity?.type ? activity.type : "Loading"}
          </Heading>
        </Box>
      </Box>

      {activity?.polyline && <Mapbox polyline={activity.polyline} />}
      {activity && activity.streamData ? (
        <>
          <Heading
            sx={{
              fontSize: 3,
              marginTop: 4,
              marginBottom: 1,
            }}
          >{`${format(
            new Date(activity.startTime),
            "EEEE, LLLL d, yyyy"
          )} at ${format(new Date(activity.startTime), "HH:mm aaa")}`}</Heading>

          <Heading
            sx={{
              fontSize: 3,
              marginTop: 4,
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            Heart Rate
          </Heading>
          <HeartRateChart
            streamData={activity.streamData}
            distance={activity.distance}
          />

          <Heading
            sx={{
              fontSize: 3,
              marginTop: 4,
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            Elevation
          </Heading>
          <ElevationChart
            points={activity.streamData}
            distance={activity.distance}
          />

          <Heading
            sx={{
              fontSize: 3,
              marginTop: 4,
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            Pace
          </Heading>
          <PaceChart points={activity.streamData} />

          <Heading
            sx={{
              fontSize: 3,
              marginTop: 4,
              marginBottom: 2,
              textAlign: "center",
            }}
            className={css.statsHeader}
          >
            Splits
          </Heading>
          <SplitsChart points={activity.streamData} />
        </>
      ) : (
        <Loading />
      )}
    </Box>
  );
};

export default DetailedActivity;
