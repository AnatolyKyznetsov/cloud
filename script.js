const customSelect = () => {
    $('.js-customSelect').select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: $('.js-customSelect').next(),
    });
}

const saleSliderInit = () => {
    let saleSlider = new Swiper('.js-saleSlider', {
        loop: false,
        autoplay: false,
        breakpoints: {
            576: {
                loop: true,
                autoplay: {
                    delay: 3000,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: true,
                    disableOnInteraction: false,
                },
            },
        },
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.js-saleScrollNext',
            prevEl: '.js-saleScrollPrev',
        },
    });
}

const casesSlidersInit = () => {
    let casesSliders = document.querySelectorAll('.js-casesSlider');

    casesSliders.forEach(item => {
        let next = item.parentNode.querySelector('.js-casesScrollNext'),
            prev = item.parentNode.querySelector('.js-casesScrollPrev');

        let slider = new Swiper(item, {
            slidesPerGroup: 1,
            spaceBetween: 30,
            slidesPerView: 1,
            breakpoints: {
                576: {
                    slidesPerView: 2,
                },
                992: {
                    slidesPerView: 3,
                },
                1200: {
                    slidesPerView: 4,
                },
            }
        });

        next.addEventListener('click', () => {
            slider.slideNext();
        });

        prev.addEventListener('click', () => {
            slider.slidePrev();
        });

        slider.on('slideChange', (e) => {
            if (slider.isBeginning) {
                next.classList.remove('is-disabled');
                prev.classList.add('is-disabled');
            } else if (slider.isEnd) {
                next.classList.add('is-disabled');
                prev.classList.remove('is-disabled');
            } else {
                next.classList.remove('is-disabled');
                prev.classList.remove('is-disabled');
            }
        });
    });
}

const tabsInit = () => {
    let tabs = document.querySelectorAll('.js-tabs');

    tabs.forEach(block => {
        let tab = block.querySelectorAll('.js-tab');

        tab.forEach(item => {
            item.addEventListener('click', () => {
                let name = item.dataset.name,
                    content = block.querySelectorAll('.js-tabsContent');

                content.forEach(elem => {
                    elem.classList.add('is-hidden');

                    if (elem.dataset.name == name) {
                        elem.classList.remove('is-hidden');
                    }
                });

                tab.forEach(elem => {
                    elem.classList.remove('is-active');
                });

                item.classList.add('is-active');
            });
        })
    });
}

const faqSliderInit = () => {
    let faqSlider = new Swiper('.js-faqSlider', {
        slidesPerView: 'auto',
        slidesPerGroup: 1,
        spaceBetween: 20,
        breakpoints: {
            992: {
                slidesPerView: 4,
            },
            1200: {
                slidesPerView: 5,
            },
        },
        navigation: {
            nextEl: '.js-faqScrollNext',
            prevEl: '.js-faqScrollPrev',
        },
    });
}

const initPlayers = () => {
    let faqSlides = document.querySelectorAll('.js-faqSlide'),
        videoBlock = document.querySelector('.js-video'),
        player;

    if (!videoBlock) {
        return false;
    }

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
            video.dataset.setup = '{}';

            if (slide.dataset.poster) {
                video.setAttribute('poster', slide.dataset.poster);
            }

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
}

const initModal = () => {
    const openModal = document.querySelectorAll('.js-openModal');

    openModal.forEach(item => {
        item.addEventListener('click', () => {
            let name = item.dataset.name,
                block = document.querySelector(`.js-modal[data-name="${name}"]`);

            if (block) {
                setTimeout(() => {
                    block.classList.add('is-active');
                }, 100);

                block.classList.add('is-visible');
            }
        });
    });

    document.addEventListener('click', e => {
        if (!e.target.closest('.js-modal') &&
            !e.target.classList.contains('js-openModal')) {
            let blocks = document.querySelectorAll('.js-modal');

            blocks.forEach(block => {
                setTimeout(() => {
                    block.classList.remove('is-visible');
                }, 100);

                block.classList.remove('is-active');
            });
        }
    });
}

const burgerInit = () => {
    let burger = document.querySelector('.js-burger'),
        nav = document.querySelector('.js-nav');

    burger.addEventListener('click', () => {
        if (!burger.classList.contains('is-active')) {
            setTimeout(() => {
                nav.classList.add('is-active');
            }, 100);

            nav.classList.add('is-visible');
            burger.classList.add('is-active');
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            setTimeout(() => {
                nav.classList.remove('is-active');
            }, 100);

            nav.classList.remove('is-visible');
            burger.classList.remove('is-active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    });
}

const scroll = (elem, indent, duration) => {
    indent = typeof indent == 'number' ? indent : 0;
    duration = typeof duration == 'number' ? duration : 800;

    let startPos = document.documentElement.scrollTop || document.body.scrollTop,
        finishPos = elem ? elem.getBoundingClientRect().top + pageYOffset - indent : 0,
        diffPos = finishPos - startPos,
        startTime = new Date().getTime(),
        finishTime = startTime + duration;

    let anim = setInterval( () => {
        let currentTime = new Date().getTime(),
            newPos;

        if (currentTime >= finishTime) {
            newPos = finishPos;
            clearInterval(anim);
        } else {
            let diffTime = finishTime - currentTime,
                diffPrc =  diffTime / duration;
            newPos = finishPos - (diffPos * diffPrc);
        }

        window.scrollTo(0, newPos);
    },10);
}

const anchorsInit = () => {
    let anchors = document.querySelectorAll('.js-anchor');

    anchors.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();

            let elem = document.querySelector(item.hash),
                burger = document.querySelector('.js-burger'),
                nav = document.querySelector('.js-nav');

            nav.classList.remove('is-visible');
            burger.classList.remove('is-active');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            if (!elem) {
                location.href = `/${item.hash}`
            }

            scroll(elem);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    customSelect();
    saleSliderInit();
    casesSlidersInit();
    tabsInit();
    faqSliderInit();
    initPlayers();
    initModal();
    burgerInit();
    anchorsInit();
});

