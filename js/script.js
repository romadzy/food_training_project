import tabs from './modules/tabs';
import cards from './modules/cards';
import calc from './modules/calc';
import modal from './modules/modal';
import slider from './modules/slider';
import timer from './modules/timer';
import forms from './modules/forms';
import { openModal } from './modules/modal';


window.addEventListener('DOMContentLoaded', () => { 
    const modalTimerId = setInterval(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    cards();
    calc();
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-01-01');
    forms('form', modalTimerId);
    slider({
        slide: '.offer__slide',
        container: '.offer__slider',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner',
        current: '#current' 
    });


    console.log(document.querySelector('.tabcontainer').childNodes);
});