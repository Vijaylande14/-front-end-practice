function calculateTip() {
  // Get input values
  const billAmount = parseFloat(document.getElementById("bill").value);
  const tipPercentage = parseFloat(document.getElementById("tip").value);
  const numberOfPeople = parseInt(document.getElementById("people").value);

  // Validation checks for inputs
  if (isNaN(billAmount) || isNaN(tipPercentage) || isNaN(numberOfPeople) || billAmount <= 0 || tipPercentage <= 0 || numberOfPeople <= 0) {
    alert("Please enter valid values for all fields.");
    return;
  }

  // Calculate the tip and total
  const totalTip = (billAmount * tipPercentage) / 100;
  const tipPerPerson = (totalTip / numberOfPeople).toFixed(2);
  const totalPerPerson = ((billAmount + totalTip) / numberOfPeople).toFixed(2);

  // Display results
  document.getElementById("tip-per-person").textContent = tipPerPerson;
  document.getElementById("total-per-person").textContent = totalPerPerson;
}
