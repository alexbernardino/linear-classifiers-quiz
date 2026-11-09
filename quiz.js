import { questions } from "./questions.js";
import { escapeHtml, formatMathText } from "./math-text.js";

const root = document.querySelector("#quiz-root");
const sections = [...new Set(questions.map(question => question.section))];
let answers = Array(questions.length).fill(null);
let current = 0;
let finished = false;

function score() {
  return answers.reduce((total, choice, index) => total + Number(choice === questions[index].answer), 0);
}

function visual(question) {
  const section = question.section;
  const shell = (label, content) => `<svg class="mini-visual" viewBox="0 0 240 170" role="img" aria-label="${label}"><rect width="240" height="170" fill="#f4f1e8"/>${content}</svg>`;
  if (section === "Linear boundaries & LDA") {
    return shell("Illustrative observations from two classes in a two-dimensional feature space", `
      <text x="120" y="20" text-anchor="middle">Observations in feature space</text>
      <path d="M32 32V137H218" fill="none" stroke="#697183"/>
      <circle cx="60" cy="61" r="5" fill="#315fc7"/><circle cx="78" cy="90" r="5" fill="#315fc7"/>
      <circle cx="98" cy="57" r="5" fill="#315fc7"/><circle cx="114" cy="83" r="5" fill="#315fc7"/>
      <circle cx="71" cy="114" r="5" fill="#315fc7"/><circle cx="136" cy="67" r="5" fill="#315fc7"/>
      <path d="M142 110l6-10 6 10zM170 74l6-10 6 10zM191 117l6-10 6 10zM157 92l6-10 6 10zM121 125l6-10 6 10z" fill="#bc7639"/>
      <text x="199" y="153">x₁</text><text x="16" y="43">x₂</text>
      <text x="120" y="164" text-anchor="middle" class="visual-caption">Features and class labels</text>`);
  }
  if (section === "Indicators & logistic regression") {
    return shell("Illustrative training table with two features and a class label for each observation", `
      <text x="120" y="20" text-anchor="middle">A labelled training set</text>
      <rect x="30" y="34" width="180" height="112" rx="6" fill="#fffdf8" stroke="#c5bdad"/>
      <path d="M30 61H210M30 89H210M30 117H210M90 34V146M150 34V146" fill="none" stroke="#d7d0c2"/>
      <text x="60" y="52" text-anchor="middle">x₁</text><text x="120" y="52" text-anchor="middle">x₂</text><text x="180" y="52" text-anchor="middle">class</text>
      <path d="M48 76H72M108 76H132M48 104H72M108 104H132M48 132H72M108 132H132" stroke="#a6adbc" stroke-width="3" stroke-linecap="round"/>
      <circle cx="180" cy="76" r="5" fill="#315fc7"/><path d="M174 109l6-10 6 10z" fill="#bc7639"/><circle cx="180" cy="132" r="5" fill="#315fc7"/>
      <text x="120" y="164" text-anchor="middle" class="visual-caption">Each row is one observation</text>`);
  }
  return shell("General machine learning workflow from training data through a model to predictions", `
    <text x="120" y="21" text-anchor="middle">Learning and prediction</text>
    <rect x="55" y="34" width="130" height="28" rx="5" fill="#dce5f8" stroke="#8ca6df"/><text x="120" y="52" text-anchor="middle">Training data</text>
    <path d="M120 62V78M116 73L120 79L124 73" fill="none" stroke="#697183"/>
    <rect x="55" y="81" width="130" height="28" rx="5" fill="#e9def6" stroke="#b8a0d0"/><text x="120" y="99" text-anchor="middle">Fitted model</text>
    <path d="M120 109V125M116 120L120 126L124 120" fill="none" stroke="#697183"/>
    <rect x="55" y="128" width="130" height="28" rx="5" fill="#e5f3ed" stroke="#61aa92"/><text x="120" y="146" text-anchor="middle">Predictions</text>`);
}

