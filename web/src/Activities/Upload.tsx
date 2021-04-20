import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Loading } from "../Shared";
import { Button, FileInput, Heading, Text } from "grommet";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  content: {
    width: "calc(100% - 2rem)",
    maxWidth: "30rem",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  fileInput: {
    marginTop: "1rem",
    marginBottom: "1rem",
  },
  actionBtn: {
    minWidth: "calc(50% - 0.5rem)",
    marginBottom: "1rem",
  },
});

export const Upload = () => {
  const history = useHistory();
  const classes = useStyles();

  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<File>();

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    const uploadedFile = event.target.files?.item(0);

    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }

  async function handleSubmit() {
    if (file) {
      setLoading(true);
      // await ActivityService.upload(file);
      setLoading(false);
      history.push("/activities");
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Heading id="inputGroupFileAddon01" level="2">
          Upload
        </Heading>

        <Text>Accepted file types: '.gpx'</Text>
        <div className={classes.fileInput}>
          <FileInput onChange={handleFileInput} />
        </div>
        <div className={classes.actions}>
          <Link to="/activities" className={classes.actionBtn}>
            <Button type="button" label="Go Back" fill="horizontal" />
          </Link>
          <Button
            label="Submit"
            type="submit"
            className={classes.actionBtn}
            onClick={handleSubmit}
            disabled={!file}
          />
        </div>
        {loading && <Loading />}
      </div>
    </div>
  );
};
