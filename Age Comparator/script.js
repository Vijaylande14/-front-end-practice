function compareAges() {
  const date1 = document.getElementById('birthdate1').value;
  const date2 = document.getElementById('birthdate2').value;
  const result = document.getElementById('result');

  if (!date1 || !date2) {
    result.innerHTML = "<span class='highlight'>Please enter both birthdates.</span>";
    return;
  }

  const b1 = new Date(date1);
  const b2 = new Date(date2);

  if (b1.getTime() === b2.getTime()) {
    result.innerHTML = "<span class='highlight'>Both persons are of the same age.</span>";
    return;
  }

  let older, younger, olderLabel, youngerLabel;

  if (b1 < b2) {
    older = b1;
    younger = b2;
    olderLabel = "Person 1";
    youngerLabel = "Person 2";
  } else {
    older = b2;
    younger = b1;
    olderLabel = "Person 2";
    youngerLabel = "Person 1";
  }

  let y = younger.getFullYear() - older.getFullYear();
  let m = younger.getMonth() - older.getMonth();
  let d = younger.getDate() - older.getDate();

  if (d < 0) {
    m--;
    d += new Date(younger.getFullYear(), younger.getMonth(), 0).getDate();
  }

  if (m < 0) {
    y--;
    m += 12;
  }

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((younger - older) / msPerDay);

  result.innerHTML = `
    🧓 <span class='highlight'>${olderLabel}</span> is older (Born on: <b>${older.toDateString()}</b>)<br>
    👶 <span class='highlight'>${youngerLabel}</span> is younger (Born on: <b>${younger.toDateString()}</b>)<br><br>
    🕓 Age Difference: <b>${y} year(s), ${m} month(s), ${d} day(s)</b><br>
    📅 Total Difference: <b>${diffDays} days</b>
  `;
}
