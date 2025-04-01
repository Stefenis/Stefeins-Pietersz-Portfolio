const menubar = document.querySelector('#menu');
const Navbar = document.querySelector('.navbar');

// Toggle the navigation menu on clicking the menubar icon
menubar.onclick = () => {
    menubar.classList.toggle('bx-x'); // Change the icon when clicked
    Navbar.classList.toggle('active'); // Toggle the navbar visibility
}

// Get all sections and nav links for scroll animations
const section = document.querySelectorAll('section');
const navlink = document.querySelectorAll('header nav a');

window.onscroll = () => {
    section.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150; // Offset for better visibility
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id'); // Get the id of the section

        // Check if the section is in view
        if (top > offset && top < offset + height) {
            sec.classList.add('start-animation'); // Add animation class to section
            navlink.forEach(links => {
                links.classList.remove('active'); // Remove active class from all nav links
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active'); // Add active class to current link
            });
        }
    });

    // Add sticky class to header when scrolling past 100px
    var header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Remove the menu and close the navbar when scrolling
    menubar.classList.remove('bx-x');
    Navbar.classList.remove('active');
}
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Send the form data via Fetch API
    let formData = new FormData(this);
    
    fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Show success popup
            Swal.fire({
                icon: "success",
                title: "Success!",
                text: "Message sent successfully!",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK"
            });

            // Reset the form after submission
            document.getElementById("contactForm").reset();
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops!",
                text: "Something went wrong. Please try again."
            });
        }
    })
    .catch(error => {
        Swal.fire({
            icon: "error",
            title: "Error!",
            text: "Failed to submit form. Please check your internet connection."
        });
    });
});