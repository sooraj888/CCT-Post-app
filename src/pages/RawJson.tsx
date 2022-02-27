import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavigateFunction, useLocation, useNavigate } from "react-router-dom";

const RawJson = () => {
  const loaclState: unknown = useLocation().state;
  const navigate: NavigateFunction = useNavigate();
  const handleOnBackButton = (): void => {
    navigate(-1);
  };

  if (!loaclState) {
    return (
      <>
        <Box component={"h1"}>No Data Found</Box>
        <Button onClick={handleOnBackButton} variant="contained">
          Go Back
        </Button>
      </>
    );
  }

  return (
    <Box>
      <Box component={"h1"}>Selected Raw Json</Box>
      <Box component={"p"}>{JSON.stringify(loaclState)}</Box>
      <Button variant="contained" onClick={handleOnBackButton}>
        Back
      </Button>
    </Box>
  );
};

export default RawJson;
