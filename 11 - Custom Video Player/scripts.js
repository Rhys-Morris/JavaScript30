const playButton = document.querySelector('.player__button');
const video = document.querySelector('.player__video');
const progressDiv = document.querySelector('.progress')
const progressBar = document.querySelector('.progress__filled')
const player = document.querySelector('.player')
const sliders = document.querySelectorAll('.player__slider')

let videoFinished = false;
let scrubbingVideo = false;

const playVideo = () => {
    video.play();
    playButton.textContent = "❚❚";
}

const pauseVideo = () => {
    video.pause();
    playButton.textContent = "►";
}

const skipAhead = () => video.currentTime += 25;
const skipBack = () => video.currentTime -= 10;

const updateProgress = function() {
    progressBar.style.flexBasis = `${(video.currentTime / video.duration) * 100}%`
}

const updateProgressPosition = function(e) {
    if (videoFinished) {
        videoFinished = false;
        videoProgress = setInterval(updateProgress, 100)
    }
    const newPosition = (e.offsetX / e.target.closest('.progress').offsetWidth);
    video.currentTime = (video.duration * newPosition);
}


player.addEventListener('click', function(e) {
    if (e.target !== video && e.target !== playButton) return
    if (videoFinished) videoProgress = setInterval(updateProgress, 100);
    video.paused ? playVideo() : pauseVideo();
});

// Skip ahead listener
document.querySelector('[data-skip="25"]')
    .addEventListener('click', skipAhead);

// Skip back listener
document.querySelector('[data-skip="-10"]')
    .addEventListener('click', skipBack);

// Skip to spot on video
progressDiv.addEventListener('click', updateProgressPosition);
progressDiv.addEventListener('mousedown', () => scrubbingVideo = true)
progressDiv.addEventListener('mouseup', () => scrubbingVideo =  false)
progressDiv.addEventListener('mousemove', (e) => {
    if (scrubbingVideo) updateProgressPosition(e);
})

video.addEventListener('ended', () => {
    clearInterval(videoProgress);
    videoFinished = true;
    playButton.textContent = "►";
})

// Start progress
let videoProgress = setInterval(updateProgress, 100)

// Adjust volume and playback rate
sliders.forEach(slider => slider.addEventListener('change', function() {
    video[this.name] = this.value;
}))