const slider = document.getElementById('slider');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentIndex = 0;
const linkWidth = 120; // Approximate width of each link + gap
const totalLinks = slider.children.length;

// Duplicate the links to create an infinite effect
slider.innerHTML += slider.innerHTML;

// Set slider width to fit all items
slider.style.width = `${linkWidth * slider.children.length}px`;

// Function to slide to the next link
function slideNext() {
    currentIndex++;
    if (currentIndex >= totalLinks) {
        slider.style.transition = 'none';
        currentIndex = 0;
        slider.style.transform = `translateX(-${currentIndex * linkWidth}px)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.3s ease';
            currentIndex++;
            slider.style.transform = `translateX(-${currentIndex * linkWidth}px)`;
        }, 50);
    } else {
        slider.style.transform = `translateX(-${currentIndex * linkWidth}px)`;
    }
}

// Function to slide to the previous link
function slidePrev() {
    currentIndex--;
    if (currentIndex < 0) {
        slider.style.transition = 'none';
        currentIndex = totalLinks - 1;
        slider.style.transform = `translateX(-${currentIndex * linkWidth}px)`;
        setTimeout(() => {
            slider.style.transition = 'transform 0.3s ease';
            currentIndex--;
            slider.style.transform = `translateX(-${currentIndex * linkWidth}px)`;
        }, 50);
    } else {
        slider.style.transform = `translateX(-${currentIndex * linkWidth}px)`;
    }
}

// Event listeners for buttons
nextBtn.addEventListener('click', slideNext);
prevBtn.addEventListener('click', slidePrev);
