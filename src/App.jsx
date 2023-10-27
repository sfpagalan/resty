import React, { useEffect, useReducer, useState } from 'react'; 
import axios from 'axios';
import './App.scss';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Form from './Components/Form';
import Results from './Components/Results';
import History from './Components/History';

function App() {
  const initialState = {
    data: null,
    requestParams: {},
    loading: false,
    history: [],
    displayHistory: false
  };

  const [selectedHistoryData, setSelectedHistoryData] = useState(null); 

  const handleHistoryClick = (entry) => {
    if (selectedHistoryData && JSON.stringify(selectedHistoryData) === JSON.stringify(entry.results)) {
        setSelectedHistoryData(null); 
    } else {
        setSelectedHistoryData(entry.results); 
    }
};

  const toggleHistoryDisplay = () => {
    dispatch({ type: 'TOGGLE_HISTORY_DISPLAY' });
  };

  function appReducer(state, action) {
    switch (action.type) {
      case 'SET_DATA':
        return { ...state, data: action.payload };
      case 'SET_REQUEST_PARAMS':
        return { ...state, requestParams: action.payload };
      case 'SET_LOADING':
        return { ...state, loading: action.payload };
      case 'ADD_TO_HISTORY':
        return { ...state, history: [...state.history, action.payload] };
      case 'TOGGLE_HISTORY_DISPLAY':
        return { ...state, displayHistory: !state.displayHistory };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(appReducer, initialState);

  const callApi = async (requestParams) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      let config = {
        url: requestParams.url,
        method: requestParams.method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (['POST', 'PUT'].includes(requestParams.method)) {
        config.data = JSON.parse(requestParams.data || '{}');
      }

      const response = await axios(config);

      dispatch({ type: 'SET_DATA', payload: response.data });
      dispatch({
        type: 'ADD_TO_HISTORY',
        payload: {
          method: requestParams.method,
          url: requestParams.url,
          results: response.data,
        },
      });
    } catch (error) {
      console.error('There was a problem with the Axios request:', error);
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  useEffect(() => {
    if (state.requestParams.url && state.requestParams.method) {
      callApi(state.requestParams);
    }
  }, [state.requestParams]);

  useEffect(() => {
    console.log("Current History:", state.history);
  }, [state.history]);
  
  return (
    <>
      <Header />
      <div data-testid="request-method">Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={(params) => dispatch({ type: 'SET_REQUEST_PARAMS', payload: params })} />
      <div>
        <button id="history" onClick={toggleHistoryDisplay}>History</button>
      </div>
      {state.displayHistory ? (
      <History history={state.history} onClick={handleHistoryClick} displayedData={selectedHistoryData} />) 
      : (<Results data={state.data} loading={state.loading} />)}
      <Footer data-testid="footer" />
    </>
  );
}

export default App;