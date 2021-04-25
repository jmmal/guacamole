import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Filters } from "./Filters";
import { ActivityList } from "./ActivityList";

import { Box, Button } from "grommet";
import { createUseStyles } from "react-jss";
import { Stats } from "../Stats/Stats";

const useStyles = createUseStyles({
  main: {
    display: "grid",
    gridTemplateColumns:
      "[leftSide] calc((100% - 50rem) * 0.5) [main] auto [rightSide] calc((100% - 50rem) * 0.5)",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  "@media (max-width: 1400px)": {
    main: {
      display: "grid",
      gridTemplateColumns: "[main] auto",
      justifyItems: "center",
    },
    rightSidebar: {
      display: "none !important",
    },
  },
  mainContent: {
    gridArea: "main",
    maxWidth: "100%",
    width: "min(50rem, 100%)",
  },
  rightSidebar: {
    gridArea: "rightSide",
    marginTop: "68px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    marginBottom: "1.5rem",
  },
});

export const Activities = () => {
  const [filter, setFilter] = useState("");
  const classes = useStyles();
  return (
    <main className={classes.main}>
      <div className={classes.mainContent}>
        <header className={classes.header}>
          <Box direction="row" justify="between">
            <UploadButton />
            <Filters onFilterChange={setFilter} />
          </Box>
        </header>
        <ActivityList filter={filter} />
      </div>
      <div className={classes.rightSidebar}>
        <Stats />
      </div>
    </main>
  );
};

const UploadButton = () => {
  return (
    <Link to="/activities/upload">
      <Button primary label="Upload" fill="vertical"></Button>
    </Link>
  );
};
