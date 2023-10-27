import React from 'react';

function History({ historyList, onHistoryClick }) {
  return (
    <div className="history">
      <h2>History</h2>
      <ul>
        {historyList.map((historyItem, index) => (
          <li key={index}>
            <button onClick={() => onHistoryClick(historyItem)}>
              {historyItem.method} - {historyItem.url}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default History;
