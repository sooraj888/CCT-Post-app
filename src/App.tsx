import React, { useEffect, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import PostList from "./pages/PostList";
import RawJson from "./pages/RawJson";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import axios, { AxiosResponseHeaders } from "axios";

export type postDtaType = any[];

function App(): JSX.Element {
  const [postData, setPostData] = useState<postDtaType>([]);
  const [selectedPage, setSelectedPage] = useState<number>(1);
  let myInterval: NodeJS.Timer;
  let count: number = 0;

  const apiFetch = (): void => {
    // console.log(count);

    const apiCall = async (): Promise<void> => {
      const responce = await axios.get(
        ` http://hn.algolia.com/api/v1/search?query=bar&page=${count}`
      );
      // console.log(responce?.data);
      if (!responce?.data?.exhaustiveNbHits) {
        setPostData(
          (prev: postDtaType): postDtaType => [...prev, responce?.data?.hits]
        );
        count = count + 1;
      } else {
        clearInterval(myInterval);
      }
    };
    apiCall();
  };

  useEffect(() => {
    apiFetch();
    myInterval = setInterval(apiFetch, 10000);
  }, []);
  return (
    <div className="App">
      <Link className="appName" to="/">
        <h1>Post List App</h1>
      </Link>
      <Routes>
        <Route
          path="/"
          element={
            <PostList
              postData={postData}
              selectedPage={selectedPage}
              setSelectedPage={setSelectedPage}
            ></PostList>
          }
        ></Route>
        <Route path="rawdata" element={<RawJson></RawJson>}></Route>
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
