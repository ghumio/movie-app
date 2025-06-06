function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">Oops! Something went wrong</h3>
        <p className="error-message">{message}</p>

        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            🔄 Try Again
          </button>
        )}

        <div className="error-suggestions">
          <h4>Possible solutions:</h4>
          <ul>
            <li>Check your internet connection</li>
            <li>Try searching for a different movie</li>
            <li>Refresh the page</li>
            <li>Wait a moment and try again</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
