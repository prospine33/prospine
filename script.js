document.addEventListener("DOMContentLoaded", function () {
    const target = 25000; // Target number
    const duration = 15000; // Duration of the animation in milliseconds (increased to 4000ms for slower speed)
    const increment = Math.ceil(target / (duration / 100)); // Increment value
    let count = 0; // Initial count
    let hasAnimated = false; // Flag to check if animation has started
    const delay = 1000; // Delay before starting the animation in milliseconds (1 second)

    const countElement = document.getElementById("count");
    const statElement = document.getElementById("stat"); // The element to observe

    const updateCount = () => {
      if (count < target) {
        count += increment; // Increase count
        if (count > target) count = target; // Ensure we don't exceed the target
        countElement.textContent = count.toLocaleString(); // Update the displayed number
        requestAnimationFrame(updateCount); // Request the next frame
      }
    };

    // Intersection Observer setup
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true; // Prevent further animations
          // Start the animation after the specified delay
          setTimeout(() => {
            updateCount(); // Start the animation when in view
          }, delay);
          observer.disconnect(); // Stop observing once the animation starts
        }
      });
    });

    observer.observe(statElement); // Observe the stat element
  });

  const slides = document.querySelectorAll(".slide");
  const dotsContainer = document.querySelector(".dots");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  let currentIndex = 0;

  // Calculate total pages (2 slides per page)
  const totalPages = Math.ceil(slides.length / 2);

  // Create dots for each page
  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.dataset.index = i;
    dot.addEventListener("click", () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }

  const updateDots = () => {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[Math.floor(currentIndex / 2)].classList.add("active");
  };

  const showSlide = (pageIndex) => {
    currentIndex = pageIndex * 2; // Each page index corresponds to two slides
    const sliderContainer = document.querySelector(".slider-container");
    sliderContainer.style.transform = `translateX(-${pageIndex * 50}%)`; // Move by 50% per page
    updateDots();
  };

  const goToSlide = (pageIndex) => {
    showSlide(pageIndex);
  };

  // Event listeners for navigation
  prevButton.addEventListener("click", () => {
    const newPageIndex = (Math.floor(currentIndex / 2) - 1 + totalPages) % totalPages;
    showSlide(newPageIndex);
  });

  nextButton.addEventListener("click", () => {
    const newPageIndex = (Math.floor(currentIndex / 2) + 1) % totalPages;
    showSlide(newPageIndex);
  });

  // Initialize
  showSlide(0); // Display the first slide