function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const hoursString = String(hours).padStart(2, '0');
    const timeString = `${hoursString}:${minutes}:${seconds} ${ampm}`;

    document.getElementById('time').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock();  // Initial call to display clock immediately
