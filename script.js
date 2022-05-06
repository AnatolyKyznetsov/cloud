$('.js-customSelect').select2({
    minimumResultsForSearch: Infinity,
    dropdownParent: $('.js-customSelect').next(),
});

const saleSlider = new Swiper('.js-saleSlider', {
    loop: true,
    autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true,
        stopOnLastSlide: true,
        disableOnInteraction: false,
    },
    slidesPerView: 'auto',
});

const casesSliders = document.querySelectorAll('.js-casesSlider')

casesSliders.forEach(item => {
    new Swiper(item, {
        slidesPerView: 4,
        slidesPerGroup: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
});

const faqSlider = new Swiper('.js-faqSlider', {
    slidesPerView: 5,
    slidesPerGroup: 1,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

let player;
function initVideo() {
    player = videojs('my-video', {}, function onPlayerReady() {
        let timer,
            lastTime = localStorage.getItem('lasttime');

        if (lastTime) {
            this.currentTime(lastTime);
        }

        this.on('play', function() {
            const videoName = document.querySelector('.js-videoName');

            if (videoName) {
                videoName.classList.add('is-hidden');
            }

            timer = setInterval(() => {
                localStorage.setItem('lasttime', Math.floor(player.currentTime()));
            }, 1000);
        });

        this.on('seeked', function() {
            localStorage.setItem('lasttime', Math.floor(player.currentTime()));
        });

        this.on('pause', function() {
            clearInterval(timer);
        });
    });
}

const faqSlides = document.querySelectorAll('.js-faqSlide');
const videoBlock = document.querySelector('.js-video');

faqSlides.forEach(slide => {
    slide.addEventListener('click', () => {
        faqSlides.forEach(elem => {
            elem.classList.remove('is-active');
        });

        slide.classList.add('is-active');

        if (localStorage.getItem('lasttime')) {
            localStorage.removeItem('lasttime');
        }

        let video = document.createElement('video'),
            source = document.createElement('source'),
            name = document.querySelector('.js-videoName');

        source.setAttribute('src', slide.dataset.source);
        source.setAttribute('type', slide.dataset.type);

        video.id = 'my-video';
        video.classList.add('video-js');
        video.classList.add('faq__video');
        video.setAttribute('controls', true);
        video.setAttribute('preload', 'auto');
        video.setAttribute('width', '1160');
        video.setAttribute('height', '578');
        video.setAttribute('poster', slide.dataset.poster);
        video.dataset.setup = '{}';

        video.append(source);

        name.textContent = slide.textContent;
        name.classList.remove('is-hidden');

        videoBlock.innerHTML = '';
        videoBlock.append(video);

        player.dispose();
        initVideo();
    });
});
initVideo();

const tabs = document.querySelectorAll('.js-tabs');

tabs.forEach(item => {
    let tab = item.querySelectorAll('.js-tab');

    tab.forEach(block => {
        block.addEventListener('click', () => {
            tab.forEach(elem => {
                elem.classList.remove('is-active');
            });

            block.classList.add('is-active');
        });
    });
});

// let data = {
//     labels: ['1 год', '2 года', '3 года', '4 года', '5 лет'],
//     series: [
//         [125, 150, 175, 180, 350],
//         [50, 80, 100, 125, 150]
//     ]
// };

// let options = {
//     axisX: {
//         showGrid: false,
//         offset: 60,
//     },
//     axisY: {
//         offset: 40,

//         labelInterpolationFnc: function(value) {
//             return value + 'K';
//         }
//     }
// };

// new Chartist.Line('.ct-chart', data, options);