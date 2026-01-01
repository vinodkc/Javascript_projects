const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const unitBtns = document.querySelectorAll('.unit-btn');
const metricInputs = document.getElementById('metricInputs');
const imperialInputs = document.getElementById('imperialInputs');
const calculateBMIBtn = document.getElementById('calculateBMI');
const calculateAgeBtn = document.getElementById('calculateAge');
const bmiResult = document.getElementById('bmiResult');
const ageResult = document.getElementById('ageResult');

let currentUnit = 'metric';

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const targetTab = btn.dataset.tab;
        
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        tabContents.forEach(content => {
            if (content.id === targetTab) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});

unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentUnit = btn.dataset.unit;
        
        unitBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        if (currentUnit === 'metric') {
            metricInputs.classList.remove('hidden');
            imperialInputs.classList.add('hidden');
        } else {
            metricInputs.classList.add('hidden');
            imperialInputs.classList.remove('hidden');
        }
        
        bmiResult.classList.add('hidden');
    });
});

function calculateBMI() {
    let heightInMeters, weightInKg;
    
    if (currentUnit === 'metric') {
        const heightCm = parseFloat(document.getElementById('heightCm').value);
        weightInKg = parseFloat(document.getElementById('weightKg').value);
        
        if (!heightCm || !weightInKg || heightCm <= 0 || weightInKg <= 0) {
            alert('Please enter valid height and weight values!');
            return;
        }
        
        heightInMeters = heightCm / 100;
    } else {
        const heightFt = parseFloat(document.getElementById('heightFt').value) || 0;
        const heightIn = parseFloat(document.getElementById('heightIn').value) || 0;
        const weightLbs = parseFloat(document.getElementById('weightLbs').value);
        
        if (heightFt <= 0 || !weightLbs || weightLbs <= 0) {
            alert('Please enter valid height and weight values!');
            return;
        }
        
        const totalInches = (heightFt * 12) + heightIn;
        heightInMeters = totalInches * 0.0254;
        weightInKg = weightLbs * 0.453592;
    }
    
    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    displayBMIResult(bmi);
}

function displayBMIResult(bmi) {
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    const bmiDescription = document.getElementById('bmiDescription');
    
    bmiValue.textContent = bmi.toFixed(1);
    
    let category, description, activeBar;
    
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'Your BMI is below the normal range. Consider consulting a healthcare provider.';
        activeBar = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        description = 'Great! Your BMI is in the healthy range.';
        activeBar = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        description = 'Your BMI is above the normal range. Consider a balanced diet and exercise.';
        activeBar = 'overweight';
    } else {
        category = 'Obese';
        description = 'Your BMI indicates obesity. We recommend consulting a healthcare provider.';
        activeBar = 'obese';
    }
    
    bmiCategory.textContent = category;
    bmiDescription.textContent = description;
    
    document.querySelectorAll('.chart-bar').forEach(bar => {
        bar.classList.remove('active');
    });
    document.querySelector(`.chart-bar.${activeBar}`).classList.add('active');
    
    bmiResult.classList.remove('hidden');
}

function calculateAge() {
    const birthdateInput = document.getElementById('birthdate').value;
    
    if (!birthdateInput) {
        alert('Please enter your date of birth!');
        return;
    }
    
    const birthdate = new Date(birthdateInput);
    const today = new Date();
    
    if (birthdate > today) {
        alert('Birthdate cannot be in the future!');
        return;
    }
    
    let years = today.getFullYear() - birthdate.getFullYear();
    let months = today.getMonth() - birthdate.getMonth();
    let days = today.getDate() - birthdate.getDate();
    
    if (days < 0) {
        months--;
        const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    if (months < 0) {
        years--;
        months += 12;
    }
    
    const totalMonths = years * 12 + months;
    const totalDays = Math.floor((today - birthdate) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = totalDays * 24;
    
    const nextBirthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;
    document.getElementById('totalMonths').textContent = totalMonths.toLocaleString();
    document.getElementById('totalWeeks').textContent = totalWeeks.toLocaleString();
    document.getElementById('totalDays').textContent = totalDays.toLocaleString();
    document.getElementById('totalHours').textContent = totalHours.toLocaleString();
    document.getElementById('nextBirthday').textContent = `${daysUntilBirthday} days`;
    
    ageResult.classList.remove('hidden');
}

calculateBMIBtn.addEventListener('click', calculateBMI);
calculateAgeBtn.addEventListener('click', calculateAge);

document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            if (input.closest('#bmi')) {
                calculateBMI();
            }
        }
    });
});

document.getElementById('birthdate').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        calculateAge();
    }
});

