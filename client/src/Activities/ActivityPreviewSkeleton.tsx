import { createUseStyles } from "react-jss";

import { Box } from "@primer/react";

const useStyles = createUseStyles({
  text: {
    height: "24px",
    width: "50%",
    marginBottom: "1rem",
  },
  img: {
    height: "350px",
    marginBottom: "1rem",
  },
  statsTitle: {
    height: "15px",
    width: "100px",
    marginBottom: "8px",
  },
  statsValue: {
    height: "30px",
    width: "200px",
  },
  statRow: {
    display: "flex",
  },
});

export function ActivityPreviewSkeleton() {
  const css = useStyles();

  return (
    <Box
      as="article"
      borderColor="border.default"
      borderRadius={1}
      borderWidth={1}
      marginBottom={16}
      borderStyle="solid"
      padding={16}
    >
      <Box bg="neutral.muted"></Box>
      <Box bg="neutral.muted" className={css.img}></Box>
      <Box bg="neutral.muted" className={css.statsTitle}></Box>
      <Box bg="neutral.muted" className={css.statsValue}></Box>
    </Box>
  );
}
