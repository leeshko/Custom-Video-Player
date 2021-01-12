const video = document.querySelector('.viewer');
const toggleButton = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('.player__button');
const ranges = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

const player = document.querySelector('.player');

// fuctions

playVideo = () => {
    if (video.paused) {
        video.play();
        toggleButton.textContent = '❚❚';
    } else {
        video.pause();
        toggleButton.textContent = '►';
    }
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

function rangeUpdate() {
    video[this.name] = this.value;
}

function progressUpdate() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreen () {
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) { /* Safari */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE11 */
        video.msRequestFullscreen();
      }
}

// behaviour

video.addEventListener('click', playVideo);
video.addEventListener('timeupdate', progressUpdate);
toggleButton.addEventListener('click', playVideo);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));

let isMouseDown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => isMouseDown && scrub(e));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);

video.addEventListener('dblclick', fullScreen);
