const MessageLog = ({ log }) => {
  return (
    <div>
      <h1>日記を読み返す</h1>
      <ul>
        {log.map(m => (
          <li key={m.id}>{m.created_at} | {m.message} ({m.label})</li>
        ))}
      </ul>
    </div>
    
  );
};

export default MessageLog;
