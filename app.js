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

  // modal window
  const modal = $(".modal");
  const img = $(".image");
  const modalImg = $(".modal-content");
  const closeBtn = $(".close");
  const captionText = $("#caption");

  // when I click right, move slides to the right
  nextButton.click(nextSlide);
  // when I click left, move slides to the left
  prevButton.click(prevSlide);

  img.each(function (index) {
    $(this).on("click", function () {
      $(modal).css("display", "flex");
      $(modalImg).attr("src", $(this).attr("src"));
      console.log($(this).attr("alt"));
      captionText.text(`${$(this).attr("alt")}`);
    });
  });

  closeBtn.on("click", function () {
    $(modal).css("display", "none");
  });

  // auto change slide
  setInterval(nextSlide, 3000);

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

  function prevSlide() {
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
  }

  function nextSlide() {
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
  }

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

// VALIDATE ORDER FORM IN JS

// all inputs from form
const INPUTS = {
  card: document.getElementById("visa").checked
    ? document.getElementById("visa")
    : document.getElementById("mastercard"),
  bike: document.getElementById("choose-bike"),
  name: document.getElementById("billing-name"),
  surname: document.getElementById("billing-surname"),
  street: document.getElementById("autocomplete"),
  state: document.getElementById("administrative_area_level_1"),
  zip: document.getElementById("postal_code"),
  phone: document.getElementById("billing-phone"),
  deliveryName: document.getElementById("delivery-name"),
  deliverySurname: document.getElementById("delivery-surname"),
  deliveryStreet: document.getElementById("delivery-street"),
  deliveryState: document.getElementById("delivery-state"),
  deliveryZip: document.getElementById("delivery-zip"),
  year: document.getElementById("year"),
  month: document.getElementById("month"),
  day: document.getElementById("day"),
  number: document.getElementById("cardnumber"),
  holder: document.getElementById("cardholder"),
  cardMonth: document.getElementById("card-month"),
  cardYear: document.getElementById("card-year"),
  cvc: document.getElementById("cvc"),
};

// create account field
const createAccountInputs = {
  username: document.getElementById("create-username"),
  password: document.getElementById("create-password"),
  passwordConfirm: document.getElementById("create-confirm-password"),
};

// checkbox for copy billing information
const copyBill = document.getElementById("copy-billing-address");

const orderForm = document.getElementById("order");
const buttons = document.getElementsByClassName("carousel__buy");

// get months as string for adding to result.html
const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// remove form from DOM until Buy Now button will be pressed
document.body.removeChild(orderForm);

// event listeners to all buttons from slider
for (let i = 0; i < buttons.length; i++) {
  (function (index) {
    buttons[index].addEventListener("click", () => {
      //add animation to order form
      setTimeout(() => orderForm.classList.add("opacity"), 600);
      // hide everything else except order form and background
      hideRestElements();
      // add form to DOM
      document.body.appendChild(orderForm);

      // Google Places API enable
      initAutocomplete();

      // contains functions for order validation
      initOrderFunctions();
      window.scrollTo(0, 0);
    });
  })(i);
}

// hide everything else except order form and background
function hideRestElements() {
  const all = document.getElementsByTagName("body");
  for (let i = 4; i < all[0].children.length; i++) {
    all[0].children[i].classList.add("is-hidden");
  }
}

