var $searchForm = document.querySelector('#search-form');
var $vibesMessage = document.querySelector('.vibes-message');
var $resultsRow = document.querySelector('.results-row');
var $views = document.querySelectorAll('.view');
var $genreBox = document.querySelector('.genre');
var $navLogo = document.querySelector('#logo-img');
var $appName = document.querySelector('.app-name');

// view swapping function
function swapViews(view) {
  for (var i = 0; i < $views.length; i++) {
    if ($views[i].getAttribute('data-view') === view) {
      $views[i].classList.remove('hidden');
    } else {
      $views[i].classList.add('hidden');
    }
  }
}

function showArtistSearch() {
  swapViews('artist-search');
}

function showHomePage() {
  swapViews('home-page');
}

// handle submit function
function handleSubmit(event) {
  event.preventDefault();
  $vibesMessage.textContent = 'Similar Vibes';
  var name = $searchForm.elements.q.value;
  var xhr = new XMLHttpRequest();
  var targetUrl = encodeURIComponent('https://tastedive.com/api/similar?k=429885-Bootcamp-CY4UKJN5&limit=10&type=music&info=1&q=');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var similarArtists = xhr.response.Similar.Results;
    data.artists = similarArtists;
    appendDOM(data.artists);
  });
  xhr.send();
}

// generate DOM function
function generateArtistDOM(object) {

  var artistBox = document.createElement('div');
  artistBox.className = 'column-third video-box';
  $resultsRow.appendChild(artistBox);

  var artistName = document.createElement('p');
  artistName.className = 'row artist-name';
  artistName.textContent = object.Name;
  artistBox.appendChild(artistName);

  var plusIcon = document.createElement('i');
  plusIcon.className = 'fas fa-plus';
  artistName.appendChild(plusIcon);

  var artistVideo = document.createElement('iFrame');
  artistVideo.className = 'column-full';
  artistVideo.setAttribute('height', '205');
  artistVideo.setAttribute('src', object.yUrl);
  artistBox.appendChild(artistVideo);

  return artistBox;
}

// append DOM function
function appendDOM(object) {
  var validArtists = 0;
  for (var i = 0; i < data.artists.length; i++) {
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
}

// event listeners
$searchForm.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', appendDOM);
$genreBox.addEventListener('click', showArtistSearch);
$navLogo.addEventListener('click', showHomePage);
$appName.addEventListener('click', showHomePage);
