import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './App.css';
import LoadingSpinner from "./LoadingSpinner";
import InlineSVG from "react-inlinesvg";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState("");

  const fetchCircle = async () => {
    setError("");
    const result = await axios(
      'http://127.0.0.1:5000/api/v1/gh_svg',
    );
    if (result.status !== 200) {
      setError(result.data.error);
      return;
    }
    setLoading(false);
    setData(result.data);
  };
  useEffect(() => {
    fetchCircle();
  }, []);

  return (
    <div className="App">
      <p>Load a circle by scraping SVGs from github!</p>
      <p>Sometimes the circles are really small so you might not be able to spot them.</p>
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
        <br/>
      </React.Fragment>}

      {error &&
      <React.Fragment>
        <p>{error}</p>
        <span>Try again in a minute.</span>
      </React.Fragment>

      }
    </div>
  );
}

export default App;
