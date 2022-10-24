// Get the first element for Unordered List with id ["navbar__list"].
const linksList = document.querySelector("#navbar__list");

// Create list of all elements with ID containing ["section"] using [querySelectorAll].
const all_sections = Array.from(document.querySelectorAll("section"))


function generateListItems() {
    // Iterate over all sections.
    for (single_section of all_sections) {
        // Create ["li"] elements using [createElement] and fill in the (innerHTML) with the HTML syntax below.
        listItem = document.createElement("li");
        listItem.innerHTML = `<li><a href="#${single_section.id}" data-nav="${single_section.id}" class="menu__link">${single_section.dataset.nav}</a></li>`;
        // Add the ["li"] to the navList.
        linksList.appendChild(listItem);
    }
}

generateListItems()

// While scrolling through the page, add and remove the active class dynamically according to what is visible.
window.onscroll = function () {
    // Iterate over all the sections and check active.
    document.querySelectorAll("section").forEach(function (active) {
        // Get the content of element with id ["data-nav"].
        let activeSection = linksList.querySelector(`[data-nav=${active.id}]`);

        // Check the scrolling coords and parameters - If section is visible on screen, then add "your-active-class" class to the section, else remove it.
        if (active.getBoundingClientRect().top >= -150 && active.getBoundingClientRect().top <= 150) {
            active.classList.add("your-active-class");
            activeSection.classList.add("active-link");
        } else {
            active.classList.remove("your-active-class");
            activeSection.classList.remove("active-link");
        }
    });
}


// Smoothly Scroll to Top of Page when User scrolls 400 pixels from top.
let upBtn = document.querySelector(".upBtn");

// Control the CSS Class "Show" and remove it according to the position on page.
window.onscroll = function () {
    if (this.scrollY >= 400) { upBtn.classList.add("show"); }
    else { upBtn.classList.remove("show"); }
};

// Scroll to top, smoothly.
upBtn.onclick = function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

// Use CSS scroll-behavior: smooth to smoothly scroll when user clicks on nav-bar item.
linksList.addEventListener("click", (section) => {
    // Error Handling - Multiple clicks at the same time, cancel all previous actions.
    section.preventDefault();

    if (section.target.dataset.nav) {
        const link = document.getElementById(`${section.target.dataset.nav}`)
        // Scroll to the section smoothly.
        link.scrollIntoView({ behavior: "smooth" });
        // Take 500ms to complete the scrolling operation to simulate the smoothness using [setTimeout].
        setTimeout(() => { location.hash = `${section.target.dataset.nav}`; }, 500);
    }
});


// [nav-bar] is visible when the page initally loads - but when the user scrolls down the [nav-bar] counts 2 seconds and then disappears; until another scroll action happens.
let scrollAction;
document.onscroll = () => {
    // Change the CSS attribute to 'block" during scrolling.
    document.querySelector(".page__header").style.display = "block";
    clearTimeout(scrollAction)
    // When idle, set the display to none so it disappears from the website.
    scrollAction = setTimeout(() => { document.querySelector(".page__header").style.display = "none"; }, 2000)
}