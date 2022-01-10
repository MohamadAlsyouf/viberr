var $searchForm = document.querySelector('#search-form');
var $vibesMessage = document.querySelector('.vibes-message');
var $resultsRow = document.querySelector('.results-row');
var $allViews = document.querySelectorAll('.view');

// view swapping function

function swapViews(event) {
  var dataViewValue = event.target.getAttribute('data-view');
  if (dataViewValue === null) {
    return;
  }
  for (var i = 0; i < $allViews.length; i++) {
    if ($allViews[i].getAttribute('data-view') === dataViewValue) {
      $allViews[i].className = 'view';
    } else {
      $allViews[i].className = 'view hidden';
    }
  }
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
  artistName.className = 'artist-name';
  artistName.textContent = object.Name;
  artistBox.appendChild(artistName);

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
document.addEventListener('click', swapViews);
$searchForm.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', appendDOM);
