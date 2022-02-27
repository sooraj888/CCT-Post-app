import {
  Button,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { Box, flexbox } from "@mui/system";
import React, { ChangeEvent, useEffect } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { postDtaType } from "../App";

type postListType = {
  postData: postDtaType;
  selectedPage: number;
  setSelectedPage: React.Dispatch<React.SetStateAction<number>>;
};

type datatype = {
  author: string;
  created_at: string;
  title: string;
  url: string;
  objectID: string;
};

const PostList = ({
  postData,
  selectedPage,
  setSelectedPage,
}: postListType): JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  const handleOnSelect = (jsonData: datatype): void => {
    navigate("rawdata", { state: jsonData });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {postData.length == 0 ? (
        <>
          <CircularProgress></CircularProgress>
          Loading
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader>
              <TableHead>
                <TableCell
                  sx={{
                    backgroundColor: "wheat",
                    border: "1px solid white",
                  }}
                  align="center"
                >
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "wheat",
                    border: "1px solid white",
                  }}
                  align="center"
                >
                  Author
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "wheat",
                    border: "1px solid white",
                  }}
                  align="center"
                >
                  Created-At
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "wheat",
                    border: "1px solid white",
                  }}
                  align="center"
                >
                  URL
                </TableCell>
                <TableCell
                  sx={{
                    backgroundColor: "wheat",
                    border: "1px solid white",
                  }}
                  align="center"
                >
                  Raw-Data
                </TableCell>
              </TableHead>
              <TableBody>
                {postData.length &&
                  postData[selectedPage - 1].map(
                    (item: datatype): JSX.Element => {
                      console.log(item);
                      const { author, created_at, title, url, objectID } = item;
                      return (
                        <TableRow key={objectID}>
                          <TableCell>{title}</TableCell>
                          <TableCell>{author}</TableCell>
                          <TableCell>{created_at}</TableCell>
                          <TableCell sx={{ maxWidth: 200, overflow: "hidden" }}>
                            {url}
                          </TableCell>
                          <TableCell>
                            <Button onClick={(): void => handleOnSelect(item)}>
                              select
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    }
                  )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ padding: "50px" }}>
            <Pagination
              count={postData.length}
              onChange={(e: ChangeEvent<any>, value: number): void =>
                setSelectedPage(value)
              }
              page={selectedPage}
            ></Pagination>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default PostList;
