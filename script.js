// SCROLL SMOOTH

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        });

    });

});


// ANIMAZIONE SEZIONI

const sections = document.querySelectorAll(".poet-section");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0px)";

        }

    });

});

sections.forEach(section => {

    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "all 1s";

    observer.observe(section);

});