// contains functions for order validation
function initOrderFunctions() {
  // ONLY NUMBERS INPUT FILTER
  function onlyNumberInput(textbox, inputFilter) {
    [
      "input",
      "keydown",
      "keyup",
      "mousedown",
      "mouseup",
      "select",
      "contextmenu",
      "drop",
    ].forEach(function (event) {
      textbox.addEventListener(event, function () {
        if (inputFilter(this.value)) {
          this.oldValue = this.value;
          this.oldSelectionStart = this.selectionStart;
          this.oldSelectionEnd = this.selectionEnd;
        } else if (this.hasOwnProperty("oldValue")) {
          this.value = this.oldValue;
          this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
          this.value = "";
        }
      });
    });
  }
  onlyNumberInput(INPUTS.zip, function (value) {
    return /^-?\d*$/.test(value);
  });
  onlyNumberInput(INPUTS.phone, function (value) {
    return /^-?\d*$/.test(value);
  });
  onlyNumberInput(INPUTS.cvc, function (value) {
    return /^-?\d*$/.test(value);
  });
  onlyNumberInput(INPUTS.deliveryZip, function (value) {
    return /^-?\d*$/.test(value);
  });

  // copy billing information to delivery information
  copyBill.addEventListener("click", () => {
    if (copyBill.checked) {
      INPUTS.deliveryName.value = INPUTS.name.value;
      INPUTS.deliverySurname.value = INPUTS.surname.value;
      INPUTS.deliveryState.value = INPUTS.state.value;
      INPUTS.deliveryStreet.value = INPUTS.street.value;
      INPUTS.deliveryZip.value = INPUTS.zip.value;
    } else {
      INPUTS.deliveryName.value = "";
      INPUTS.deliverySurname.value = "";
      INPUTS.deliveryState.value = "";
      INPUTS.deliveryStreet.value = "";
      INPUTS.deliveryZip.value = "";
    }
  });

  // implement drop down date selections
  const yearsCount = 5;

  let selectYear = document.getElementById("year");
  let selectMonth = document.getElementById("month");
  let selectDay = document.getElementById("day");

  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();

  for (let y = 0; y < yearsCount; y++) {
    let yearElem = document.createElement("option");
    yearElem.value = currentYear;
    yearElem.textContent = currentYear;
    selectYear.appendChild(yearElem);
    currentYear++;
  }

  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let day = d.getDay();

  selectYear.addEventListener("change", () => {
    AdjustDays();
    AdjustMonths();
  });
  selectMonth.value = month;
  selectMonth.addEventListener("change", AdjustDays);

  AdjustMonths();
  AdjustDays();

  selectDay.value = day;

  function AdjustMonths() {
    // YOU CANNOT CHOOSE DATE EARLIER THAN TODAY
    if (+selectYear.value !== new Date().getFullYear()) {
      currentMonth = 0;
    } else {
      currentMonth = new Date().getMonth();
    }
    selectMonth.innerHTML = "";

    for (; currentMonth < 12; currentMonth++) {
      let month = monthName[currentMonth];
      let monthElem = document.createElement("option");
      monthElem.value = currentMonth;
      monthElem.textContent = month;
      selectMonth.append(monthElem);
    }
  }

  function AdjustDays() {
    let date = new Date();
    let d;
    let year = selectYear.value;
    let month = +selectMonth.value;
    selectDay.innerHTML = "";

    let days = new Date(year, month + 1, 0).getDate();

    // YOU CANNOT CHOOSE DATE EARLIER THAN TODAY
    if (+year == date.getFullYear() && month == date.getMonth()) {
      d = new Date().getDay();
    } else {
      d = 1;
    }

    for (; d <= days; d++) {
      let dayElem = document.createElement("option");
      dayElem.value = d;
      dayElem.textContent = d;
      selectDay.append(dayElem);
    }
  }
}

// Do alert if some of inputs contains a lot of spaces
function checkEmptyInputs() {
  let values = Object.values(INPUTS);
  let keys = Object.keys(INPUTS);

  for (let i = 0; i < values.length; i++) {
    let trimmedValue = values[i].value.trim();

    if (trimmedValue == "") {
      alert(`${keys[i]} field is empty`.toUpperCase());
      return;
    }
  }

  createAccount();
}

// create account field isn't required but if some of inputs are filled like username or password - rest inputs of create account field should be required and passwords should be matched
function createAccount() {
  let values = Object.values(createAccountInputs);
  let required = false;

  for (let i = 0; i < values.length; i++) {
    if (values[i].value !== "") {
      for (let j = 0; j < values.length; j++) {
        values[j].required = true;
        values[j].setAttribute("minlength", "5");
      }
      required = true;
      break;
    }
  }

  if (required) {
    if (
      createAccountInputs.password.value !==
        createAccountInputs.passwordConfirm.value ||
      createAccountInputs.password.value == "" ||
      createAccountInputs.passwordConfirm.value == "" ||
      createAccountInputs.username === ""
    ) {
      return;
    }
  }

  addValuesToLocalStorage();
}

function addValuesToLocalStorage() {
  localStorage.clear();

  let keys = Object.keys(INPUTS);
  let values = Object.values(INPUTS);

  for (let i = 0; i < keys.length; i++) {
    // months have values as a number, this if statement convert number to name of selected month
    if (keys[i] == "month") {
      localStorage.setItem(`${keys[i]}`, `${monthName[+values[i].value]}`);
    } else {
      localStorage.setItem(`${keys[i]}`, `${values[i].value}`);
    }
  }

  window.document.location = "result/result.html";
}

// Autocomplete address using Google Places API
var placeSearch, autocomplete;

var componentForm = {
  administrative_area_level_1: "short_name",
  postal_code: "short_name",
};

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete"),
    {
      types: ["geocode"],
    }
  );

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  autocomplete.setFields(["address_component"]);

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener("place_changed", fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  for (var component in componentForm) {
    document.getElementById(component).value = "";
  }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];
    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
      document.getElementById(addressType).value = val;
    }
  }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy,
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
