import React from 'react';

function Results(props) {
  return (
    <section>
      {props.data ? (
        <pre>{JSON.stringify(props.data, undefined, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </section>
  );
}

export default Results;
