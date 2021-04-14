const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');

const songs = ['hey', 'summer', 'ukulele'];

const songIndex = 2;

/* update song details cover image and sorse of image & audio */

function loadSong (songs) {
	cover.src = `images/${songs}.jpg`;
	audio.src = `music/${songs}.mp3`;
	title.innerText = songs;
}

function playSong () {
	musicContainer.classList.add('play');
	playBtn.querySelector('i.fas').classList.remove('fa-play');
	playBtn.querySelector('i.fas').classList.add('fa-pause');
	audio.play();
}

function pauseSong () {
	musicContainer.classList.remove('play');
	playBtn.querySelector('i.fas').classList.add('fa-play');
	playBtn.querySelector('i.fas').classList.remove('fa-pause');
	audio.pause();
}

/******************************/
loadSong (songs[songIndex]);

playBtn.addEventListener('click' , () => {

const isplaying = musicContainer.classList.contains('play');



if(isplaying) {
	pauseSong ();
}else {
	playSong ();
}

});