document.getElementById("getStarted")
.addEventListener("click",function(){
      const password = document.getElementById("password").value ;
      const convertPassword =parseInt(password);
      const hiddenClass = document.querySelectorAll(".content")
      if(convertPassword == 1234){
            hiddenClass.forEach(hiddenClass=>{
                  hiddenClass.classList.remove("hidden")
            })
      }
      else{
            alert("Are Not successfully password")
      }
})