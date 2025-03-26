document.addEventListener('DOMContentLoaded', function () {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = `Eid Mubarak ${currentYear}`;
    document.getElementById('footer-year').textContent = currentYear;

    // Load content with animation
    setTimeout(() => {
        document.querySelector('.content').classList.add('loaded');
    }, 300);

    // Load greeting with animation
    setTimeout(() => {
        document.querySelector('.greeting').classList.add('loaded');
    }, 600);

    // Load character with animation
    setTimeout(() => {
        document.querySelector('.character').classList.add('loaded');
    }, 900);

    // Character images array
    const characterImages = [
        'kid.png', // Original character
        'hug.png', // Praying man
        'sibling.png', // Woman with hijab
        'man.png', // Family
        'hug.png'  // Child
        // 'twins.png'  // Child
    ];

    // Track current character index
    let currentCharacterIndex = 0;

    // Function to change character
    function changeCharacter() {
        currentCharacterIndex = (currentCharacterIndex + 1) % characterImages.length;
        const characterImg = document.querySelector('.character-img');

        // Fade out current character
        characterImg.style.opacity = '0';

        // After fade out, change image and fade in
        setTimeout(() => {
            characterImg.src = characterImages[currentCharacterIndex];
            characterImg.style.opacity = '1';
        }, 500);
    }

    // Animated text typing effect
    const message = "May Allah's blessings be with you today and always. Eid Mubarak!";
    const animatedText = document.getElementById('animated-text');
    let index = 0;

    function typeWriter() {
        if (index < message.length) {
            animatedText.innerHTML = message.substring(0, index + 1) +
                (index < message.length - 1 ? '<span class="cursor"></span>' : '');
            index++;
            setTimeout(typeWriter, 50);
        } else {
            animatedText.innerHTML = message;
        }
    }

    // Start typing animation after a delay
    setTimeout(typeWriter, 1200);

    // Name submission handler
    document.getElementById('submit-name').addEventListener('click', function () {
        const nameInput = document.getElementById('visitor-name');
        const resultName = document.getElementById('result-name');
        const name = nameInput.value.trim();

        if (name) {
            // Update the name display
            resultName.textContent = name;
            // Play name animation
            resultName.classList.remove('name-animation');
            void resultName.offsetWidth; // Trigger reflow to restart animation
            resultName.classList.add('name-animation');

            // Change character
            changeCharacter();

            // Add celebration effects
            addCelebrationEffects();

            // Clear input
            nameInput.value = '';
        } else {
            // Shake the input field if empty
            nameInput.classList.add('shake');
            setTimeout(() => {
                nameInput.classList.remove('shake');
            }, 500);
        }
    });

    // Send wishes button click event
    document.getElementById('send-wishes').addEventListener('click', function () {
        // Change character
        changeCharacter();

        // Add celebration effects
        addCelebrationEffects();

        // Show a confirmation dialog
        alert('Eid Mubarak! Your wishes have been sent with blessings.');
    });

    // Add celebration effects
    function addCelebrationEffects() {
        // Create and append celebration elements
        for (let i = 0; i < 30; i++) {
            createConfetti();
        }

        // Add prayer glow effect
        const prayerEffects = document.querySelectorAll('.prayer-effect');
        prayerEffects.forEach(effect => {
            effect.style.animation = 'none';
            void effect.offsetWidth;
            effect.style.animation = 'prayerGlow 3s ease-in-out 3';
        });

        // Add character animation
        const character = document.querySelector('.character-img');
        character.style.animation = 'none';
        void character.offsetWidth;
        character.style.animation = 'prayingMotion 3s ease-in-out infinite';
    }

    // Create floating confetti
    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';

        // Random position, color, and size
        const size = Math.random() * 10 + 5;
        const colors = ['#FBCF33', '#F5A623', '#fff', '#71b280', '#134e5e'];

        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.top = `-${size}px`;

        // Add to body
        document.body.appendChild(confetti);

        // Remove after animation completes
        setTimeout(() => {
            document.body.removeChild(confetti);
        }, 6000);
    }

    // Add keyboard support for name submission
    document.getElementById('visitor-name').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            document.getElementById('submit-name').click();
        }
    });

    // Add CSS to fade character transition
    const style = document.createElement('style');
    style.textContent = `
      .character-img {
        transition: opacity 0.5s ease-in-out;
      }
    `;
    document.head.appendChild(style);
});
