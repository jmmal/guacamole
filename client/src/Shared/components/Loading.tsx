import { createUseStyles } from "react-jss";

import { Spinner } from "@primer/react";

const useStyles = createUseStyles({
  container: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    margin: "2rem 0",
  },
});

export const Loading = () => {
  const css = useStyles();

  return (
    <div className={css.container}>
      <Spinner size="large" />
    </div>
  );
};
