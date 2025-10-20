function renderQuiz() {
  const quizDiv = document.getElementById("quiz");
  QUIZ.forEach((q, i) => {
    const qDiv = document.createElement("div");
    qDiv.className = "question";
    const qTitle = document.createElement("h3");
    qTitle.textContent = (i+1) + ". " + q.q;
    qDiv.appendChild(qTitle);

    const optsDiv = document.createElement("div");
    optsDiv.className = "options";

    q.options.forEach(opt => {
      const id = `q${i}_${opt.replace(/\s+/g,'_')}`;
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${i}`;
      radio.value = opt;
      label.appendChild(radio);
      label.append(" " + opt);
      optsDiv.appendChild(label);
    });

    qDiv.appendChild(optsDiv);
    quizDiv.appendChild(qDiv);
  });
}

// Sparkles effect
function createSparkles() {
  for(let i=0;i<30;i++){
    const sparkle = document.createElement("div");
    sparkle.className="sparkle";
    sparkle.style.left = Math.random()*100+"%";
    sparkle.style.top = Math.random()*100+"%";
    sparkle.style.animationDelay = Math.random()*2+"s";
    document.body.appendChild(sparkle);
  }
}

function collectAnswers() {
  const answers = [];
  for (let i = 0; i < QUIZ.length; i++) {
    const radios = document.getElementsByName(`q${i}`);
    let chosen = null;
    for (const r of radios) {
      if (r.checked) chosen = r.value;
    }
    answers.push(chosen);
  }
  return answers;
}

async function submitQuiz() {
  const answers = collectAnswers();
  for (let i=0;i<answers.length;i++) {
    if (!answers[i]) {
      alert("Please answer question " + (i+1));
      return;
    }
  }

  const resp = await fetch('/api/sort', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({answers})
  });

  if (!resp.ok) {
    const err = await resp.json();
    alert("Error: " + (err.error || resp.statusText));
    return;
  }

  const data = await resp.json();
  const result = document.getElementById("result");
  result.classList.remove("hidden");
  result.style.display="block";

  // Set house name and description
  document.getElementById("house").textContent = data.house;
  const descMap = {
    Gryffindor: "Brave, daring, and bold - Gryffindor shines!",
    Hufflepuff: "Loyal, patient, and kind - Hufflepuff stands strong!",
    Ravenclaw: "Wise, curious, and clever - Ravenclaw values knowledge!",
    Slytherin: "Ambitious, resourceful, and cunning - Slytherin excels!"
  };
  document.getElementById("house-desc").textContent = descMap[data.house];

  // Animated score bars
  const scoresDiv = document.getElementById("house-scores");
  scoresDiv.innerHTML = "";
  for (const [house, score] of Object.entries(data.scores)) {
    const bar = document.createElement("div");
    bar.className = "house-score-bar";
    const fill = document.createElement("div");
    fill.className = `house-score-fill ${house}`;
    fill.style.width = "0";
    fill.textContent = score;
    bar.appendChild(fill);
    scoresDiv.appendChild(bar);
    setTimeout(() => {
      fill.style.width = (score*20)+"%";
    }, 100);
  }

  createSparkles();
  window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
  document.getElementById("submit").addEventListener("click", submitQuiz);
});
