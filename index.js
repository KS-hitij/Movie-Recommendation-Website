let recommend_btn=document.querySelector(".recommend .btn");
let search_bar=document.querySelector("input");
let load_btn=document.querySelector(".load")
let movies=[]
let counter=1;


recommend_btn.addEventListener("click",recommend)
load_btn.addEventListener("click",load);

function load() {
   if(counter<3)
    {
        createMovieList(movies);
        counter++;
        if(counter==3)
            load_btn.style.display="none";
    }
}