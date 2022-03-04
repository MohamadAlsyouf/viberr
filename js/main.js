var $searchForm = document.querySelector('#search-form');
var $vibesMessage = document.querySelector('.vibes-message');
var $resultsRow = document.querySelector('.results-row');
var $views = document.querySelectorAll('.view');

var $genreList = document.querySelector('#genre-list');
var $navLogo = document.querySelector('#logo-img');
var $appName = document.querySelector('.app-name');
var $likedArtists = document.querySelector('.artist-nav');
// append the liked artists DOM to this below.
var $likedArtistsRow = document.querySelector('.liked-artists-row');

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

function showLikedArtists() {
  swapViews('liked-artists');
}

// handle liked Artists function

// LIKED ARTISTS ARE RENDERING WRONG!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function likeArtist(event) {
  // console.log(event.target);
  var dataArtistIdNum = parseInt(event.target.getAttribute('data-artist-id'));
  if (event.target.className === 'fas fa-plus') {
    for (var i = 0; i < data.artists.length; i++) {
      if (dataArtistIdNum === data.artists[i].id) {
        var theLikedArtistDOM = generateLikedArtistsDOM(data.artists[i]);
        $likedArtistsRow.appendChild(theLikedArtistDOM);
        $resultsRow.children[i].remove();
        data.likedArtists.push(data.artists[i]);
      }
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
    for (var i in similarArtists) {
      similarArtists[i].id = data.nextArtistId;
      data.nextArtistId++;
    }

    data.artists = similarArtists;
    appendDOM(data.artists);
  });
  xhr.send();
}

// generate DOM function for Artist Search
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

// append Artist Search DOM function
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

// generate DOM function for Liked Artists
function generateLikedArtistsDOM(artistObject) {

  var artistBox = document.createElement('div');
  artistBox.className = 'column-third video-box';
  $likedArtistsRow.appendChild(artistBox);

  var artistName = document.createElement('p');
  artistName.className = 'artist-name';
  artistName.textContent = artistObject.Name;
  artistBox.appendChild(artistName);

  // !!!!!!!!!!!!!!!!!!!!!! MAKE THIS A TRASH CAN ICON !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // var plusIcon = document.createElement('i');
  // plusIcon.className = 'fas fa-plus';
  // plusIcon.setAttribute('data-artist-id', artistObject.id);
  // artistName.appendChild(plusIcon);

  var artistVideo = document.createElement('iFrame');
  artistVideo.className = 'column-full';
  artistVideo.setAttribute('height', '205');
  artistVideo.setAttribute('src', artistObject.yUrl);
  artistBox.appendChild(artistVideo);

  return artistBox;
}

// event listeners
$searchForm.addEventListener('submit', handleSubmit);
document.addEventListener('DOMContentLoaded', () => {
  appendDOM();
  for (var i = 0; i < data.likedArtists.length; i++) {
    var theLikedArtistDOM = generateLikedArtistsDOM(data.likedArtists[i]);
    $likedArtistsRow.appendChild(theLikedArtistDOM);
  }
});
$genreList.addEventListener('click', showArtistSearch);
$navLogo.addEventListener('click', showHomePage);
$appName.addEventListener('click', showHomePage);
document.addEventListener('click', likeArtist);
$likedArtists.addEventListener('click', showLikedArtists);

//
//
//
// ISSUES !!!!!!! RENDERING WRONG AMOUNT OF VIDEOS INTO LIKED ARTISTS VIEW
//                NOT CONDITIONALLY STORING LOCAL STORAGE
//                VIEW CHANGES/DOES NOT RESET CORRECTLY ON VIEW RELOAD
//                FIX ARTISTS LINK ITS HELLLA UGLY*
//                LIKED ARTISTS DO NOT SAVE ON PAGE RELOAD!!!
