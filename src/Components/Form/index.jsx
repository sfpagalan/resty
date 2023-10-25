import React, { useState } from 'react';
import './Form.scss';

function Form(props) {
  const [url, setUrl] = useState('');
  const [method, setMethod] = useState('GET');
  const [requestBody, setRequestBody] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      ...(requestBody && { body: JSON.parse(requestBody) }),
    };
    props.handleApiCall(formData);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            name='url'
            type='text'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        <label>
          <span>Request Body (JSON): </span>
          <textarea
            name='requestBody'
            value={requestBody}
            onChange={(e) => setRequestBody(e.target.value)}
          />
        </label>
      </form>
    </>
  );
}

export default Form;
