import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
};

export default ErrorMessage;