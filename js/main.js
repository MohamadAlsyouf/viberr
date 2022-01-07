var $genreList = document.querySelector('.genre-list');
var $searchPage = document.querySelector('.search-page');
var $searchForm = document.querySelector('#search-form');
var $vibesMessage = document.querySelector('.vibes-message');
// var $ul = document.querySelector('ul');
// var $li = document.querySelector('li');

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
  var targetUrl = encodeURIComponent('https://tastedive.com/api/similar?k=429885-Bootcamp-CY4UKJN5&limit=10&info=1&q=');
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl + name);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    // console.log(xhr.status);
    // console.log(xhr.response);

    data.artists = xhr.response.Similar.Results;
    // data.artists.forEach(createList);
    // check code journal appendDom function
  });
  xhr.send();
}

// function generateArtistDOM(object) {
//   var threeArtistFullColumn = document.createElement('div');
//   threeArtistFullColumn.className = 'column-full';
//   $li.appendChild(threeArtistFullColumn);

//   var threeArtistRow = document.createElement('div');
//   threeArtistRow.className = 'row';
//   threeArtistFullColumn.appendChild(threeArtistRow);

//   var artistBox = document.createElement('div');
//   artistBox.className = 'column-third video-box';
//   threeArtistRow.appendChild(artistBox);

//   var artistName = document.createElement('p');
//   artistName.className = 'artist-name';
//   artistName.textContent = object.name; // Name maybe? instead of name
//   artistBox.appendChild(artistName);

//   var artistVideo = document.createElement('iFrame');
// }

// function generateArtistsDOM(object) {
// // describes what i want to do to just one item in the array

//   if (object.yUrl === null) {
//     return;
//   }

//   // var artistLi = document.createElement('li');
//   // artistLi.className = 'artist-li';
//   // artistLi.setAttribute('data-entry-id', data.nextArtistId);

//   var artistRow = document.createElement('div');
//   artistRow.className = 'row';
//   $ul.appendChild(artistRow);

//   var artistArea = document.createElement('div');
//   artistArea.className = 'column-full';
//   artistRow.appendChild(artistArea);

//   var artistBox = document.createElement('div');
//   artistBox.className = 'column-third';
//   artistRow.appendChild(artistBox);

//   var artistName = document.createElement('p');
//   artistName.textContent = object.Name;
//   artistName.className = 'artist-name';
//   artistBox.appendChild(artistName);

//   var artistVideo = document.createElement('a');
//   artistVideo.setAttribute('href', object.yUrl);
//   artistVideo.textContent = object.yUrl;
//   artistBox.appendChild(artistVideo);

//   // return artistRow;
// }

// event listeners
$searchForm.addEventListener('submit', handleSubmit);
