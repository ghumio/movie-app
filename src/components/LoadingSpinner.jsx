function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <div className="loading-text">
          <h3>Loading Movies...</h3>
          <p>Please wait while we fetch the latest movies for you</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingSpinner;
