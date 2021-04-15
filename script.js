const musicContainer = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const prevBtn = document.querySelector('#prev');
const cover = document.querySelector('#cover');
const audio = document.querySelector('#audio');
const progress = document.querySelector('.progress');
const progressContainer = document.querySelector('.progress-container');
const title = document.querySelector('#title');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');


const songs = ['hey', 'summer', 'ukulele','Believer','Frog-Series'];

let songIndex = 4;

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
	var duration = audio.duration;
	audio.currentTime = (clickX / width) * duration;	
}

function DurTime (e) {
	const {duration,currentTime} = e.srcElement;
	var sec;
	var sec_d;

	// define minutes currentTime
	let min = (currentTime==null)? 0:
	 Math.floor(currentTime/60);
	 min = min <10 ? '0'+min:min;

	// define seconds currentTime
	function get_sec (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec = Math.floor(x) - (60*i);
					sec = sec <10 ? '0'+sec:sec;
				}
			}
		}else{
		 	sec = Math.floor(x);
		 	sec = sec <10 ? '0'+sec:sec;
		 }
	} 

	get_sec (currentTime,sec);

	// change currentTime DOM
	currTime.innerHTML = min +':'+ sec;

	// define minutes duration
	let min_d = (isNaN(duration) === true)? '0':
		Math.floor(duration/60);
	 min_d = min_d <10 ? '0'+min_d:min_d;


	 function get_sec_d (x) {
		if(Math.floor(x) >= 60){
			
			for (var i = 1; i<=60; i++){
				if(Math.floor(x)>=(60*i) && Math.floor(x)<(60*(i+1))) {
					sec_d = Math.floor(x) - (60*i);
					sec_d = sec_d <10 ? '0'+sec_d:sec_d;
				}
			}
		}else{
		 	sec_d = (isNaN(duration) === true)? '0':
		 	Math.floor(x);
		 	sec_d = sec_d <10 ? '0'+sec_d:sec_d;
		 }
	} 

	// define seconds duration
	
	get_sec_d (duration);

	// change duration DOM
	durTime.innerHTML = min_d +':'+ sec_d;
		
};

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

audio.addEventListener('timeupdate',DurTime);

audio.addEventListener('ended',nextSong)
