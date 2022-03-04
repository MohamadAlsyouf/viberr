/* exported data */
var data = {
  view: 'genres',
  artists: [],
  likedArtists: [],
  editing: null,
  nextArtistId: 1
};

// var dataJSON = localStorage.getItem('artist-data');
// if (dataJSON !== null) {
//   data = JSON.parse(dataJSON);
// }

// function handleBeforeUnload(event) {
//   data.artists = [];
//   var dataJSON = JSON.stringify(data);
//   localStorage.setItem('artist-data', dataJSON);
// }

// window.addEventListener('beforeunload', handleBeforeUnload);

// FOR PAGE TO STAY ON RELOAD, I NEED TO KEEP TRACK OF THE CURRENT VIEW IN MY DATA MODEL ABOVE, AND SET THAT IN MY BEFOREUNLOAD FUNCTION UNDER DATA.ARTISTS = []
