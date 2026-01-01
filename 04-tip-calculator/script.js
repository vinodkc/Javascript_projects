const billAmount = document.getElementById('billAmount');
const tipPercentage = document.getElementById('tipPercentage');
const numberOfPeople = document.getElementById('numberOfPeople');
const tipAmount = document.getElementById('tipAmount');
const totalAmount = document.getElementById('totalAmount');
const perPersonAmount = document.getElementById('perPersonAmount');
const resetBtn = document.getElementById('resetBtn');
const tipButtons = document.querySelectorAll('.tip-btn');

function formatCurrency(amount) {
    return `$${amount.toFixed(2)}`;
}

function calculateTip() {
    const bill = parseFloat(billAmount.value) || 0;
    const tipPercent = parseFloat(tipPercentage.value) || 0;
    const people = parseInt(numberOfPeople.value) || 1;
    
    const tip = bill * (tipPercent / 100);
    const total = bill + tip;
    const perPerson = total / people;
    
    tipAmount.textContent = formatCurrency(tip);
    totalAmount.textContent = formatCurrency(total);
    perPersonAmount.textContent = formatCurrency(perPerson);
}

function setTipPercentage(percent) {
    tipPercentage.value = percent;
    
    tipButtons.forEach(btn => {
        if (btn.dataset.tip === percent.toString()) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    calculateTip();
}

function resetCalculator() {
    billAmount.value = '';
    tipPercentage.value = '15';
    numberOfPeople.value = '1';
    
    tipButtons.forEach(btn => {
        if (btn.dataset.tip === '15') {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    calculateTip();
}

billAmount.addEventListener('input', calculateTip);
tipPercentage.addEventListener('input', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
    calculateTip();
});
numberOfPeople.addEventListener('input', calculateTip);

tipButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const percent = btn.dataset.tip;
        setTipPercentage(percent);
    });
});

resetBtn.addEventListener('click', resetCalculator);

calculateTip();

