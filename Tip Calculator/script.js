function calculateTip() {
    const bill = parseFloat(document.getElementById('bill').value);
    const tipPercent = parseFloat(document.getElementById('tip').value);
    const people = parseInt(document.getElementById('people').value);
  
    if (isNaN(bill) || isNaN(tipPercent) || isNaN(people) || people <= 0) {
      alert("Please enter valid values!");
      return;
    }
  
    const tipTotal = (bill * tipPercent) / 100;
    const total = bill + tipTotal;
  
    const tipPerPerson = tipTotal / people;
    const totalPerPerson = total / people;
  
    document.getElementById('tip-per-person').textContent = tipPerPerson.toFixed(2);
    document.getElementById('total-per-person').textContent = totalPerPerson.toFixed(2);
  }
  