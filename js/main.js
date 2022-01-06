var $genreList = document.querySelector('.genre-list');
var $searchPage = document.querySelector('.search-page');

function handleGenrePress(event) {
  var dataViewValue = event.target.getAttribute('data-view');
  if (dataViewValue === 'artist-search') {
    $genreList.className = 'hidden';
    $searchPage.className = 'view';
  }
}
document.addEventListener('click', handleGenrePress);
