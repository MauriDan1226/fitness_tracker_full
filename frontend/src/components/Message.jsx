function Message({ text, type = 'error' }) {
  if (!text) return null;

  return (
    <p className={`message message_${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <span aria-hidden="true">{type === 'error' ? '⚠️' : '✅'}</span>
      <span>{text}</span>
    </p>
  );
}

export default Message;
