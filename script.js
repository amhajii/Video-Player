const $ = document;

const Input = $.getElementById('fileInput');
const video = $.getElementById('videoPlayer');
const speedLbl = $.getElementById('speedDisplay');
const speedLable = $.getElementById('currentSpeed');
const controllsBox = $.getElementById('controller-section');
const playBtn = $.getElementById('playPause');
const timeLine = $.getElementById('seek');
const currentTime = $.getElementById('currentTime');
const duration = $.getElementById('duration');
const volume = $.getElementById('volume');
const fullscreen = $.getElementById('fullscreen');
const playPauseIcon = $.getElementById('play-pause-icon');


speedLable.textContent = `${video.playbackRate.toFixed(2)} x`;



function Fullscreen() {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        video.parentElement.requestFullscreen();
    }

}
function PlayPause() {
    if (video.paused) {
        video.play();
        playBtn.textContent = '⏸️';
        playPauseIcon.className = 'fa fa-pause';

    } else {
        video.pause();
        playBtn.textContent = '▶️';
        playPauseIcon.className = 'fa fa-play';
    }
}
function IncreaseSpeed() {
    if (video.playbackRate < 8) {
        video.playbackRate = Math.min(video.playbackRate + 0.25, 8);
        speedLbl.textContent = `Speed : ${video.playbackRate.toFixed(2)} x`;
    }

    speedLable.textContent = `${video.playbackRate.toFixed(2)} x`;
}
function DecreaseSpeed() {
    if (video.playbackRate <= 8) {
        // video.playbackRate = video.playbackRate - 0.25;
        video.playbackRate = Math.max(video.playbackRate - 0.25, 0.25);
        speedLbl.textContent = `Speed : ${video.playbackRate.toFixed(2)} x`;
    }

    speedLable.textContent = `${video.playbackRate.toFixed(2)} x`;

}






playBtn.addEventListener('click', () => {
    PlayPause();
});
timeLine.addEventListener('input', () => {
    video.currentTime = timeLine.value;
});
volume.addEventListener('input', () => {
    video.volume = volume.value;
});
fullscreen.addEventListener('click', () => {
    Fullscreen();
});

video.addEventListener('timeupdate', () => {
    timeLine.value = video.currentTime;
    currentTime.textContent = formatTime(video.currentTime);
});

video.addEventListener('click', () => {
    PlayPause();
});

video.addEventListener('dblclick', () => {
    Fullscreen();
});
video.addEventListener('loadedmetadata', () => {
    timeLine.max = video.duration;
    duration.textContent = formatTime(video.duration);
});

playPauseIcon.addEventListener('click', () => {
    PlayPause();
});

video.addEventListener('mousemove', showControls);

function showControls() {
    controllsBox.classList.add('show');
    hideControlsTimeout = setTimeout(() => {
        controllsBox.classList.remove("show");
    }, 6000);
}



function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${min}:${sec}`;
}






// Open video
Input.addEventListener('change', function () {

    const file = Input.files[0];
    if (file) {

        const videoURL = URL.createObjectURL(file);
        video.src = videoURL;
        video.load();
        video.play();
        // alert(video.src)
        video.controls = false;
    }

});


let speed = 1;
let originalSpeed = video.playbackRate;
let currentVolume = video.volume;
// ShortCuts
document.addEventListener('keydown', function (event) {

    switch (event.key) {

        case ' ': // Space => Play / Pause
            event.preventDefault(); // جلوگیری از اسکرول

            if (event.repeat) {

                originalSpeed = (video.playbackRate == 2) ? originalSpeed : video.playbackRate;
                video.playbackRate = 2;
                speedLbl.textContent = `Speed : ${video.playbackRate.toFixed(2)} x`;


            } else {

                // PlayPause();

            }





            break;


        case 'ArrowRight': // → جلو رفتن 5 ثانیه
            video.currentTime += 10;
            break;
        case 'ArrowLeft': // ← عقب رفتن 5 ثانیه
            video.currentTime -= 10;
            break;

        case 'm': // بی‌صدا / با صدا
            video.muted = !video.muted;

            if (video.muted) {
                currentVolume = video.volume;
                volume.value = 0;

            } else {
                volume.value = currentVolume;
            }


            break;

        case 'ArrowUp': // ↑ افزایش صدا
            video.volume = Math.min(video.volume + 0.1, 1);
            volume.value = video.volume;
            break;
        case 'ArrowDown': // ↓ کاهش صدا
            video.volume = Math.max(video.volume - 0.1, 0);
            volume.value = video.volume;
            break;


        case 'f': // تمام‌صفحه
            Fullscreen();
            break;


        case 'c':
            IncreaseSpeed()
            break;


        case 'Enter':
            // alert("iiii")
            PlayPause();
            break;

        case 'x':
            DecreaseSpeed()
            break;



    }

});
document.addEventListener('keyup', (event) => {

    if (event.key === ' ') {
        event.preventDefault();
        video.playbackRate = originalSpeed;

    }

    speedLbl.textContent = `Speed : ${video.playbackRate.toFixed(2)} x`;


});


function updateSliderStyle(value) {
    timeLine.style.background = `linear-gradient(to right,rgb(164, 11, 36) 0%,rgb(63, 7, 186) ${value}%, #ddd ${value}%, #ddd 100%) `;
}

video.addEventListener("timeupdate", () => {
    const percent = (video.currentTime / video.duration) * 100;
    timeline.value = percent;
    updateSliderStyle(percent);
});

video.addEventListener("loadedmetadata", () => {
    timeline.value = 0;
    updateSliderStyle(0);
});


timeline.addEventListener("input", () => {
    const newTime = (timeline.value / 100) * video.duration;
    video.currentTime = newTime;
    updateSliderStyle(timeline.value);
});

