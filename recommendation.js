async function getMovieDetails(url) {
    try{
        let data=await axios.get(url);
        return data.data.poster_path;
    }
    catch(e)
    {
        return null;
    }
}

async function createMovieList(movies)
{
    let recommended_movies=document.querySelector(".recommended_movies");
    let list=document.createElement("div");
    list.classList.add("list");
    for (let i = 0; i < 5 && movies.length>0; i++) {
        let recommended_movie = document.createElement("div");
        recommended_movie.classList.add("movie");
        let movie_id=movies[i]["id"];

        let title = document.createElement("div");
        title.classList.add("title");
        title.innerText = movies[i]["title"];  

        let poster = document.createElement("div");
        poster.classList.add("poster");
        let poster_path=await getMovieDetails(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=461ea396a43b3f65aa66e0775fb3cf4d&language=en-US`);
        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${poster_path})`;

        recommended_movie.appendChild(poster);
        recommended_movie.appendChild(title);
        list.appendChild(recommended_movie);
    }
    movies.splice(0,5);
    recommended_movies.appendChild(list);
    if(counter<3)
    {
        load_btn.style.display="inline";
        recommended_movies.appendChild(load_btn);
    }
}


async function  recommend(){
    counter=1;
    movies=[];
    let recommended_movies=document.querySelector(".recommended_movies");
    recommended_movies.innerHTML="";
    let movie=search_bar.value;
    let url=`https://movie-recommendation-api-rl8e.onrender.com/movies/${movie}`;
    try{
        let data=await axios.get(url);
        data=data.data;
        let keys = Object.keys(data).sort((a, b) => {
            return parseInt(a.replace('movie', '')) - parseInt(b.replace('movie', ''));
        });

        for (let key of keys) {
            movies.push(data[key]);
        }
        console.log(movies.length);
        createMovieList(movies);
    }
    catch(e)
    {
        let message=document.createElement("h2");
        message.innerHTML="Sorry the movie requested is not available. Please search for another movie";
        let recommended_movies=document.querySelector(".recommended_movies");
        recommended_movies.append(message);
        setTimeout(()=>{
            recommended_movies.removeChild(message);
        },5000);
    };
}
