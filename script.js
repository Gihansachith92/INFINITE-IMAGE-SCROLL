
const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let redy = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'hayELMyKA-SprczUe8o1Njl52ezfI6nSW3EGSjz9U7Q';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check all image loaded
function imageLoaded(){
  console.log('image loaded');
  imagesLoaded ++;
  if(imagesLoaded === totalImages){
    redy = true;
    loader.hidden = true;
    console.log('redy = ',redy);
  }
}


// create elements for links & photos add to DOM
function displayPhotos(){
  imagesLoaded = 0;
  totalImages = photosArray.length;
  console.log('total images = ', totalImages);
  photosArray.forEach((photo) => {
    // create link
    const item = document.createElement('a');
    item.setAttribute('href', photo.links.html);
    item.setAttribute('target','_blank');

    // create image
    const img = document.createElement('img');
    img.setAttribute('src',photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    // check when each is finished loading
    img.addEventListener('load',imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);

  });
}

// get photos from unsplash API
async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  }catch(error){
    // catch error here
  }
}



// check scrolling near bottom
window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && redy){
    redy = false;
    getPhotos();
    
  }
});

// on load

getPhotos();