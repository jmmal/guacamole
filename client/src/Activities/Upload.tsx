import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Loading } from "../Shared/components";
import { Button, FileInput, Heading, Text } from "grommet";
import { createUseStyles } from "react-jss";

type SignedURL = {
  uploadURL: string;
};

const baseUrl = process.env.REACT_APP_BASE_API_URL;

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

const Upload = () => {
  const navigate = useNavigate();
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
      const params = new URLSearchParams();
      params.append("filename", file.name);

      const uploadResponse: Response = await fetch(
        baseUrl + "/upload?" + params.toString()
      );
      const response: SignedURL = await uploadResponse.json();

      await fetch(response.uploadURL, {
        method: "PUT",
        headers: {
          "Content-Type": "binary/octet-stream",
        },
        body: file,
      });

      setLoading(false);
      navigate("/activities");
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

export default Upload;
