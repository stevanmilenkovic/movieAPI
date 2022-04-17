const header = document.createElement('div');
header.classList.add('header');
document.body.insertBefore(header, document.querySelector('.main'));

const form = document.createElement('form');
header.appendChild(form);

const search = document.createElement('input');
search.classList.add('search');
search.setAttribute('placeholder', 'search');
form.appendChild(search);

const popular = document.createElement('div');
popular.classList.add('popular');
popular.innerHTML = 'popular';
header.insertBefore(popular, form);

const best_dramas = document.createElement('div');
best_dramas.classList.add('best_dramas');
best_dramas.innerHTML = 'best dramas';
header.insertBefore(best_dramas, form);

const in_theatres = document.createElement('div');
in_theatres.classList.add('in_theatres');
in_theatres.innerHTML = 'in theatres';
header.insertBefore(in_theatres, form);

const kids_movies = document.createElement('div');
kids_movies.classList.add('kids_movies');
kids_movies.innerHTML = 'kids movies';
header.insertBefore(kids_movies, form);

const best_from_2010 = document.createElement('div');
best_from_2010.classList.add('best_from_2010');
best_from_2010.innerHTML = 'best from 2010';
header.insertBefore(best_from_2010, form);

const main = document.querySelector('.main');

const apiKey = 'api_key=760caa41642a41aab133542c3d03b2ac';
const baseUrl = 'https://api.themoviedb.org/3';
const searchUrl = baseUrl + '/search/movie?' + apiKey;
const popularUrl = baseUrl + '/discover/movie?sort_by=popularity.desc&' + apiKey;
const bestDramasUrl = baseUrl + '/discover/movie?with_genres=18&primary_release_year=2014&' + apiKey;
const inTheatresUrl = baseUrl + '/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22&' + apiKey;
const kidsMoviesUrl = baseUrl + '/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&' + apiKey;
const bestFrom2010Url = baseUrl + '/discover/movie?primary_release_year=2010&sort_by=vote_average.desc&' + apiKey;


getMovies(popularUrl);

popular.addEventListener('click', ()=>{
    main.innerHTML = '';
    getMovies(popularUrl);
});

best_dramas.addEventListener('click', ()=>{
    main.innerHTML = '';
    getMovies(bestDramasUrl);
});

in_theatres.addEventListener('click', ()=>{
    main.innerHTML = '';
    getMovies(inTheatresUrl);
});

kids_movies.addEventListener('click', ()=>{
    main.innerHTML = '';
    getMovies(kidsMoviesUrl);
});

best_from_2010.addEventListener('click', ()=>{
    main.innerHTML = '';
    getMovies(bestFrom2010Url);
});

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm){
        main.innerHTML = '';
        getMovies(searchUrl + '&query=' + searchTerm);
    }
})

function getMovies(url){


    fetch(url).then(resp => resp.json()).then(data => {
        showMovies(data.results);
    });
}

function showMovies(result_list){


    for (let i=0; i<result_list.length; i+=1){
        //movieDiv
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const img = document.createElement('div');
        img.classList.add('img');
        img.innerHTML = '<img src="https://image.tmdb.org/t/p/w500'+ result_list[i].poster_path +'" width="100%" alt="img" class="poster">'
        movieDiv.appendChild(img);

        const title = document.createElement('div');
        title.classList.add('title');
        movieDiv.appendChild(title);

        const movie_title = document.createElement('h3');
        movie_title.classList.add('movie_title');
        movie_title.innerHTML = result_list[i].title
        title.appendChild(movie_title);

        const rating = document.createElement('span');
        rating.classList.add('rating');
        if (result_list[i].vote_average >= 8.0){
            rating.classList.add('green');
        } else if (result_list[i].vote_average >= 6.5) {
            rating.classList.add('orange');
        } else {
            rating.classList.add('black');
        };
        rating.innerHTML = (result_list[i].vote_average);
        title.appendChild(rating);

        const info = document.createElement('div');
        info.classList.add('info');
        movieDiv.appendChild(info);

        const infoH = document.createElement('h3');
        infoH.innerHTML = 'Overview';
        info.appendChild(infoH);

        const overview = document.createElement('span');
        overview.classList.add('overview');
        overview.innerHTML = result_list[i].overview;
        info.appendChild(overview);
        //movieDiv
        main.appendChild(movieDiv)
    }

}

