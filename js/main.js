const $searchForm = document.querySelector('#search-form');
const $vibesMessage = document.querySelector('.vibes-message');
const $resultsRow = document.querySelector('.results-row');
const $views = document.querySelectorAll('.view');
const $genreList = document.querySelector('#genre-list');
const $navLogo = document.querySelector('#logo-img');
const $appName = document.querySelector('.app-name');
const $likedArtists = document.querySelector('.artist-nav');
const $likedArtistsRow = document.querySelector('.liked-artists-row');
const $emptyArtistsText = document.querySelector('.no-artists');
const $networkError = document.querySelector('.network-err');
const $loadSpinner = document.querySelector('#loadSpinner');

const handleSubmit = event => {
  if (data.artists.length === 10) {
    while ($resultsRow.firstChild) $resultsRow.firstChild.remove();
    data.artists = [];
  }
  $networkError.className = 'network-err hidden';
  $loadSpinner.className = 'loadingio-spinner-rolling-sz6x1e80f7m';
  event.preventDefault();
  $vibesMessage.textContent = 'Similar Vibes';
  const name = $searchForm.elements.q.value;
  const xhr = new XMLHttpRequest();
  const targetUrl = encodeURIComponent('https://tastedive.com/api/similar?k=429885-Bootcamp-CY4UKJN5&limit=10&type=music&info=1&q=');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl + name);
  xhr.responseType = 'json';
  xhr.addEventListener('error', error => {
    console.error(error);
    $loadSpinner.className = 'hidden';
    $networkError.className = 'network-err';
    $vibesMessage.className = 'hidden';
  });
  xhr.addEventListener('load', () => {
    $loadSpinner.className = 'hidden';
    const similarArtists = xhr.response.Similar.Results;
    for (const i in similarArtists) {
      similarArtists[i].id = data.nextArtistId;
      data.nextArtistId++;
    }
    data.artists = similarArtists;
    if (data.artists.length === 0) {
      $loadSpinner.className = 'hidden';
      $networkError.className = 'network-err';
      $networkError.textContent =
      `No search results for '${name}'. \n Please check your spelling or enter a new artist!`;
    }
    appendDOM(data.artists);
  });
  xhr.send();
};

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

const generateLikedArtistsDOM = likedArtistObject => {
  const likedArtistBox = document.createElement('div');
  likedArtistBox.className = 'column-third video-box';
  $likedArtistsRow.appendChild(likedArtistBox);

  const artistName = document.createElement('p');
  artistName.className = 'row artist-name';
  artistName.textContent = likedArtistObject.Name;
  likedArtistBox.appendChild(artistName);

  var minusIcon = document.createElement('i');
  minusIcon.className = 'fas fa-minus';
  minusIcon.setAttribute('data-artist-id', likedArtistObject.id);
  artistName.appendChild(minusIcon);

  const artistVideo = document.createElement('iFrame');
  artistVideo.className = 'column-full';
  artistVideo.setAttribute('height', '205');
  artistVideo.setAttribute('src', likedArtistObject.yUrl);
  likedArtistBox.appendChild(artistVideo);

  return likedArtistBox;
};

const addOrRemoveArtist = event => {
  if (event.target.className === 'fas fa-plus') {
    checkIfLiked();
    checkEmpty();
  }
  if (event.target.className === 'fas fa-minus') {
    removeArtist();
    checkEmpty();
  }
};

const checkIfLiked = () => {
  const dataArtistIdNum = parseInt(event.target.getAttribute('data-artist-id'));
  for (let i = 0; i < data.artists.length; i++) {
    if (dataArtistIdNum === data.artists[i].id) {
      for (let j = 0; j < data.likedArtists.length; j++) {
        if (data.artists[i].Name !== data.likedArtists[j].Name) {
          continue;
        } else if (data.artists[i].Name === data.likedArtists[j].Name) {
          return;
        }
      }
      const theLikedArtistDOM = generateLikedArtistsDOM(data.artists[i]);
      $likedArtistsRow.appendChild(theLikedArtistDOM);
      event.target.closest('.video-box').remove();
      data.likedArtists.push(data.artists[i]);
    }
  }
};

const removeArtist = () => {
  const dataArtistIdNum = parseInt(event.target.getAttribute('data-artist-id'));
  for (let i = 0; i < data.likedArtists.length; i++) {
    if (dataArtistIdNum === data.likedArtists[i].id) {
      data.likedArtists.splice(i, 1);
      event.target.closest('.column-third.video-box').remove();
    }
  }
};

const checkEmpty = () => {
  if (data.likedArtists.length !== 0) {
    $emptyArtistsText.className = 'hidden';
  } else {
    $emptyArtistsText.className = 'column-full no-artists';
  }
};

const swapViews = view => {
  data.view = view;
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
  $vibesMessage.textContent = 'Add Some Vibes To Your Archives';
  if (data.artists.length !== 0) {
    while ($resultsRow.firstChild) $resultsRow.firstChild.remove();
    data.artists = [];
    $searchForm.elements.q.value = null;
  }
};

const showLikedArtists = () => {
  swapViews('liked-artists');
};

$searchForm.addEventListener('submit', handleSubmit);
$genreList.addEventListener('click', showArtistSearch);
$navLogo.addEventListener('click', showHomePage);
$appName.addEventListener('click', showHomePage);
document.addEventListener('click', addOrRemoveArtist);
$likedArtists.addEventListener('click', showLikedArtists);
document.addEventListener('DOMContentLoaded', () => {
  swapViews(data.view);
  appendDOM();
  checkEmpty();
  for (let i = 0; i < data.likedArtists.length; i++) {
    const theLikedArtistDOM = generateLikedArtistsDOM(data.likedArtists[i]);
    $likedArtistsRow.appendChild(theLikedArtistDOM);
  }
});
