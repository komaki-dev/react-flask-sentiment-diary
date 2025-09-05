import "./App.css";

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => {
  return (
    <form onSubmit={handleLogin} method="POST">
      <h1>ログイン画面</h1>

      <label>ユーザー名：</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
        required
      />
      <br />

      <label>パスワード：</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
        required
      />
      <br />

      <button type="submit">ログイン</button>
    </form>
  );
};

export default LoginForm;
