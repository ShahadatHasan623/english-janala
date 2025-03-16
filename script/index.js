function showCatogry() {
      fetch("https://openapi.programming-hero.com/api/levels/all")
            .then(res => res.json())
            .then(dataload => displayCategories(dataload.data))
}

function displayCategories(data) {
      // console.log(data)
      const cetagoryContainer = document.getElementById("category-container")
      for (let cat of data) {
            console.log(cat)
            const categoryDiv = document.createElement("div")
            categoryDiv.innerHTML = `
             <button  onclick="loadData(${cat.level_no})" class="btn btn-outline btn-primary"><img src="./assets/fa-book-open.png" alt="">lesson-${cat.level_no}</button>
             
            `
            cetagoryContainer.appendChild(categoryDiv)
      }
}



function loadData (id){
      fetch(`https://openapi.programming-hero.com/api/level/${id}`)
      .then(response =>response.json())
      .then(data => cardDisplay(data.data))

}
const cardDisplay =(cards)=>{
      const button = document.getElementById("category-container")
      cards.forEach(card => {
            const div = document.createElement("div");
            div.innerHTML=`${card.word}`
            button.append(div)

      });

}

loadData()
showCatogry()

