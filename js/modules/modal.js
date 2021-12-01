function openModal(modalSelector, modalTimerId) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('show');
    modalWindow.classList.remove('hide');

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModal(modalSelector) {
    const modalWindow = document.querySelector(modalSelector);

    modalWindow.classList.add('hide');
    modalWindow.classList.remove('show');
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    let showModalBtns = document.querySelectorAll(triggerSelector),
        modalWindow = document.querySelector(modalSelector);

    showModalBtns.forEach(item => {
        item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });


    modalWindow.addEventListener('click', (e) => {
        if (e.target === modalWindow || e.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', e => {
        if (e.code === "Escape" && modalWindow.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showModalAtBottom() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalSelector);
            window.removeEventListener('scroll', showModalAtBottom);
        }
    }

    window.addEventListener('scroll', showModalAtBottom);
}

export default modal;
export {openModal};
export {closeModal};