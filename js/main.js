var $searchForm = document.querySelector('#search-form');
var $vibesMessage = document.querySelector('.vibes-message');
var $resultsRow = document.querySelector('.results-row');
var $views = document.querySelectorAll('.view');
var $genreList = document.querySelector('#genre-list');
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

// function likeArtist(event) {
//   var dataArtistIdNum = parseInt(event.target.getAttribute('data-entry-id'));
//   data.like = dataArtistIdNum;
//   for (var i = 0; i < data.artists.length; i++) {
//     if (data.like === data.artists[i].id)
//     data.likedArtists.unshift(theArtist);
//   }
// }

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
    for (var i in similarArtists) {
      similarArtists[i].id = data.nextArtistId;
      data.nextArtistId++;
    }

    data.artists = similarArtists;
    appendDOM(data.artists);
  });
  xhr.send();
}

// generate DOM function
function generateArtistDOM(artistObject) {

  var artistBox = document.createElement('div');
  artistBox.className = 'column-third video-box';
  artistBox.setAttribute('data-artist-id', artistObject.id);
  $resultsRow.appendChild(artistBox);

  var artistName = document.createElement('p');
  artistName.className = 'row artist-name';
  artistName.textContent = artistObject.Name;
  artistBox.appendChild(artistName);

  var plusIcon = document.createElement('i');
  plusIcon.className = 'fas fa-plus';
  plusIcon.setAttribute('data-artist-id', artistObject.id);
  artistName.appendChild(plusIcon);

  var artistVideo = document.createElement('iFrame');
  artistVideo.className = 'column-full';
  artistVideo.setAttribute('height', '205');
  artistVideo.setAttribute('src', artistObject.yUrl);
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
$genreList.addEventListener('click', showArtistSearch);
$navLogo.addEventListener('click', showHomePage);
$appName.addEventListener('click', showHomePage);
