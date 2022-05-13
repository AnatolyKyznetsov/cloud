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
            }

            if (slider.isEnd) {
                next.classList.add('is-disabled');
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

const initCharts = () => {
    let data = {
        labels: ['1 год', '2 года', '3 года', '4 года', '5 лет'],
        series: [
            [125, 150, 175, 180, 350],
            [50, 80, 100, 125, 150]
        ]
    };

    let options = {
        axisX: {
            showGrid: false,
            offset: 60,
        },
        axisY: {
            offset: 40,

            labelInterpolationFnc: function(value) {
                return value + 'K';
            }
        }
    };

    new Chartist.Line('.js-comparisonChart', data, options);
}

const comparisonCalcInit = () => {
    let calc = document.querySelector('.js-comparisonCalc');

    if (!calc) {
        return false;
    }

    let calculatorCounters = calc.querySelectorAll('.js-calculatorCounter'),
        comparisonCalcResult = calc.parentNode.querySelector('.js-comparisonCalcResult'),
        preloader = calc.parentNode.querySelector('.preloader'),
        calcReset = comparisonCalcResult.querySelector('.js-calcReset');

    calculatorCounters.forEach(item => {
        let plus = item.querySelector('.js-calculatorCounterPluse'),
            minus = item.querySelector('.js-calculatorCounterMinus'),
            input = item.querySelector('input');

        input.addEventListener('input', () => {
            input.value = input.value == 0 ? 1 : input.value;
            input.value = input.value.replace(/[^\d]/g,'');
        });

        plus.addEventListener('click', () => {
            input.value++;
        });

        minus.addEventListener('click', () => {
            input.value = input.value - 1 <= 1 ? 1 : input.value - 1;
        });
    });

    $('.js-resolutionRange').ionRangeSlider({
        skin: 'round',
        grid: true,
        hide_min_max: true,
        values: ['2Мп', '4Мп', '5Мп', '6Мп', '8Мп', '12Мп'],
        onFinish: e => {
            $('.js-resolutionRange').parent().find('input').val(e.from_value);
        }
    });

    $('.js-qualityRange').ionRangeSlider({
        skin: 'round',
        grid: true,
        hide_min_max: true,
        values: ['Низкое', 'Среднее', 'Высокое'],
        onFinish: e => {
            $('.js-qualityRange').parent().find('input').val(e.from_value);
        }
    });

    let calculatorArchive = calc.querySelector('.js-calculatorArchive'),
        calculatorArchiveValue = calculatorArchive.parentNode.querySelector('input'),
        calculatorArchiveItems = calculatorArchive.querySelectorAll('.js-calculatorArchiveItem');

    calculatorArchiveItems.forEach(item => {
        item.addEventListener('click', () => {
            calculatorArchiveItems.forEach(elem => {
                elem.classList.remove('is-active');
            });

            item.classList.add('is-active');
            calculatorArchiveValue.value = item.textContent.trim();
        });
    });

    $('.js-calcSelect').select2({
        minimumResultsForSearch: Infinity,
    });

    let calculatorSubmit = calc.querySelector('.js-calculatorSubmit');

    calculatorSubmit.addEventListener('click', () => {

        let data = {
            resolution: calc.querySelector('[data-calc="resolution"]').value,
            quality: calc.querySelector('[data-calc="quality"]').value,
            archive: calc.querySelector('[data-calc="archive"]').value,
            object_type: calc.querySelector('[data-calc="object_type"]').value,
            objects_amount: calc.querySelector('[data-calc="objects_amount"]').value,
            cameras_per_object: calc.querySelector('[data-calc="cameras_per_object"]').value,
        };

        console.log(data);

        preloader.classList.remove('is-hidden');

        setTimeout(() => {
            calc.classList.add('is-hidden');
            comparisonCalcResult.classList.remove('is-hidden');
            initCharts();
        }, 500);

        setTimeout(() => {
            preloader.classList.add('is-hidden');
        }, 1000);
    });

    calcReset.addEventListener('click', () => {
        calc.classList.remove('is-hidden');
        comparisonCalcResult.classList.add('is-hidden');
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
    duration = typeof duration == 'number' ? duration : 400;

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
    comparisonCalcInit();
    anchorsInit();
});

