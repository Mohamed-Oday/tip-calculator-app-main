const tipPerPerson = document.getElementById('tipPerPerson');
const totalPerPerson = document.getElementById('totalPerPerson');
const errorMessage = document.getElementById('errorMessage');
const peopleError = document.getElementById('peopleError');

document.getElementById('bill').addEventListener('input', calculate);
document.getElementById('idPeople').addEventListener('input', calculate);
document.getElementById('tip').addEventListener('input', function() {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    calculate();
});
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(){
        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.remove('active');
        });
        this.classList.add('active');
        calculate();
    }); 
});

function getBill(){
    const bill = document.getElementById('bill');
    let billValue = bill.value;
    let billNumber = parseFloat(billValue);
    if(isNaN(billNumber) || billNumber <= 0){
        errorMessage.classList.remove('hidden');
        return null;
    } else {
        errorMessage.classList.add('hidden');
        return billNumber;
    }
}

function getTip(){
    const activeBtn = document.querySelector('.btn.active');
    if (activeBtn){
        return parseFloat(activeBtn.innerText.replace('%', ''));
    } else {
        const tip = document.getElementById('tip');
        let tipValue = parseFloat(tip.value);
        return isNaN(tipValue) ? 0 : tipValue;
    }
}

function getPeople(){
    const people = document.getElementById('idPeople');
    let peopleValue = parseFloat(people.value);
    if (isNaN(peopleValue) || peopleValue <= 0){
        peopleError.classList.remove('hidden');
        return null;
    } else {
        peopleError.classList.add('hidden');
        return peopleValue;
    }
}

function calculate(){
    const bill = getBill();
    const tip = getTip();
    const people = getPeople();

    if (bill === null || people === null){
        tipPerPerson.textContent = '$0.00';
        totalPerPerson.textContent = '$0.00';
        return;
    }

    const tipAmount = bill * (tip / 100);
    const tipPerPersonValue = tipAmount / people;
    const total = bill + tipAmount;
    const totalPerPersonValue = total / people;

    tipPerPerson.textContent = '$' + tipPerPersonValue.toFixed(2);
    totalPerPerson.textContent = '$' + totalPerPersonValue.toFixed(2);
}

function getStart(){
    document.getElementById('tipPerPerson').textContent = '$0.00';
    document.getElementById('totalPerPerson').textContent = '$0.00';
}

document.getElementById('reset').addEventListener('click', function(){
    document.getElementById('bill').value = '';
    document.getElementById('idPeople').value = '';
    document.getElementById('tip').value = '';
    document.querySelectorAll('.btn.active').forEach(btn => btn.classList.remove('active'));
    errorMessage.classList.add('hidden');
    peopleError.classList.add('hidden');
    getStart();
});

getStart();
