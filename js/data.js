/* exported data */
var data = {
  view: 'genres',
  artists: [],
  editing: null,
  nextArtistId: 1
};

// new entries are saved to local storage along w rest of data model on reload

var previousArtist = localStorage.getItem('artist-data');
if (previousArtist !== null) {
  data = JSON.parse(previousArtist);
}

function handleBeforeUnload(event) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('artist-data', dataJSON);
}

window.addEventListener('beforeunload', handleBeforeUnload);
