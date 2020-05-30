const navbar = document.getElementById("navbar");
const navList = document.querySelector(".header-nav__list");
const sidebar = document.getElementById("sidebar");
const sideContent = document.querySelector(".sidebar__container");
const btn = document.getElementById("menu-button");
const sideBtn = document.getElementById("side-button");
const open = document.querySelector(".open");
const links = document.querySelectorAll(".header-nav__item-link");

// datepicker
$(function () {
  $("#datepicker").datepicker({
    inline: true,
    showOtherMonths: true,
    dayNamesMin: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  });

  function hideNavBar() {
    navbar.classList.toggle("open");
    btn.classList.toggle("transform");
    navList.classList.toggle("transform-list");
  }

  function hideSideBar() {
    sidebar.classList.toggle("open");
    sideBtn.classList.toggle("transform-side");
    sideContent.classList.toggle("transform-sidebar");
  }

  btn.addEventListener("click", (e) => {
    e.preventDefault;
    hideNavBar();
  });

  for (const link of links) {
    link.addEventListener("click", () => {
      hideNavBar();
    });
  }

  sideBtn.addEventListener("click", (e) => {
    e.preventDefault;
    hideSideBar();
  });

  // Style the buy button
  const animateButton = function (e) {
    e.preventDefault;
    //reset animation
    e.target.classList.remove("animate");

    e.target.classList.add("animate");
    setTimeout(function () {
      e.target.classList.remove("animate");
    }, 700);
  };

  const bubblyButtons = document.getElementsByClassName("bubbly-button");

  for (let i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener("click", animateButton, false);
  }

  // JQUERY CAROUSEL
  const track = $(".carousel__track");
  const slides = track.children().toArray();
  const nextButton = $(".carousel__button--right");
  const prevButton = $(".carousel__button--left");
  const dotsNav = $(".carousel__nav");
  const dot = dotsNav.children().toArray();

  const slideWidth = slides[0].getBoundingClientRect().width;

  $.each(slides, (index, slide) => {
    $(slide).css("left", `${slideWidth * index}px`);
  });

  function moveToSlide(track, currentSlide, targetSlide) {
    $(track).css("transform", `translateX(-${$(targetSlide).css("left")})`);

    $(currentSlide).removeClass("current-slide");
    $(targetSlide).addClass("current-slide");
  }

  function updateDots(currentDot, targetDot) {
    $(targetDot).addClass("current-slide");
    $(currentDot).removeClass("current-slide");
  }

  // when I click left, move slides to the left
  prevButton.click((e) => {
    const currentSlide = track.find(".current-slide");
    let prevSlide = currentSlide.prev();
    let currentDot = dotsNav.find(".current-slide");
    let prevDot = currentDot.prev();
    const prevIndex = prevSlide.index();

    if (prevIndex === -1) {
      prevSlide = slides[slides.length - 1];
      prevDot = dot[dot.length - 1];
    }

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
  });

  // when I click right, move slides to the right
  nextButton.click((e) => {
    const currentSlide = track.find(".current-slide");
    let nextSlide = currentSlide.next();
    const currentDot = dotsNav.find(".current-slide");
    let nextDot = currentDot.next();
    const nextIndex = nextSlide.index();

    if (nextIndex === -1) {
      nextSlide = slides[0];
      nextDot = dot[0];
    }

    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
  });

  // when I click the nav indicators, move to that slide
  dotsNav.click((e) => {
    const targetDot = $(e.target).closest("button");

    if (!targetDot) return;

    const currentSlide = track.find(".current-slide");
    const currentDot = dotsNav.find(".current-slide");
    const targetIndex = targetDot.index();
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
  });

  // autocomplete
  var availableTags = [
    "3T",
    "6ku",
    "Alan",
    "Basso",
    "Casati",
    "Dahon",
    "EVO",
    "Factory",
    "Giant",
    "Haro",
    "Jamis",
    "Kemo",
    "Look",
    "Marin",
    "Niner",
    "Ocoee",
    "Parlee",
    "Quiring",
    "Ragley",
    "Saracen",
    "Tern",
    "Univega",
    "Vilano",
    "Whyte",
    "Zinn Cycles",
  ];
  $("#tags").autocomplete({
    source: availableTags,
  });

  // Store to local storage
  $("#submit").click((e) => {
    let data = {
      username: $("#user-name").val(),
      email: $("#user-email").val(),
      password: $("#user-password").val(),
      passwordConfirm: $("#user-password-confirm").val(),
    };

    if ($("#user-email")[0].validity.valid == false) {
      alert("Your email is not valid!");
    } else if (data.password !== data.passwordConfirm) {
      alert("Your password doesn't match!");
    } else {
      const entries = Object.entries(data);
      for (const [input, value] of entries) {
        localStorage.setItem(input, value);
      }
    }
  });

});