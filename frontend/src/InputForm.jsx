const InputForm = ({ messageInput, setMessageInput, onSend, handleRead }) => {
  return (
    <div>
      <h1>ポジネガ判定日記</h1>
      <h2>React/Flaskでポジネガ判定</h2>
      <label>今日の出来事や今の気持ちは？</label>
      <br />
      <textarea
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        rows={5}
        cols={40}
      ></textarea>
      <button onClick={onSend}>送信</button><br /><br />
      <button onClick={handleRead}>日記を読み返す</button>
    </div>
  );
};

export default InputForm;