function renderQuestion() {
  const q = questions[current];
  const choice = answers[current];
  const answered = choice !== null;
  root.innerHTML = `<div class="quiz-layout">
    <aside class="lesson-rail" aria-label="Learning path">
      <p class="eyebrow">Learning path</p>
      <h2>From linear scores to class predictions</h2>
      <ol>${sections.map((section, index) => `<li class="${q.section === section ? "active" : ""}" ${q.section === section ? 'aria-current="step"' : ""}><span>0${index + 1}</span>${escapeHtml(section)}</li>`).join("")}</ol>
      <div class="rail-note"><p>Answer first, then read the explanation. Your responses stay in this browser tab; nothing is submitted.</p></div>
    </aside>
    <section class="question-stage" aria-label="Quiz question">
      <p class="setup-note"><strong>Chapter scope:</strong> Linear boundaries, LDA, indicator regression, logistic regression, learning and softmax. Use the assumptions stated in each question. Choose one best answer, then check the explanation.</p>
      <div class="progress-row"><span>Question ${current + 1} of ${questions.length}</span><div class="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuemin="0" aria-valuemax="${questions.length}" aria-valuenow="${current + 1}"><div style="width:${((current + 1) / questions.length) * 100}%"></div></div><strong>${score()} points</strong></div>
      <article class="question-card">
        <div class="question-top"><div><p class="question-label">${escapeHtml(q.category)}</p><h2 id="question-title" tabindex="-1">${formatMathText(q.prompt)}</h2></div>${visual(q)}</div>
        <div class="answers" role="group" aria-label="Answer choices">${q.options.map((option, index) => {
          const status = answered ? (index === q.answer ? "answer-correct" : index === choice ? "answer-wrong" : "") : "";
          const mark = answered && index === q.answer ? "✓" : answered && index === choice ? "×" : String.fromCharCode(65 + index);
          return `<button type="button" data-choice="${index}" ${answered ? "disabled" : ""} aria-pressed="${choice === index}" class="${status}"><span class="answer-mark" aria-hidden="true">${mark}</span><span class="answer-text">${formatMathText(option)}</span></button>`;
        }).join("")}</div>
        ${answered ? `<div class="feedback ${choice === q.answer ? "correct" : "incorrect"}" role="status" tabindex="-1"><strong>${choice === q.answer ? "Correct." : "Not quite."}</strong><p>${formatMathText(q.explanation)}</p><div class="try-it"><b>Check it:</b> ${formatMathText(q.activity)}</div><details class="slide-references"><summary>Revisit the chapter</summary><ul>${q.slides.map(title => `<li>${escapeHtml(title.replaceAll("``", "“").replaceAll("''", "”"))}</li>`).join("")}</ul></details></div>` : ""}
        <div class="card-actions"><button type="button" class="secondary" data-action="previous" ${current === 0 ? "disabled" : ""}>← Previous</button><button type="button" class="primary" data-action="next" ${!answered ? "disabled" : ""}>${current === questions.length - 1 ? "See results" : "Next question →"}</button></div>
      </article>
    </section>
  </div>`;
}

function renderResults() {
  const total = score();
  const summary = sections.map(section => {
    const indices = questions.map((question, index) => question.section === section ? index : -1).filter(index => index >= 0);
    const correct = indices.filter(index => answers[index] === questions[index].answer).length;
    return `<li><span>${escapeHtml(section)}</span><strong>${correct} / ${indices.length}</strong></li>`;
  }).join("");
  root.innerHTML = `<section class="results" aria-labelledby="results-title">
    <p class="eyebrow">Quiz complete</p>
    <div class="score-ring" style="--score:${(total / questions.length) * 360}deg"><span>${total}/${questions.length}</span></div>
    <h2 id="results-title" tabindex="-1">${total} out of ${questions.length} correct</h2>
    <p>Review the explanations to connect decision geometry, class scores, probability models and the objectives used to learn them.</p>
    <ul class="section-results">${summary}</ul>
    <div class="result-actions"><button type="button" class="secondary" data-action="review">Review answers</button><button type="button" class="primary" data-action="restart">Restart quiz</button></div>
  </section>`;
}

function render(focusTarget) {
  if (finished) renderResults(); else renderQuestion();
  if (focusTarget) root.querySelector(focusTarget)?.focus();
}

root.addEventListener("click", event => {
  const choiceButton = event.target.closest("[data-choice]");
  if (choiceButton && answers[current] === null) {
    answers[current] = Number(choiceButton.dataset.choice);
    render(".feedback");
    return;
  }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "previous" && current > 0) {
    current -= 1;
    render("#question-title");
  } else if (action === "next" && answers[current] !== null) {
    if (current === questions.length - 1) {
      finished = true;
      render("#results-title");
    } else {
      current += 1;
      render("#question-title");
    }
  } else if (action === "review") {
    finished = false;
    current = 0;
    render("#question-title");
  } else if (action === "restart") {
    answers = Array(questions.length).fill(null);
    current = 0;
    finished = false;
    render("#question-title");
  }
});

render();



