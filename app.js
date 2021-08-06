// UI Values
const background = document.querySelector('#background');
const thumbnail = document.querySelector('#thumbnail');
const song = document.querySelector('#song');
const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const progressBar = document.querySelector('#progress-bar');
let currentTime = document.querySelector('.currentTime');
let durationTime = document.querySelector('.durationTime');
let pPause = document.querySelector('#play-pause');
let afterSong = document.querySelector('#next-song');
let beforeSong = document.querySelector('#previous-song');
let againSong = document.querySelector('#repeat-song')

songIndex = 0;
songTitles = ['کجایی دادا', 'ماها بیگدار'];
songArtists = ['شایع', 'خلوت'];
songs = ['kojaeiDada.mp3', 'mahaBigodar.mp3'];
thumbnails = ['kojaeidada.jpg', 'mahabigodar.jpg'];

// Add events in once function
loadEventListeners();

function loadEventListeners() {
    pPause.addEventListener('click', playPause);
    afterSong.addEventListener('click', nextSong);
    beforeSong.addEventListener('click', previousSong);
    againSong.addEventListener('click', repeatSong);
}

// Flag
let playing = true;

// Make music player to play and pause
function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
            thumbnail = document.querySelector('#thumbnail');

        pPause.src = "pause.svg";
        thumbnail.style.transform = "scale(1.25)";

        song.play();
        playing = false;
    } else {
        pPause.src = "play.svg";
        thumbnail.style.transform = "scale(1)";

        song.pause();
        playing = true;
    }
}

// Make music player to play next song
song.addEventListener('ended', () => {
    nextSong();
});

function nextSong() {
    songIndex++;
    if (songIndex > 1) {
        songIndex = 0;
    }
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// Make music player to play prevous song
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 1;
    }
    song.src = songs[songIndex];
    thumbnail.src = thumbnails[songIndex];
    background.src = thumbnails[songIndex];

    songArtist.innerHTML = songArtists[songIndex];
    songTitle.innerHTML = songTitles[songIndex];

    playing = true;
    playPause();
}

// Make music player to repeat song
function repeatSong() {
    if (playPause) {
        song.loop = true;
        alert('This music will be reapeated cause of you clicked it ...');
    } else {
        song.loop = false;
    }
}

// Make progressBar to be dynamic and equal with music timing
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    currentTime.innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (durationTime.innerHTML === 'NAN:NAN') {
        durationTime.innerHTML = '0:00';
    } else {
        durationTime.innerHTML = (formatTime(Math.floor(song.duration)));
    }
}

// Make the time of music from getting time of music
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// Update progressBar
setInterval(updateProgressValue, 500);

// The value of progressBar is equal with currentTime of music
function changeProgressBar() {
    song.currentTime = progressBar.value;
}

// If we click ENTER on keyboard , music will be play and if click ENTER again, music will be paused
document.onkeyup = function(e) {
    let keycode = (e === null) ? window.event.keyCode : e.which;
    if (keycode === 13) {
        playPause();
    }
    if (keycode === 39) {
        nextSong();
    }
    if (keycode === 37) {
        previousSong();
    }
}

// Decrease the sound of music with clicking on -
document.onkeypress = function(e) {
    let keycode = (e === null) ? window.event.keycode : e.which;
    if (keycode === 45) {
        song.volume = 0.2;
    }
}

// Increasing the sound of music with clicking on +
document.onkeypress = function(e) {
    let keycode = (e === null) ? window.event.keycode : e.which;
    if (keycode === 43) {
        song.volume = 0.7;
    }
}