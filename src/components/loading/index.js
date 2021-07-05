import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./index.scss";

const Loading = () => {
  return (
    <Box className="loading-container">
      <Box className="svg">
        <CircularProgress color="secondary"></CircularProgress>
      </Box>
    </Box>
  );
};

export default Loading;
