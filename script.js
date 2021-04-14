const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');

const songs = ['hey', 'summer', 'ukulele','Imagine Dragons  - Believer','Frog-Series'];

let songIndex = 2;

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

function nextSong () {

	songIndex ++;
	if ( (songs.length - 1) < songIndex ){ 
		songIndex = 0;}

	loadSong(songs[songIndex]);

	playSong();

};

function prevSong () {
	songIndex --;
	if ( songIndex < 0 ){ 
		songIndex = songs.length - 1;}

	loadSong(songs[songIndex]);

	playSong();
}

function updateProgress (e){
	const {duration , currentTime} = e.srcElement;
	const progressPresent = (currentTime / duration) *100; 
	progress.style.width = `${progressPresent}%`;
}

function setProgress(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;	
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

nextBtn.addEventListener('click' , nextSong);
prevBtn.addEventListener('click' , prevSong);

audio.addEventListener('timeupdate',updateProgress);

progressContainer.addEventListener('click', setProgress);