import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [loading, setLoading] = useState(false);

  const callApi = async (requestParams) => {
    try {
      setLoading(true);

      const response = await axios({
        method: requestParams.method,
        url: requestParams.url,
        data: requestParams.body,
      });

      setData(response.data);
      setRequestParams(requestParams);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestParams.url) {
      callApi(requestParams);
    }
  }, [requestParams]);

  return (
    <>
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {loading ? <p>Loading...</p> : <Results data={data} />}
      <Footer />
    </>
  );
}

export default App;
