import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import DisplayPage from "./DisplayPage";

function App() {
  const [messageInput, setMessageInput] = useState("");
  const [result, setResult] = useState(null);
  const [chartType, setChartType] = useState("none");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* ログイン不具合後日修正
  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.access_token);
      navigate("/message");
    } else {
      alert("ログイン失敗");
    }
  };
  */

  const handleSend = async () => {
    const currentMessage = messageInput;
    setMessageInput("");
    try {
      const res = await fetch("http://localhost:5000/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage }),
      });
      if (!res.ok) throw new Error("analyze failed");

      const data = await res.json();
      console.log("flaskから帰ってきた：", data);
      setResult(data);

      const { summary, detail } = data;

      const saveRes = await fetch("http://localhost:5000/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: 1,
          message: currentMessage,
          label: summary,
          score: score,
        }),
      });
      if (!saveRes.ok) throw new Error("save failed");
    } catch (e) {
      console.error(e);
      setMessageInput(currentMessage);
    }
  };

  return (
    <Routes>
      {/*
      <Route
        path="/"
        element={
          <LoginForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            onSubmit={handleLogin}
          />
        }
      />*/}
      <Route
        path="/"
        element={
          <DisplayPage
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleSend={handleSend}
            result={result}
            chartType={chartType}
            setChartType={setChartType}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />{" "}
    </Routes>
  );
}
export default App;
