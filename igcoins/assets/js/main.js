document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const image = body.querySelector('#coin');
    const h1 = body.querySelector('h1');
    const totalElement = body.querySelector('#total');
    const powerElement = body.querySelector('#power');
    const progressElement = body.querySelector('.progress');

    let coins = localStorage.getItem('coins');
    let total = localStorage.getItem('total');
    let power = localStorage.getItem('power');
    let count = localStorage.getItem('count');

    if (!h1 || !totalElement || !powerElement || !progressElement) {
        console.error('Required DOM elements not found!');
        return;
    }

    if (coins == null) {
        localStorage.setItem('coins', '0');
        h1.textContent = '0';
    } else {
        h1.textContent = Number(coins).toLocaleString();
    }

    if (total == null) {
        localStorage.setItem('total', '500');
        totalElement.textContent = '/500';
        total = '500';
    } else {
        totalElement.textContent = `/${total}`;
    }

    if (power == null) {
        localStorage.setItem('power', '500');
        powerElement.textContent = '500';
        power = '500';
    } else {
        powerElement.textContent = power;
    }

    if (count == null) {
        localStorage.setItem('count', '1');
        count = '1';
    }

    image.addEventListener('click', (e) => {
        let x = e.offsetX;
        let y = e.offsetY;

        navigator.vibrate(5);

        coins = localStorage.getItem('coins');
        power = localStorage.getItem('power');

        if (Number(power) > 0) {
            localStorage.setItem('coins', `${Number(coins) + 1}`);
            h1.textContent = `${(Number(coins) + 1).toLocaleString()}`;

            localStorage.setItem('power', `${Number(power) - 1}`);
            powerElement.textContent = `${Number(power) - 1}`;
        }

        if (x < 150 && y < 150) {
            image.style.transform = 'translate(-0.25rem, -0.25rem) skewY(-10deg) skewX(5deg)';
        } else if (x < 150 && y > 150) {
            image.style.transform = 'translate(-0.25rem, 0.25rem) skewY(-10deg) skewX(5deg)';
        } else if (x > 150 && y > 150) {
            image.style.transform = 'translate(0.25rem, 0.25rem) skewY(10deg) skewX(-5deg)';
        } else if (x > 150 && y < 150) {
            image.style.transform = 'translate(0.25rem, -0.25rem) skewY(10deg) skewX(-5deg)';
        }

        setTimeout(() => {
            image.style.transform = 'translate(0px, 0px)';
        }, 100);

        progressElement.style.width = `${(100 * Number(power)) / Number(total)}%`;
    });

    setInterval(() => {
        count = localStorage.getItem('count');
        power = localStorage.getItem('power');

        if (Number(total) > Number(power)) {
            localStorage.setItem('power', `${Number(power) + Number(count)}`);
            powerElement.textContent = `${Number(power) + Number(count)}`;
            progressElement.style.width = `${(100 * Number(power)) / Number(total)}%`;
        }
    }, 1000);
});
