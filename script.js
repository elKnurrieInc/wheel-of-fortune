// Wheel of Fortune v2 - JavaScript

const prizes = [
    '🎉 PRIZE 1',
    '🎁 PRIZE 2', 
    '⭐ PRIZE 3',
    '🏆 PRIZE 4',
    '💫 PRIZE 5',
    '✨ PRIZE 6',
    '🎊 PRIZE 7',
    '🎯 PRIZE 8'
];

const segmentColors = [
    '#ff4757', // coral red
    '#ffa502', // orange
    '#2ed573', // green
    '#1e90ff', // blue
    '#ff4757', // coral red
    '#ffa502', // orange
    '#2ed573', // green
    '#1e90ff'  // blue
];

const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const wheelInner = wheel.querySelector('.wheel-inner');
let isSpinning = false;

// Create wheel segments
function createSegments() {
    const segmentAngle = 360 / prizes.length;
    
    prizes.forEach((prize, index) => {
        const segment = document.createElement('div');
        segment.className = 'segment';
        segment.style.backgroundColor = segmentColors[index];
        segment.style.transform = `rotate(${index * segmentAngle - 90}deg) skewY(-${90 - segmentAngle}deg)`;
        
        const text = document.createElement('span');
        text.className = 'segment-text';
        text.textContent = prize;
        text.style.transform = `skewY(${90 - segmentAngle}deg) rotate(${segmentAngle / 2}deg)`;
        
        segment.appendChild(text);
        wheelInner.appendChild(segment);
    });
}

createSegments();

// Spin the wheel
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    spinBtn.disabled = true;
    
    // Hide previous winner
    const existingWinner = document.querySelector('.winner');
    if (existingWinner) {
        existingWinner.remove();
    }
    
    // Random spin - between 5 and 10 full rotations + random position
    const rotations = 5 + Math.random() * 5;
    const randomOffset = Math.random() * 360;
    const totalDegrees = rotations * 360 + randomOffset;
    
    // Apply spin animation
    wheelInner.style.transition = 'transform 5s cubic-bezier(0.17, 0.67, 0.12, 0.99)';
    wheelInner.style.transform = `rotate(${totalDegrees}deg)`;
    
    // Calculate winner after animation
    setTimeout(() => {
        // Calculate which segment is at the top (pointer position)
        // Pointer is at top, so we need to find what segment is there
        const actualRotation = totalDegrees % 360;
        const segmentAngle = 360 / prizes.length;
        
        // The segment at the top is determined by the rotation
        // We need to account for the offset of -90 degrees in segment creation
        let winningIndex = Math.floor(((360 - actualRotation + 90) % 360) / segmentAngle);
        winningIndex = winningIndex % prizes.length;
        
        const winner = prizes[winningIndex];
        showWinner(winner);
        isSpinning = false;
        spinBtn.disabled = false;
    }, 5000);
}

// Show winner with confetti
function showWinner(prize) {
    // Create winner element
    const winner = document.createElement('div');
    winner.className = 'winner show';
    winner.textContent = `🎉 YOU WON: ${prize}!`;
    
    const instruction = document.querySelector('.instruction');
    instruction.parentNode.insertBefore(winner, instruction.nextSibling);
    
    // Confetti!
    triggerConfetti();
}

// Confetti effect
function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;
    
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#ffd700'];
    
    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors
        });
        
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors
        });
        
        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Event listeners
spinBtn.addEventListener('click', spinWheel);

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isSpinning) {
        e.preventDefault();
        spinWheel();
    }
});
