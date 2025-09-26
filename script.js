const songs = [
  {
    title: "Sorry",
    artist: "Justin Bieber",
    file: "songs/song1.mp3",
    image: "images/song1.png"
  },
  {
    title: "Sapphire",
    artist: "Ed Sheeran",
    file: "songs/song2.mp3",
    image: "images/song2.png"
  }
];

let currentSong = 0;
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("playBtn");
const playIcon = document.getElementById("playIcon");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const volumeSlider = document.getElementById("volume");

function loadSong(index) {
  currentSong = index;
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.file;
  document.getElementById("cover").src = song.image;  // update cover
  audio.load();
  playSong();
}


function playSong() {
  audio.play();
  playIcon.src = "images/pause.png";
}

function pauseSong() {
  audio.pause();
  playIcon.src = "images/play.png";
}

function togglePlay() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
}

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.style.width = percent + "%";

  const current = formatTime(audio.currentTime);
  const duration = formatTime(audio.duration);
  currentTimeEl.textContent = current;
  durationEl.textContent = duration;
});

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function setProgress(e) {
  const width = e.currentTarget.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

volumeSlider.addEventListener("input", () => {
  audio.volume = volumeSlider.value;
});

audio.addEventListener("ended", () => {
  nextSong(); // autoplay
});

loadSong(currentSong);