const video = document.querySelector('.viewer');
const toggleButton = document.querySelector('.toggle');
const skipButtons = document.querySelectorAll('.player__button');


console.log();


// fuctions

playVideo = () => {
    if(video.paused) {
        video.play();
        toggleButton.textContent = '❚❚';
    } else {
        video.pause();
        toggleButton.textContent = '►';
    }
    console.log('play');
} 

function skip () {
    video.currentTime = video.currentTime + parseFloat(this.dataset.skip);
}





// behaviour

video.addEventListener('click', playVideo);
toggleButton.addEventListener('click', playVideo);
skipButtons.forEach(skipButton => skipButton.addEventListener ('click', skip));
