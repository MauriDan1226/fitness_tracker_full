function ProgressBar({ percent }) {
  const value = Math.max(0, Math.min(100, percent));

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`progress-bar__fill ${value >= 100 ? 'progress-bar__fill_complete' : ''}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

export default ProgressBar;
