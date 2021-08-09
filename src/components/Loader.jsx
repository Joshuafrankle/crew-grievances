import { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";

const BorderLinearProgress = withStyles(() => ({
  root: {
    width: "100%",
    height: 5,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: "#2e2e2e",
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#15e6ca",
  },
}))(LinearProgress);

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div
        className="d-flex align-items-center justify-content-center px-5"
        style={{ height: "100vh" }}
      >
        <BorderLinearProgress variant="determinate" value={progress} />
      </div>
    </>
  );
}
