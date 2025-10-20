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
  result.innerHTML = `<h2>Your house: ${data.house}</h2>
                      <pre>${JSON.stringify(data.scores, null, 2)}</pre>`;

  // Apply house theme dynamically
  document.body.classList.remove('gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin');
  const houseClass = data.house.toLowerCase();
  document.body.classList.add(houseClass);

  window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
}

document.addEventListener("DOMContentLoaded", () => {
  renderQuiz();
  document.getElementById("submit").addEventListener("click", submitQuiz);
});

function createMagic() {
  const sparkContainer = document.createElement('div');
  sparkContainer.className = 'sparks';
  document.body.appendChild(sparkContainer);

  const orbContainer = document.createElement('div');
  orbContainer.className = 'light-orbs';
  document.body.appendChild(orbContainer);

  const colors = ['#7f0909', '#f0e68c', '#0e1a40', '#1a472a']; // Gryff, Huff, Raven, Slyth

  // create sparks
  for (let i = 0; i < 50; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.left = Math.random() * window.innerWidth + 'px';
    spark.style.top = Math.random() * window.innerHeight + 'px';
    spark.style.width = spark.style.height = (2 + Math.random() * 4) + 'px';
    spark.style.animationDuration = (10 + Math.random() * 15) + 's';
    sparkContainer.appendChild(spark);
  }

  // create floating color orbs
  for (let i = 0; i < 30; i++) {
    const orb = document.createElement('div');
    orb.className = 'orb';
    orb.style.left = Math.random() * window.innerWidth + 'px';
    orb.style.top = Math.random() * window.innerHeight + 'px';
    orb.style.width = orb.style.height = (20 + Math.random() * 20) + 'px';
    orb.style.background = colors[Math.floor(Math.random() * colors.length)];
    orb.style.animationDuration = (20 + Math.random() * 20) + 's';
    orbContainer.appendChild(orb);
  }
}

document.addEventListener('DOMContentLoaded', createMagic);

