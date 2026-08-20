function Loader({ text = 'Cargando...' }) {
  return (
    <div className="loader" role="status" aria-live="polite">
      <span className="loader__spinner" />
      <span>{text}</span>
    </div>
  );
}

export default Loader;
