const video = document.querySelector('.viewer');
const toggleButton = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('.player__button');
const ranges = document.querySelectorAll('.player__slider');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');

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
    console.log(scrubTime);
}


// behaviour

video.addEventListener('click', playVideo);
video.addEventListener('timeupdate', progressUpdate);
toggleButton.addEventListener('click', playVideo);
skipButtons.forEach(skipButton => skipButton.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', rangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', rangeUpdate));

let mousedown = false;

progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

