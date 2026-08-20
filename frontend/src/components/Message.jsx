import Icon from './Icon';

function Message({ text, type = 'error' }) {
  if (!text) return null;

  return (
    <p className={`message message_${type}`} role={type === 'error' ? 'alert' : 'status'}>
      <Icon name={type === 'error' ? 'alert' : 'check'} size={16} />
      <span>{text}</span>
    </p>
  );
}

export default Message;
