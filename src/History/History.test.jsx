import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import History from './History';


describe('History Component', () => {
  it('renders history items', () => {
    const historyList = [
      { method: 'GET', url: 'https://api.example.com/endpoint1' },
      { method: 'POST', url: 'https://api.example.com/endpoint2' },
    ];

    const mockHistoryClick = jest.fn();

    render(<History historyList={historyList} onHistoryClick={mockHistoryClick} />);

    const historyItems = screen.getAllByRole('listitem');
    expect(historyItems).toHaveLength(historyList.length);

    // Check if the buttons display the correct text
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveTextContent('GET - https://api.example.com/endpoint1');
    expect(buttons[1]).toHaveTextContent('POST - https://api.example.com/endpoint2');

    // Simulate a click on the first history item
    fireEvent.click(buttons[0]);

    // Check if the click handler was called with the correct history item
    expect(mockHistoryClick).toHaveBeenCalledWith(historyList[0]);
  });
});
