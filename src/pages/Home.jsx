// src/pages/Home.jsx
import React from "react";

function Home() {
  return (
    <div className="page">
      {/* Hero section */}
      <section className="section-card hero">
        <div className="hero-main">
          <div className="badge">Academic tool · AI-assisted debating</div>
          <h2>Welcome to DebAIt</h2>

          <p className="hero-text">
            DebAIt helps students practice argumentation by debating real topics
            with an AI. Ask a question, see a structured response, and then
            build your own counterarguments.
          </p>

          <div className="hero-actions">
            <a href="/start" className="primary-link">Start a debate</a>
            <a href="/explore" className="secondary-link">Browse example topics</a>
          </div>

          <p className="small-text">
            Designed for classrooms, study groups, and anyone who wants to
            sharpen critical thinking skills.
          </p>
        </div>

        <div className="hero-side">
          <h3>What can I do here?</h3>
          <ul>
            <li>Practice clear arguments & rebuttals</li>
            <li>Explore debate topics with pros/cons</li>
            <li>Draft responses for assignments</li>
            <li>Compare your thinking to AI</li>
          </ul>
        </div>
      </section>

      {/* Steps section */}
      <section className="section-card">
        <h2>Get started in three steps</h2>

        <div className="home-grid">
          <div className="home-card">
            <h3>1. Pick a question</h3>
            <p>Choose a topic from class or the Explore page.</p>
          </div>

          <div className="home-card">
            <h3>2. Read the AI’s stance</h3>
            <p>The AI outlines an argument. Treat it as a starting point.</p>
          </div>

          <div className="home-card">
            <h3>3. Build your argument</h3>
            <p>Add your own reasoning, evidence, and counterpoints.</p>
          </div>
        </div>

        <p className="small-text">
          Tip: Use rubric words like <em>claim</em>, <em>evidence</em>, and
          <em>counterargument</em> to get structured responses.
        </p>
      </section>
    </div>
  );
}

export default Home;
