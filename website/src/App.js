import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import LoadingSpinner from "./LoadingSpinner";
import InlineSVG from "react-inlinesvg";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchCircle = async () => {
    const result = await axios(
      'http://127.0.0.1:5000/api/v1/gh_svg',
    );
    setLoading(false);
    setData(result.data);
    console.log(result.data)
  };
  useEffect(() => {
    fetchCircle();
  }, []);

  return (
    <div className="App">
      <div className="circle-container">
        {loading && <LoadingSpinner/>}
        {data && <InlineSVG src={data.svg}/>}
      </div>
      <br/>
      {data &&
      <React.Fragment>
        <p>File name: {data.file_name}</p>
        <p>File url: {data.file_url}</p>
        <p>Repo name: {data.repo_name}</p>
        <p>Repo url: {data.repo_url}</p>
      </React.Fragment>}

    </div>
  );
}

export default App;
