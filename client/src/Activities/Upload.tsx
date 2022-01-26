import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Loading } from "../Shared/components";
import { Box, Button, ButtonPrimary, Heading, Text } from "@primer/react";
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
    <form className={classes.container}>
      <div className={classes.content}>
        <Heading
          id="inputGroupFileAddon01"
          sx={{
            marginTop: 16,
          }}
        >
          Upload
        </Heading>

        <Text>Accepted file types: '.gpx'</Text>
        <div className={classes.fileInput}>
          <input
            type="file"
            id="myFile"
            name="filename"
            onChange={handleFileInput}
          />
        </div>

        <Box display="flex">
          <Link to="/activities">
            <Button type="button">Go Back</Button>
          </Link>
          <ButtonPrimary type="submit" onClick={handleSubmit} disabled={!file}>
            Submit
          </ButtonPrimary>
        </Box>
        {loading && <Loading />}
      </div>
    </form>
  );
};

export default Upload;
