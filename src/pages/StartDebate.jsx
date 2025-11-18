// src/pages/StartDebate.jsx
import React, { useState } from "react";

function StartDebate() {
  const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

  const [question, setQuestion] = useState("");
  const [hasStarted, setHasStarted] = useState(false);
  const [roundNumber, setRoundNumber] = useState(0);
  const [thread, setThread] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [debateEnded, setDebateEnded] = useState(false);
  const [feedback, setFeedback] = useState("");

  // ------------ GROQ REQUEST ------------
  async function askGroq(prompt) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "user", content: prompt }
          ]
        })
      });

      const data = await res.json();

      console.log("Groq raw response:", data); // DEBUG

      return data.choices?.[0]?.message?.content || "";
    } catch (err) {
      console.error("Groq error:", err);
      return "Error: Could not get response from AI.";
    }
  }

  // ------------ START DEBATE ------------
  async function startDebate() {
    if (!question.trim()) return alert("Enter a debate question first.");

    setHasStarted(true);
    setDebateEnded(false);
    setThread([]);
    setRoundNumber(1);
    setFeedback("");

    const prompt = `
You are an aggressive debate opponent.
ALWAYS argue against the user's position.
Keep responses under 200 words.

The user says: "${question}"
Respond as Round 1 – AI, arguing AGAINST the user's stance.
`;

    setAiTyping(true);
    const aiReply = await askGroq(prompt);
    setAiTyping(false);

    setThread([
      {
        id: Date.now(),
        round: 1,
        author: "AI",
        text: aiReply
      }
    ]);
  }

  // ------------ USER MOVE ------------
  async function submitUserArgument() {
    if (!userInput.trim()) return;

    const userText = userInput.trim();
    setUserInput("");

    // Add user entry
    const newUserEntry = {
      id: Date.now(),
      round: roundNumber,
      author: "You",
      text: userText
    };

    setThread((prev) => [...prev, newUserEntry]);

    const nextRound = roundNumber + 1;
    setRoundNumber(nextRound);

    const aiPrompt = `
Continue this debate.
Always argue directly AGAINST the user's argument.

User argument: "${userText}"

Respond as "Round ${nextRound} – AI".
Keep it under 150 words.
`;

    setAiTyping(true);
    const aiReply = await askGroq(aiPrompt);
    setAiTyping(false);

    const newAiEntry = {
      id: Date.now() + 1,
      round: nextRound,
      author: "AI",
      text: aiReply
    };

    setThread((prev) => [...prev, newAiEntry]);
  }

  // ------------ END DEBATE ------------
  async function endDebateNow() {
    setDebateEnded(true);

    const allText = thread.map((t) => `${t.author}: ${t.text}`).join("\n");

    const feedbackPrompt = `
You are a debate judge.
Give feedback on strengths, weaknesses, and how the user can improve.
Keep it under 200 words.

Debate transcript:
${allText}
`;

    setAiTyping(true);
    const judgeReply = await askGroq(feedbackPrompt);
    setAiTyping(false);

    setFeedback(judgeReply);
  }

  // ------------ RESET ------------
  function resetDebate() {
    setHasStarted(false);
    setQuestion("");
    setThread([]);
    setRoundNumber(0);
    setUserInput("");
    setFeedback("");
    setDebateEnded(false);
  }

  return (
    <section className="section-card">
      <h2>Start a Debate</h2>

      {!hasStarted && (
        <>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Example: Should college be free?"
          />
          <button onClick={startDebate}>Start Debate</button>
        </>
      )}

      {hasStarted && !debateEnded && (
        <button onClick={endDebateNow} style={{ background: "#ef4444", color: "white" }}>
          End Debate
        </button>
      )}

      {thread.length > 0 && (
        <div className="ai-box">
          {thread.map((entry) => (
            <div key={entry.id}>
              <strong>Round {entry.round} – {entry.author}</strong>
              <p>{entry.text}</p>
            </div>
          ))}
        </div>
      )}

      {!debateEnded && hasStarted && (
        <div>
          <textarea
            placeholder="Write your argument..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button onClick={submitUserArgument}>
            {aiTyping ? "AI thinking..." : "Submit"}
          </button>
        </div>
      )}

      {debateEnded && (
        <div>
          <h3>Debate Finished</h3>
          <p>{feedback}</p>
          <button onClick={resetDebate}>Start New Debate</button>
        </div>
      )}
    </section>
  );
}

export default StartDebate;
