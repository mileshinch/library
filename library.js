// constructor function
function Book(title, author, read, review) {
  if (!new.target) {
    throw Error("use the 'new' operator");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.read = read;
  this.review = review;
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

let myLibrary = [];

// create some initial books with constructor
myLibrary.push(
  new Book("Humankind", "Rutger Bregman", true, "an uplifting read")
);
myLibrary.push(
  new Book(
    "The Three-body Problem",
    "Cixin Liu",
    true,
    "enjoyable but didn't live up to the hype"
  )
);
myLibrary.push(
  new Book(
    "This Way Up",
    "Mark Cooper-Jones & Jay Foreman",
    true,
    "funny and some interesting stories that are good for pub chat"
  )
);

const cardContainer = document.querySelector(".cards-container");

// display the books
function renderLibrary() {
  cardContainer.innerHTML = ""; // clear old cards

  for (const book of myLibrary) {
    const card = document.createElement("div");
    card.setAttribute("data-attribute", book.id);
    card.className = "card";
    cardContainer.appendChild(card);

    const title = document.createElement("span"); // add title element
    title.textContent = book.title;
    card.appendChild(title);

    const author = document.createElement("span"); // add title element
    author.textContent = book.author;
    card.appendChild(author);

    // include a read review button
    const readReviewBtn = document.createElement("button");
    readReviewBtn.textContent = "Read review";
    card.appendChild(readReviewBtn);

    const modal = document.getElementById("myModal");
    const modalBody = document.getElementById("modalBody");
    const closeBtn = document.getElementById("closeModalBtn");

    // Open modal
    readReviewBtn.addEventListener("click", () => {
      modalBody.innerHTML = ""; // Clear previous content first
      const review = document.createElement("p");
      review.textContent = book.review;
      modalBody.appendChild(review);
      modal.style.display = "block";
    });

    // Close modal (X button)
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    // Close modal when clicking outside content
    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });

    // include a read status button
    const readStatusBtn = document.createElement("button");
    // get the read status from book
    readStatusBtn.textContent = book.read ? "Read" : "Not read";
    readStatusBtn.style.color = book.read ? "green" : "red";
    card.appendChild(readStatusBtn);

    readStatusBtn.addEventListener("click", () => {
      book.toggleRead(); // change read status when button is clicked
      renderLibrary();
      console.log(myLibrary);
    });

    // include a remove button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove from library";

    deleteBtn.addEventListener("click", () => {
      card.remove(); // remove the card from the DOM
      myLibrary = myLibrary.filter((b) => b.id !== book.id); // remove the book from the library object
    });

    card.appendChild(deleteBtn);
  }
}

renderLibrary(); // initial render

const openFormBtn = document.getElementById("open-form-btn");
const form = document.getElementById("myForm");
const cancelBtn = document.getElementById("cancelBtn");

// when user clicks 'Add new book' the form is displayed
openFormBtn.addEventListener("click", () => {
  form.hidden = false;
});

// when the user clicks cancel the form is hidden
cancelBtn.addEventListener("click", () => {
  form.hidden = true;
});

// when the user submits the form a new book is added
form.addEventListener("submit", (e) => {
  e.preventDefault();
  // handle form data here
  const formData = new FormData(form);
  const newBook = new Book(...Object.values(Object.fromEntries(formData))); // create a new Book with constructor function
  myLibrary.push(newBook); // add book to the library
  renderLibrary(); // re-render the UI
  form.hidden = true;
});
