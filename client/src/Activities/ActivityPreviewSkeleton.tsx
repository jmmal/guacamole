import { createUseStyles } from "react-jss";

const shimmer = {
  borderRadius: 3,
  background: "rgb(216,225,255)",
  backgroundImage:
    "linear-gradient(90deg, rgba(242,242,242,1) 0%, rgba(255,255,255,1) 26%, rgba(242,242,242,1) 50%)",
  backgroundSize: "800px 400px",
  animationName: "$slideRight",
  animationDuration: "2s",
  animationIterationCount: "infinite",
  animationTimingFunction: "linear",
  animationFillMode: "forwards",
};

const useStyles = createUseStyles({
  skeleton: {
    minHeight: "10rem",
    borderRadius: 3,
    border: "1px solid #e2e2e2",
    boxShadow: "0px 8px 24px rgba(13,13,18,0.04)",
    padding: "1rem 1rem 1rem 1rem",
    marginBottom: "1rem",
  },
  text: {
    ...shimmer,
    height: "24px",
    width: "50%",
    marginBottom: "1rem",
  },
  img: {
    ...shimmer,
    height: "350px",
    marginBottom: "1rem",
  },
  statsTitle: {
    ...shimmer,
    height: "15px",
    width: "100px",
    marginBottom: "8px",
  },
  statsValue: {
    ...shimmer,
    height: "30px",
    width: "200px",
  },
  statRow: {
    display: "flex",
  },
  "@keyframes slideRight": {
    from: {
      backgroundPosition: "-800px 0px",
    },
    to: {
      backgroundPosition: "800px 0px",
    },
  },
});

export function ActivityPreviewSkeleton() {
  const css = useStyles();

  return (
    <article className={css.skeleton}>
      <div className={css.text}></div>
      <div className={css.img}></div>
      <div className={css.statsTitle}></div>
      <div className={css.statsValue}></div>
    </article>
  );
}
