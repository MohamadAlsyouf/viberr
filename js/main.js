const $searchForm = document.querySelector('#search-form');
const $vibesMessage = document.querySelector('.vibes-message');
const $resultsRow = document.querySelector('.results-row');
const $views = document.querySelectorAll('.view');

const $genreList = document.querySelector('#genre-list');
const $navLogo = document.querySelector('#logo-img');
const $appName = document.querySelector('.app-name');
const $likedArtists = document.querySelector('.artist-nav');
const $likedArtistsRow = document.querySelector('.liked-artists-row');

// view swapping function
const swapViews = view => {
  for (let i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
};

const showArtistSearch = () => {
  swapViews('artist-search');
};

const showHomePage = () => {
  swapViews('home-page');
};

const showLikedArtists = () => {
  swapViews('liked-artists');
};

// handle liked Artists function

const likeArtist = event => {
  const dataArtistIdNum = parseInt(event.target.getAttribute('data-artist-id'));
  if (event.target.className === 'fas fa-plus') {
    for (let i = 0; i < data.artists.length; i++) {
      if (dataArtistIdNum === data.artists[i].id) {
        const theLikedArtistDOM = generateLikedArtistsDOM(data.artists[i]);
        $likedArtistsRow.appendChild(theLikedArtistDOM);
        event.target.closest('.video-box').remove();
        data.likedArtists.push(data.artists[i]);
      }
    }
  }
};

// handle submit function
const handleSubmit = event => {
  event.preventDefault();
  $vibesMessage.textContent = 'Similar Vibes';
  const name = $searchForm.elements.q.value;
  const xhr = new XMLHttpRequest();
  const targetUrl = encodeURIComponent('https://tastedive.com/api/similar?k=429885-Bootcamp-CY4UKJN5&limit=10&type=music&info=1&q=');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', () => {
    const similarArtists = xhr.response.Similar.Results;
    for (const i in similarArtists) {
      similarArtists[i].id = data.nextArtistId;
      data.nextArtistId++;
    }
    data.artists = similarArtists;
    appendDOM(data.artists);
  });
  xhr.send();
};

// generate DOM function for Artist Search
const generateArtistDOM = artistObject => {

  const artistBox = document.createElement('div');
  artistBox.className = 'column-third video-box';
  artistBox.setAttribute('data-artist-id', artistObject.id);
  $resultsRow.appendChild(artistBox);

  const artistName = document.createElement('p');
  artistName.className = 'row artist-name';
  artistName.textContent = artistObject.Name;
  artistBox.appendChild(artistName);

  const plusIcon = document.createElement('i');
  plusIcon.className = 'fas fa-plus';
  plusIcon.setAttribute('data-artist-id', artistObject.id);
  artistName.appendChild(plusIcon);

  const artistVideo = document.createElement('iFrame');
  artistVideo.className = 'column-full';
  artistVideo.setAttribute('height', '205');
  artistVideo.setAttribute('src', artistObject.yUrl);
  artistBox.appendChild(artistVideo);

  return artistBox;
};

// append Artist Search DOM function
const appendDOM = object => {
  let validArtists = 0;
  for (let i = 0; i < data.artists.length; i++) {
    if (data.artists[i].yUrl === null) {
      continue;
    } else {
      validArtists++;
      generateArtistDOM(data.artists[i]);
    }
    if (validArtists === 6) {
      return;
    }
  }
};

// generate DOM function for Liked Artists
const generateLikedArtistsDOM = likedArtistObject => {

  const likedArtistBox = document.createElement('div');
  likedArtistBox.className = 'column-third video-box';
  $likedArtistsRow.appendChild(likedArtistBox);

  const artistName = document.createElement('p');
  artistName.className = 'row artist-name';
  artistName.textContent = likedArtistObject.Name;
  likedArtistBox.appendChild(artistName);

  var minusIcon = document.createElement('i');
  minusIcon.className = 'fa-solid fa-minus';
  minusIcon.setAttribute('data-artist-id', likedArtistObject.id);
  artistName.appendChild(minusIcon);

  const artistVideo = document.createElement('iFrame');
  artistVideo.className = 'column-full';
  artistVideo.setAttribute('height', '205');
  artistVideo.setAttribute('src', likedArtistObject.yUrl);
  likedArtistBox.appendChild(artistVideo);

  return likedArtistBox;
};

// event listeners
$searchForm.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', () => {
  appendDOM();
  for (let i = 0; i < data.likedArtists.length; i++) {
    const theLikedArtistDOM = generateLikedArtistsDOM(data.likedArtists[i]);
    $likedArtistsRow.appendChild(theLikedArtistDOM);
  }
});
$genreList.addEventListener('click', showArtistSearch);
$navLogo.addEventListener('click', showHomePage);
$appName.addEventListener('click', showHomePage);
document.addEventListener('click', likeArtist);
$likedArtists.addEventListener('click', showLikedArtists);
