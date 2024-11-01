document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  // Toggle the menu on hamburger click
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active"); // Rotate the hamburger icon to 'X'
  });

  // Close the menu when clicking outside
  document.addEventListener("click", (event) => {
    const isClickInside = hamburger.contains(event.target) || navLinks.contains(event.target);
    if (!isClickInside) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Counting Animation
  const target = 45000; // Target number
  const duration = 15000; // Duration of the animation in milliseconds
  const increment = Math.ceil(target / (duration / 100)); // Increment value
  let count = 0; // Initial count
  let hasAnimated = false; // Flag to check if animation has started
  const delay = 1000; // Delay before starting the animation in milliseconds

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
        setTimeout(() => {
          updateCount(); // Start the animation when in view
        }, delay);
        observer.disconnect(); // Stop observing once the animation starts
      }
    });
  });

  observer.observe(statElement); // Observe the stat element


  // Video Slider
  const videoSlider = (function () {
    let currentVideoIndex = 0; // Renamed variable to avoid conflicts
    const videos = document.querySelectorAll('.video-container');
    const totalVideos = videos.length;

    function showVideo(index) {
      videos.forEach((video, i) => {
        video.style.display = (i === index) ? 'block' : 'none';
      });
    }

    function nextVideo() {
      currentVideoIndex = (currentVideoIndex + 1) % totalVideos; // Loop back to start
      showVideo(currentVideoIndex);
    }

    function prevVideo() {
      currentVideoIndex = (currentVideoIndex - 1 + totalVideos) % totalVideos; // Loop to the end
      showVideo(currentVideoIndex);
    }

    document.getElementById('nextBtn').addEventListener('click', nextVideo);
    document.getElementById('prevBtn').addEventListener('click', prevVideo);

    // Initialize the first video
    showVideo(currentVideoIndex);
  })(); // IIFE to encapsulate video slider functionality

});


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("modal");
  const openModalButton = document.getElementById("openModal");
  const closeModalButton = document.getElementById("closeModal");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");
  const review = document.getElementById("review");

  const continue1 = document.getElementById("continue1");
  const back1 = document.getElementById("back1");
  const continue2 = document.getElementById("continue2");
  const back2 = document.getElementById("back2");
  const continue3 = document.getElementById("continue3");
  const back3 = document.getElementById("back3");

  // Form data object
  const formData = {};

  // Open the modal
  openModalButton.addEventListener("click", () => {
    modal.style.display = "block";
  });

  // Close the modal
  closeModalButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Function to validate email
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Step 1: Continue button with validation
  continue1.addEventListener("click", () => {
    // Collect data from step 1
    formData.name = document.getElementById("name").value;
    formData.email = document.getElementById("email").value;
    formData.mobile = document.getElementById("mobile").value;
    formData.city = document.getElementById("city").value;

    // Validation: Check if all fields are filled and email is valid
    if (!formData.name || !formData.email || !formData.mobile || !formData.city) {
      alert("Please fill in all fields.");
    } else if (!validateEmail(formData.email)) {
      alert("Please enter a valid email address.");
    } else {
      // Switch to step 2
      step1.style.display = "none";
      step2.style.display = "block";
    }
  });

  // Step 2: Back and Continue buttons with validation
  back1.addEventListener("click", () => {
    step2.style.display = "none";
    step1.style.display = "block";
  });

  continue2.addEventListener("click", () => {
    // Collect data from step 2
    formData.gender = document.getElementById("gender").value;
    formData.occupation = document.getElementById("occupation").value;
    formData.age = document.getElementById("age").value;
    formData.symptom = document.getElementById("symptom").value;

    // Validation: Check if all fields are filled
    if (!formData.gender || !formData.occupation || !formData.age || !formData.symptom) {
      alert("Please fill in all fields.");
    } else {
      // Switch to step 3
      step2.style.display = "none";
      step3.style.display = "block";
    }
  });

  // Step 3: Back and Continue buttons with validation
  back2.addEventListener("click", () => {
    step3.style.display = "none";
    step2.style.display = "block";
  });

  continue3.addEventListener("click", () => {
    // Collect data from step 3
    formData.date = document.getElementById("date").value;
    formData.consultation = document.getElementById("consultation").value;

    // Validation: Check if date and time are selected
    if (!formData.date || !formData.consultation) {
      alert("Please select date and Consultation Type");
    } else {
      // Switch to review step
      step3.style.display = "none";
      review.style.display = "block";

      // Populate review section
      document.getElementById("reviewName").textContent = formData.name;
      document.getElementById("reviewEmail").textContent = formData.email;
      document.getElementById("reviewMobile").textContent = formData.mobile;
      document.getElementById("reviewCity").textContent = formData.city;
      document.getElementById("reviewGender").textContent = formData.gender;
      document.getElementById("reviewOccupation").textContent = formData.occupation;
      document.getElementById("reviewAge").textContent = formData.age;
      document.getElementById("reviewSymptom").textContent = formData.symptom;
      document.getElementById("reviewDate").textContent = formData.date;
      document.getElementById("reviewConsultation").textContent = formData.consultation;
    }
  });

  // Review Step: Back and Submit buttons
  back3.addEventListener("click", () => {
    review.style.display = "none";
    step3.style.display = "block";
  });

  // Handle form submission
  document.getElementById("appointmentForm").addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    // Disable the submit button to prevent multiple clicks
    const submitButton = event.submitter; // Get the button that triggered the submit event
    submitButton.disabled = true;
    submitButton.textContent = "Submitting..."; // Optional: Change button text to indicate loading

    // Collect form data
    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      mobile: document.getElementById("mobile").value,
      city: document.getElementById("city").value,
      gender: document.getElementById("gender").value,
      occupation: document.getElementById("occupation").value,
      age: document.getElementById("age").value,
      symptom: document.getElementById("symptom").value,
      date: document.getElementById("date").value,
      consultation: document.getElementById("consultation").value,
    };

    // Prepare URL-encoded string of the form data
    const params = new URLSearchParams(formData).toString();

    // Send data to Google Apps Script URL
    fetch("https://script.google.com/macros/s/AKfycbxCnXh-W1lWqi3hDOcR6KLyCEewdGViN7gWHsmC8plrrrWi2Xy-tmqILHCVBWqViRRI1A/exec" + "?" + params, { method: "POST" })
      .then(response => response.text())
      .then(data => {
        alert("Appointment booked successfully!");
        document.getElementById("appointmentForm").reset(); // Reset form fields
        modal.style.display = "none"; // Close the modal
        location.reload(); // Reload the page to reset the form and steps
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Failed to submit form. Please try again.");
        submitButton.disabled = false; // Re-enable the button if submission fails
        submitButton.textContent = "Submit"; // Reset button text
      });
  });

});

const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");

function openModal(consultationType) {
  modal.style.display = "block";
}
