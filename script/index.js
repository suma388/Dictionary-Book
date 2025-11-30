//                        nav button trogle
function goToFAQ() {
  document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
}
function goToLearn() {
  document.getElementById("learn").scrollIntoView({ behavior: "smooth" });
}
// -----------------------------------------------------------------
function lessonDataFetch() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((data) => {
      showLessonBtn(data.data);
    });
}
// ------------------------------------------------------
function removeClass() {
  const activeBtn = document.getElementsByClassName("active");
  for (let btn of activeBtn) {
    btn.classList.remove("active");
  }
}
// ----------------------------------------------------------------
function allLessonDataFetch() {
  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
      showLessonCard(data.data);
    });
}
// ---------------------------------------------------
function containerEmpty() {
  document.getElementById("card-container").innerHTML = "";
}
// ---------------------------------------------------------
function idDetailsDataFetch(id) {
  fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => showCardDetails(data.data));
}
// -------------------------------------------------------------------
function fetchDataByLevel(level) {
  fetch(`https://openapi.programming-hero.com/api/level/${level}`)
    .then((res) => res.json())
    .then((data) => {
      removeClass();
      document.getElementById(level).classList.add("active");
      showLessonCard(data.data);
    });
}
// --------------------------------------------------------------------
function showCardDetails(details) {
  document.getElementById("details_modal").showModal();
  const detailsContainer = document.getElementById("detais-container");
  detailsContainer.innerHTML = `<h3 class="text-[36px] font-semibold mb-5">
            ${details.word} (<i class="fa-etch fa-solid fa-microphone"></i>:${
    details.pronunciation
  } )
          </h3>
          <h3 class="text-[24px] font-semibold">Meaning</h3>
          <h3 class="text-[24px] font-medium mb-5">${
            details.meaning ? `${details.meaning}` : "অর্থ পাওয়া যায়নি"
          }</h3>
          <h3 class="text-[24px] font-semibold">Example</h3>
          <p class="text-[24px] mb-5">${details.sentence}</p>
          <h3 class="text-[24px] font-medium">সমার্থক শব্দ গুলো</h3>
          <div id="button-container" class="flex gap-2 mt-2">
            <button class="btn bg-[#EDF7FF]">${
              details.synonyms[0] ? `${details.synonyms[0]}` : ""
            }</button>
            <button class="btn bg-[#EDF7FF]">${
              details.synonyms[1] ? `${details.synonyms[1]}` : ""
            }</button>
            <button class="btn bg-[#EDF7FF]">${
              details.synonyms[2] ? `${details.synonyms[2]}` : ""
            }</button>
          </div>

          <div class="modal-action flex justify-start">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button
                class="px-4 py-2 rounded-lg font-medium text-[24px] bg-[#432ad4] text-white cursor-pointer"
              >
                Complete Learning
              </button>
            </form>
          </div>`;
  if (details.synonyms.length === 0) {
    document.getElementById("button-container").innerHTML = "";
  }
}

function showLessonCard(array) {
  const cardContainer = document.getElementById("card-container");
  // console.log(array.length);
  if (array.length === 0) {
    cardContainer.innerHTML = `
        <div class="flex flex-col col-span-full justify-center items-center space-y-3">
      <img class="w-[96px]" src="assets/alert-error.png" alt="" />
      <p class="text-[13px]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
      <h1 class="text-[34px] font-medium">নেক্সট Lesson এ যান</h1>
    </div>
    `;
    return;
  }
  containerEmpty();
  array.forEach((item) => {
    // console.log(item.level);
    const nweDiv = document.createElement("div");
    nweDiv.innerHTML = `
              <div class="card card-border bg-base-100 text-center">
              <div class="card-body text-center p-8">
                <h2 class="text-[32px] font-bold">${item.word}</h2>
                <p class="font-medium text-[20px]"> Meaning  /   Pronunciation</p>
                <h1 class="font-semibold text-[32px]">${item.meaning} / ${item.pronunciation}</h1>
                <div class="flex justify-between items-center mt-4">
                  <button onclick="idDetailsDataFetch('${item.id}')"
                    class="bg-[#e8f4fe] px-4 rounded-lg py-3 cursor-pointer hover:bg-[#b5d8f5]"
                  >
                    <img src="assets/details.png" alt="" />
                  </button>
                  <button
                    onclick ="pronounceWord('${item.word}')"
                    class="bg-[#e8f4fe] px-4 rounded-lg py-3 cursor-pointer hover:bg-[#b5d8f5]"
                  >
                    <img src="assets/sound.png" alt="" />
                  </button>
                </div>
              </div>
            </div>
    `;
    cardContainer.appendChild(nweDiv);
  });
}

function showLessonBtn(array) {
  array.forEach((item) => {
    const lessonBtnContainer = document.getElementById("lesson-btn-container");
    const newBtn = document.createElement("button");
    // console.log(item.level_no);
    newBtn.innerHTML = `
              <button
              id ="${item.level_no}"
              onclick="fetchDataByLevel(${item.level_no})"
              class="btn border-[#432ad5] text-[#432ad5] font-semibold text-[14px] hover:bg-[#422AD5] hover:text-white"
            >
              <i class="fa-etch fa-solid fa-book-open"></i> lesson-${item.level_no}
            </button>
    
    `;
    lessonBtnContainer.appendChild(newBtn);
  });
}
//                creat sound
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

lessonDataFetch();
// allLessonDataFetch();
// ----------------------login section--------------------------
document.getElementById("get-start-btn").addEventListener("click", () => {
  const nameInput = document.getElementById("name-input").value;
  const passwordInput = document.getElementById("password").value;
  const password = parseInt(passwordInput);
  if (nameInput === "rahim") {
    console.log("ok");
  } else {
    alert("Please Enter Name!!!");
    return;
  }
  if (password === 123456) {
    alert("Your Requset is Successfull");
    document.getElementById("learn").classList.remove("hidden");
    document.getElementById("faq").classList.remove("hidden");
  } else {
    alert("Please Enter Valid Password");
    return;
  }
  // console.log(typeof nameInput);
  // console.log("okk");
});
