function slider( { container, slide, nextArrow, prevArrow, current, wrapper, field } ) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        next = document.querySelector(nextArrow),
        prev = document.querySelector(prevArrow),
        currentSlide = document.querySelector(current),
        slideWrapper = document.querySelector(wrapper),
        slideField = document.querySelector(field),
        width = window.getComputedStyle(slideWrapper).width;

    let slideIndex = 1,
        offset = 0;

    if (slides.length < 10) {
        currentSlide.textContent = `0${slideIndex}`;
    } else {
        currentSlide.textContent = slideIndex;
    }

    slideField.style.width = 100 * slides.length + '%';
    slideField.style.display = 'flex';
    slideField.style.transition = '0.5s all';
    slideWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    indicators.style.cssText = `
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 15;
            display: flex;
            justify-content: center;
            margin-right: 15%;
            margin-left: 15%;
            list-style: none;
        `;
    slider.append(indicators);

    let dots = [];

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        if (i == 0) {
            dot.style.opacity = 1;
        }

        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        if (slides.length < 10) {
            currentSlide.textContent = `0${slideIndex}`;
        } else {
            currentSlide.textContent = slideIndex;
        }

        changeOpacity(dots, slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
        }

        slideField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addZero(currentSlide, slideIndex);
        changeOpacity(dots, slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

            slideField.style.transform = `translateX(-${offset}px)`;

            addZero(currentSlide, slideIndex);
            changeOpacity(dots, slideIndex);
        });
    });

    function changeOpacity(elems, index) {
        elems.forEach(elem => elem.style.opacity = '.5');
        elems[index - 1].style.opacity = '1';
    }

    function addZero(elem, value) {
        if (value < 10) {
            elem.textContent = `0${value}`;
        } else {
            elem.textContent = value;
        }
    }

}

export default slider;