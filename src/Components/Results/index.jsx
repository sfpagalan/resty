import React from 'react';
import ReactJson from 'react-json-view';
import './Results.scss';

function Results(props) {
  return (
    <section>
      {props.data ? (
        <ReactJson
          src={props.data}
          theme="monokai"
          name="response"
          collapsed={false}
          enableClipboard={false}
        />
      ) : (
        <p>No data available.</p>
      )}
    </section>
  );
}

export default Results;
