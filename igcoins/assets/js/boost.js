const body = document.body;
const today = new Date().toISOString().split('T')[0];

let coins = Number(localStorage.getItem('coins')) || 0;
const lastClaimDate = localStorage.getItem('lastClaimDate');

// Safely get the #balance element
const balanceElement = body.querySelector('#balance');
if (balanceElement) {
    balanceElement.textContent = coins.toLocaleString();
} else {
    console.error('Balance element not found!');
}

const turbo = body.querySelector('#turbo');
const charge = body.querySelector('#charge');

function canClaimReward() {
    console.log('Last claim date:', lastClaimDate);
    console.log('Today:', today);
    return lastClaimDate !== today;
}

// Turbo click event
if (turbo) {
    turbo.addEventListener('click', () => {
        if (canClaimReward()) {
            coins += 1;
            localStorage.setItem('coins', coins);
            if (balanceElement) balanceElement.textContent = coins.toLocaleString();
            localStorage.setItem('lastClaimDate', today);

            // Temporarily set count to 0 and reset it after 5 seconds
            localStorage.setItem('count', '0');
            setTimeout(() => {
                localStorage.setItem('count', '1');
            }, 5000);
        } else {
            alert('You can only claim this reward once a day.');
        }
    });
} else {
    console.error('Turbo button not found!');
}

// Charge click event
if (charge) {
    charge.addEventListener('click', () => {
        if (canClaimReward()) {
            coins += 3;
            localStorage.setItem('coins', coins);
            if (balanceElement) balanceElement.textContent = coins.toLocaleString();
            localStorage.setItem('lastClaimDate', today);

            let total = Number(localStorage.getItem('total')) || 0;
            localStorage.setItem('power', total);
        } else {
            alert('You can only claim this reward once a day.');
        }
    });
} else {
    console.error('Charge button not found!');
}
