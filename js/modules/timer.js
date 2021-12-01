function timer(id, deadline) {
    function getRemainingTime(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor((t / (1000 * 60 * 60 * 24))),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / (1000 * 60) % 60)),
            seconds = Math.floor((t / 1000) % 60);

        return {
            days,
            hours,
            minutes,
            seconds
        };
    }

    function getZero(value) {
        if (value >= 0 && value < 10) {
            return `0${value}`;
        } else {
            return value;
        }
    }

    function setTimer(selector, endtime) {
        let timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds');

        updateTimer();

        let intervalId = setInterval(updateTimer, 1000);

        function updateTimer() {
            let t = getRemainingTime(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t <= 0) {
                clearInterval(intervalId);
            }
        }

    }

    setTimer(id, deadline);
}

export default timer;