// Below there are all che variables defined with const that are targetting all the html elements that the program will interact with.
const imageElement = document.querySelector(".image");
const nameHeader = document.querySelector(".name-header");
const jobPara = document.querySelector(".job-para");
const reviewPara = document.querySelector(".review-para");

const randomButton = document.querySelector("[data-button]");
const arrowButtons = document.querySelectorAll("[data-arrow]");
const dotContainer = document.querySelector(".dots");
// Here I've defined a count variable that keeps track of which review is currently displayed.
let count = 0;

// This is the array object that stores all the informations of the reviewers and the reviews. Usually we would get this type of date using Ajax requests.
const reviews = [
  {
    id: 1,
    name: { first: "ada", last: "michaels" },
    job: "UX Designer",
    image: "images/ada.png",
    review:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque tempus, tortor sit amet sollicitudin rutrum, risus lectus commodo libero, at vestibulum augue eros et dui. Duis ligula sem, varius eu dui eu, pellentesque convallis tellus.",
  },
  {
    id: 2,
    name: { first: "antonio", last: "constanz" },
    job: "Junior FrontEnd Developer",
    image: "images/antonio.png",
    review:
      "Etiam commodo lacus ac enim vehicula, ut dictum lorem placerat. Ut rutrum nunc ac tortor gravida vulputate. Pellentesque sodales nibh mi, vitae iaculis turpis auctor sed.",
  },
  {
    id: 3,
    name: { first: "jason", last: "bradshaw" },
    job: "Athlete",
    image: "images/jason.png",
    review:
      "Etiam condimentum, mi ut pulvinar congue, velit lacus porttitor libero, vitae dapibus enim risus at ante. Donec vel turpis sodales, luctus neque ac, rutrum nunc.",
  },
  {
    id: 4,
    name: { first: "marie", last: "ferguson" },
    job: "Software Engineer",
    image: "images/marie.png",
    review:
      "Duis congue euismod est in accumsan. Suspendisse potenti. Donec volutpat eros metus, sagittis rutrum ex auctor ac. ",
  },
  {
    id: 5,
    name: { first: "aj", last: "jordan" },
    job: "Rapper",
    image: "images/aj.png",
    review:
      "Fusce venenatis, magna nec ultricies convallis, risus ipsum posuere nisi, a laoreet magna sem non leo. Aliquam ut leo ac quam tempor molestie ac at purus. Nullam eu volutpat ante.",
  },
];

// Functions

// This is the function that checks if the name.first and name.last are uppercased. If not, it will uppercase the names.
const upperCaseName = function (first, last) {
  if (
    first.charAt(0) !== first.charAt(0).toUpperCase() ||
    last.charAt(0) !== last.charAt(0).toUpperCase()
  ) {
    let firstName = first.charAt(0).toUpperCase() + first.slice(1);
    let lastName = last.charAt(0).toUpperCase() + last.slice(1);
    return `${firstName} ${lastName}`;
  } else {
    return `${first} ${last}`;
  }
};

// Belows function is the one that displays everything. I've gave it an input, in this case count, so that it will display the object on the array position of count.
const updateDisplay = function (count) {
  imageElement.setAttribute("src", `${reviews[count].image}`);
  nameHeader.textContent = upperCaseName(
    reviews[count].name.first,
    reviews[count].name.last
  );
  jobPara.textContent = reviews[count].job;
  reviewPara.textContent = reviews[count].review;
};

// Here, the forEach() method, targets both the arrow buttons, and assigns them a listener, this time a click listener. And then, with the help of a nested if statement checks
// on the click of the left arrow if count is lesserEqual of 0 it should return, if not, it has to decrement count and trigger the updateDisplay() function
// or on the click of the right arrow if count is greaterEqual of the array length it should return, if not, it has to increment the count and trigger the updateDisplay() function.
const moveTheSlider = function () {
  arrowButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList[0] === "arrow-btn-left") {
        if (count <= 0) {
          count = reviews.length - 1;
          updateDisplay(count);
        } else {
          count--;
          updateDisplay(count);
        }
      }
      if (button.classList[0] === "arrow-btn-right") {
        if (count >= reviews.length - 1) {
          count = 0;
          updateDisplay(count);
        } else {
          count++;
          updateDisplay(count);
        }
      }
      activateDot(count);
    });
  });
};

// This function creates dinamically the dots in base on how reviews we have
const createDots = function () {
  reviews.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

// This function activates the corresponding dot to the review
const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

// This is the starting function that gets triggered on load
const init = function () {
  updateDisplay(0);
  moveTheSlider();
  createDots();
  activateDot(0);
};

init();

// Event listeners

// This listener, gets fired when the randomButton is clicked and it creates a random number between 0 and the array length, update the count with that number (I've updated the count with the random number
// instead of passing it directly because so, I can continue to see the reviews from the array position that the random number sets) and passing that number in the updateDisplay() function.
randomButton.addEventListener("click", function () {
  function random(array) {
    return Math.floor(Math.random() * array.length);
  }
  count = random(reviews);
  updateDisplay(count);
  activateDot(count);
});

// This listener manage the behaviour when the user clicks directly on the dots
dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    console.log(slide);
    count = Number(slide);
    updateDisplay(slide);
    activateDot(slide);
  }
});
