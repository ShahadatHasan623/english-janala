function showCatogry() {
      fetch("https://openapi.programming-hero.com/api/levels/all")
            .then(res => res.json())
            .then(dataload => displayCategories(dataload.data))
}

function displayCategories(data) {
      // console.log(data)
      const cetagoryContainer = document.getElementById("category-container")
      for (let cat of data) {
            // console.log(cat)
            const categoryDiv = document.createElement("div")
            categoryDiv.innerHTML = `
             <button id="btn-${cat.id}" onclick="loadData(${cat.level_no})" class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">lesson-${cat.level_no}</button>
            `
            cetagoryContainer.appendChild(categoryDiv)
      }
}



function loadData (id){
      fetch(`https://openapi.programming-hero.com/api/level/${id}`)
      .then(response =>response.json())                                                                 .then(data => {
            cardDisplay(data.data)
      })
}
const cardDisplay =(cards)=>{
      const cardAdd = document.getElementById("card-container")
      cardAdd.innerHTML="";
      document.getElementById("lessnStart").style.display ="none"
      cards.forEach(card => {
            console.log(card)
            const div =document.createElement("div")
            div.innerHTML =`<div class="card w-90 bg-base-200 card-xl shadow-xl">
      <div class="card-body ">
      <h1 class="card-title flex justify-center"> ${card.word}</h1>
      <p>meaning/pronunciation</p>
      <h2>${card.meaning} / ${card.pronunciation}</h2>
      <div class="flex justify-between items-center">
       <div>
          <button id="click_button" onclick="loadCategory(${card.id})"><i class="fa-solid fa-circle"></i></button>
      </div>
      <div>
      <p><i class="fa-solid fa-volume-high"></i></p>
      </div>
      </div>
    
      </div>
      </div>`
            cardAdd.appendChild(div)
      });
      if(cards.length === 0){
            cardAdd.innerHTML =` <div class="flex flex-col justify-center items-center col-span-full py-5">
            <img src="./assets/alert-error.png" alt="">
            <p>এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-3xl font-bold">নেক্সট Lesson এ যান</h1>
           </div>`
           return;
      }

}


const loadCategory =(id)=>{
      const url =`https://openapi.programming-hero.com/api/word/${id}`
      // console.log(url)
      fetch(url)
      .then(res=>res.json())
      .then(data =>{
            document.getElementById("card_details").showModal();
            document.getElementById("card-box").innerHTML = `
            <div class="space-y-3">
            <h1 class="text-3xl font-bold">${data.data.word} (<i class="fa-solid fa-microphone-lines"></i>: ${data.data.meaning})<h1>
            <h1 class="text-3xl font-bold">Example</h1>
            <p class="text-xl"> ${data.data.sentence}</p>
            <h2 class="text-3xl font-semibold"> সমার্থক শব্দ গুলো </h2>
            <p class="text-xl"> ${data.data.synonyms[0]} ${data.data.synonyms[1]} ${data.data.synonyms[2]} </p>
            </div>
            
            `
      })
     
     
}


showCatogry()


// id
// :
// 5
// level
// :
// 1
// meaning
// :
// "আগ্রহী"
// partsOfSpeech
// :
// "adjective"
// points
// :
// 1
// pronunciation
// :
// "ইগার"
// sentence
// :
// "The kids were eager to open their gifts."
// synonyms
// :
// (3)['enthusiastic', 'excited', 'keen']
