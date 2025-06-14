const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/1.mp3',
        displayName: 'Kita Usahakan Lagi',
        cover: 'assets/1.jpg',
        artist: 'Batas Senja',
    },
    {
        path: 'assets/2.mp3',
        displayName: 'Laskar Pelangi',
        cover: 'assets/2.jpg',
        artist: 'Nidji',
    },
    {
        path: 'assets/3.mp3',
        displayName: 'Nina',
        cover: 'assets/3.jpg',
        artist: 'Feast',
    },
    {
        path: 'assets/4.mp3',
        displayName: 'Rumah ke Rumah',
        cover: 'assets/4.jpg',
        artist: 'Hindia',
    },
    {
        path: 'assets/5.mp3',
        displayName: 'Evaluasi',
        cover: 'assets/5.jpg',
        artist: 'Hindia',
    },
    {
        path: 'assets/6.mp3',
        displayName: 'Hitam dan Putih',
        cover: 'assets/6.jpg',
        artist: 'Fourtwnty',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function  playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function  pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(songs) {
    music.src = songs.path;
    title.textContent = songs.displayName;
    artist.textContent = songs.artist;
    image.src = songs.cover;
    background.src = songs.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;

} 

function setProgressBar (e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);