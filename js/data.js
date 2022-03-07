/* exported data */
let data = {
  view: 'home-page',
  artists: [],
  likedArtists: [],
  nextArtistId: 1
};

const dataJSON = localStorage.getItem('artist-data');
if (dataJSON !== null) {
  data = JSON.parse(dataJSON);
}

const handleBeforeUnload = event => {
  data.artists = [];
  const dataJSON = JSON.stringify(data);
  localStorage.setItem('artist-data', dataJSON);
};

window.addEventListener('beforeunload', handleBeforeUnload);
