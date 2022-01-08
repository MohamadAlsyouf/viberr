var $genreList = document.querySelector('.genre-list');
var $searchPage = document.querySelector('.search-page');
var $searchForm = document.querySelector('#search-form');
var $vibesMessage = document.querySelector('.vibes-message');
var $resultsRow = document.querySelector('.results-row');

function handleGenrePress(event) {
  var dataViewValue = event.target.getAttribute('data-view');
  if (dataViewValue === 'artist-search') {
    $genreList.className = 'hidden';
    $searchPage.className = 'view';
  }
}
document.addEventListener('click', handleGenrePress);

function handleSubmit(event) {
  $vibesMessage.textContent = 'Similar Vibes';
  var name = $searchForm.elements.q.value;
  var xhr = new XMLHttpRequest();
  var targetUrl = encodeURIComponent('https://tastedive.com/api/similar?k=429885-Bootcamp-CY4UKJN5&limit=10&type=music&info=1&q=');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    data.artists = xhr.response.Similar.Results;
    appendDOM(data.artists);
  });
  xhr.send();
}

function generateArtistDOM(object) {
  // var threeArtistFullColumn = document.createElement('div');
  // threeArtistFullColumn.className = 'column-full';
  // $li.appendChild(threeArtistFullColumn);

  // var threeArtistRow = document.createElement('div');
  // threeArtistRow.className = 'row';
  // threeArtistFullColumn.appendChild(threeArtistRow);

  var artistBox = document.createElement('div');
  artistBox.className = 'column-third video-box';
  $resultsRow.appendChild(artistBox);

  var artistName = document.createElement('p');
  artistName.className = 'artist-name';
  artistName.textContent = object.Name; // Name maybe? instead of name
  artistBox.appendChild(artistName);

  var artistVideo = document.createElement('iFrame');
  artistVideo.className = 'column-full';
  artistVideo.setAttribute('height', '205');
  artistVideo.setAttribute('src', object.yUrl);
  artistBox.appendChild(artistVideo);

}

function appendDOM(object) {
  if (object.yUrl === null) {
    return;
  }
  for (var i = 0; i < data.artists.length; i++) {
    if (data.artists[i].yUrl === null) {
      return;
    }
    generateArtistDOM(data.artists[i]);
    // console.log(data.artists[i]);
  }
}

// event listeners
$searchForm.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', appendDOM);
