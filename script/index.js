function showCatogry() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(dataload => displayCategories(dataload.data));
}

function displayCategories(data) {
  const cetagoryContainer = document.getElementById("category-container");
  cetagoryContainer.innerHTML = "";

  for (let cat of data) {
    const categoryDiv = document.createElement("div");
    categoryDiv.innerHTML = `
      <button 
        class="btn btn-outline btn-primary lesson-button" 
        onclick="loadData(${cat.level_no}, this)">
        <img src="./assets/fa-book-open.png" alt="Book Icon"> lesson-${cat.level_no}
      </button>
    `;
    cetagoryContainer.appendChild(categoryDiv);
  }
}

function loadData(id, clickedBtn) {
  // Remove active class from all buttons
  const allButtons = document.querySelectorAll(".lesson-button");
  allButtons.forEach((btn) => {
    btn.classList.remove("btn-primary");
    btn.classList.add("btn-outline");
  });

  // Add active class to clicked button
  clickedBtn.classList.remove("btn-outline");
  clickedBtn.classList.add("btn-primary");

  // Load vocabulary cards
  fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(response => response.json())
    .then(data => {
      cardDisplay(data.data);
    });
}

const cardDisplay = (cards) => {
  const cardAdd = document.getElementById("card-container");
  cardAdd.innerHTML = "";
  const lessnStart = document.getElementById("lessnStart");
  if (lessnStart) lessnStart.style.display = "none";

  if (cards.length === 0) {
    cardAdd.innerHTML = `
      <div class="flex flex-col justify-center items-center col-span-full py-5">
        <img src="./assets/alert-error.png" alt="">
        <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h1 class="text-3xl font-bold">নেক্সট Lesson এ যান</h1>
      </div>`;
    return;
  }

  cards.forEach(card => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="card w-90 bg-base-200 card-xl shadow-xl">
        <div class="card-body">
          <h1 class="card-title flex justify-center">${card.word}</h1>
          <p>meaning/pronunciation</p>
          <h2>${card.meaning} / ${card.pronunciation}</h2>
          <div class="flex justify-between items-center mt-2">
            <button onclick="loadCategory(${card.id})">
              <i class="fa-solid fa-circle"></i>
            </button>
            <button onclick="speaktext('${card.word}')">🔊</button>
          </div>
        </div>
      </div>
    `;
    cardAdd.appendChild(div);
  });
};

const loadCategory = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      document.getElementById("card_details").showModal();
      document.getElementById("card-box").innerHTML = `
        <div class="space-y-3">
          <h1 class="text-3xl font-bold">${data.data.word}</h1>
          <h2 class="text-lg text-gray-600">(${data.data.meaning})</h2>
          <h3 class="text-xl font-semibold">Example</h3>
          <p class="text-xl">${data.data.sentence}</p>
          <h2 class="text-2xl font-semibold">সমার্থক শব্দ গুলো</h2>
          <p class="text-xl">${data.data.synonyms?.join(", ")}</p>
          <button class="btn btn-primary">Complete learning</button>
        </div>
      `;
    });
};

function speaktext(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

showCatogry();
