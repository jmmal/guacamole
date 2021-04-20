import React, { useState } from "react";

import { Link } from "react-router-dom";

import { Filters } from "./Filters";
import { ActivityList } from "./ActivityList";

import { Box, Button } from "grommet";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
  mainContent: {
    maxWidth: "100%",
    width: "min(50rem, 100%)",
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
