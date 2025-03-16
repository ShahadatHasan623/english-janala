document.getElementById("getStarted")
.addEventListener("click",function(){
      const password = document.getElementById("password").value ;
      const convertPassword =parseInt(password);
      const hiddenClass = document.querySelectorAll(".content")
      const bannerSection = document.getElementById("banner")
      if(convertPassword == 1234){
            hiddenClass.forEach(hiddenClass=>{
                  hiddenClass.classList.remove("hidden")
                  bannerSection.style.display ="none"
                  
            })
      }
      else{
            alert("Are Not successfully password")
      }
})