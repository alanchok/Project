let controller;
let slideScene;
let pageScene;

function animateSlides() {
  //Init Controller
  controller = new ScrollMagic.Controller();
  //Select the image thing to slide
  const sliders = document.querySelectorAll(".slide");
  const nav = document.querySelector(".nav-header");
  //loop over each slide
  sliders.forEach((slide, index, slides) => {
    //add index, slides
    const revealImg = slide.querySelector(".reveal-img");
    const img = slide.querySelector("img");
    const revealText = slide.querySelector(".reveal-text");
    //GSAP
    // gsap.to(revealImg, 1, { x: "100%" });
    // gsap.to(img, 1, { scale: 2 });
    const slideTl = gsap.timeline({
      defaults: { duration: 1, ease: "power2.inOut" },
    });
    slideTl.fromTo(revealImg, { x: "0px" }, { x: "100%" });
    slideTl.fromTo(img, { scale: 1 }, { scale: 1 }, "-=1");
    slideTl.fromTo(revealText, { x: "0%" }, { x: "110%" });
    //Create the slide scene
    slideScene = new ScrollMagic.Scene({
      triggerElement: slide,
      triggerHook: 0.25,
    })
      // when you scroll to each picture, the picture will slide
      .setTween(slideTl)
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "slide",
      })
      .addTo(controller);
    //   new Animation to make the picture slide and fade up
    const pageTl = gsap.timeline();

    let nextSlide = slides.length - 1 === index ? "end" : slides[index + 1];
    pageTl.fromTo(nextSlide, { y: "0" }, { y: "50" });
    pageTl.fromTo(
      slide,
      { opacity: 1, scale: 1 },
      { opacity: 1 },
      { scale: 1 }
    );
    pageTl.fromTo(nextSlide, { y: "0" }, { y: "50" });
    //this makes the picture slowly fade smaller while scrolling down
    pageTl.fromTo(slide, { opacity: 0, scale: 1 }, { opacity: 1, scale: 1 });
    //Create slide up scene
    pageScene = new ScrollMagic.Scene({
      triggerElement: slide,
      duration: "100%",
      triggerHook: 0,
    }) // the start/end page indictor for animation
      .addIndicators({
        colorStart: "white",
        colorTrigger: "white",
        name: "page",
        indent: 200,
      })
      .setPin(slide) //set the pin for the scroll
      .setTween(pageTl)
      .addTo(controller);
  });
}

const burger = document.querySelector(".burger");

function navToggle(e) {
  gsap.to(".line1", 1, { rotate: "20", y: 5, background: "black" });
  gsap.to(".line2", 1, { rotate: "20", y: 5, background: "black" });
  gsap.to("#logo", 1, { color: "black" });
  gsap.to(".nav-bar", 1, { clipPath: "circle(100px at 100% +10)" });
}

//Barbar page transiion
// barba.init({
//   views: [
//     {
//       namespace: "home",
//       beforeEnter() {
//         animateSlides();
//       },
//       beforeLeave() {
//         slideScene.destroy();
//         pageScene.destroy();
//         controller.destroy();
//       },
//     },
//     {
//       namespace: "fashion",
//     },
//   ],
//   transition: {
//     leave({ current, next }) {
//       let done = this.async();
//       //An Animation
//       const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });
//       tl.fromTo(current.container, 1, { opacity: 1 }, { opacity: 0 });
//     },
//     enter({ current, next }) {
//       let done = this.async();
//       //an animation
//       const tl = gsap.time({ defaults: { ease: " power2.inOut" } });
//       tl.fromTo(next.container, 1, { opacity: 0 }, { opacity: 1 });
//     },
//   },
//   enter,
// });

//Event Listener
burger.addEventListener("click", navToggle);

animateSlides();
