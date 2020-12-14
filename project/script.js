const navbar = document.querySelector(".navbar");
const navbarOffsetTop = navbar.offsetTop;
const sections = document.querySelectorAll('section');
const navbarLinks = document.querySelector('navbar-link')
const progress = document.querySelector('.progress-bar-wrapper');
const prgoressBarPresents = [97,89,85,87,80,70,50];

window.addEventListener("scroll", ()=> {
    if (window.pageYOffset >= 
        navbar.offsetTop) {
        navbar.classList.add("sticky");
    }
    else
    {
        navbar.classList.remove("sticky");
    }

    sections.forEach(section => {
        if(window.ageYOffset >= section.offsetTop - 10){
            navbarLinks.forEach(navbarLink => {
                navbarLink.classList.remove('change');
            })
            navbarLinks[i].classList.add("change");
        }
    });
    
    if(window.pageYOffset + Window.innerHeight >= progress.offsetTop){
        document.querySelectorAll('progress-percent').forEach(el, i) => {
            el.style.width = `${progressBarPresents[i]}`
        }

    }
});