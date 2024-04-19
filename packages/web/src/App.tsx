import { useState, useEffect } from "react";
import "./App.css";

type Question = {
  id: number;
  title: string;
  body: string;
};

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    async function getQuestions() {
      const res = await fetch(import.meta.env.VITE_APP_API_URL + "/questions");
      const data = await res.json();
      console.log(data);
      setQuestions(data.questions);
    }
    getQuestions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(import.meta.env.VITE_APP_API_URL + "/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question: { title, body } }),
    });
    const data = await res.json();
    setQuestions(data.questions);
    setTitle("");
    setBody("");
  };

  return (
    <div className="App">
      <div className="card">
        <h1>Questions</h1>
        {questions.map((question) => (
          <div>
            <h2>{question.title}</h2>
            <p>{question.body}</p>
          </div>
        ))}
      </div>
      <div className="card">
        <h1>Ask a Question</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default App;
