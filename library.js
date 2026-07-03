let myLibrary = [
  {
    id: crypto.randomUUID(),
    title: "Humankind",
    author: "Rutger Bregman",
    read: true,
    review: "an uplifting read",
  },
  {
    id: crypto.randomUUID(),
    title: "The Three-body Problem",
    author: "Cixin Liu",
    read: true,
    review: "enjoyable but didn't live up to the hype",
  },
  {
    id: crypto.randomUUID(),
    title: "This Way Up",
    author: "Mark Cooper-Jones & Jay Foreman",
    read: true,
    review: "funny and some interesting stories that you can share at the pub",
  },
];

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

function addBookToLibrary(title, author, read, review) {
  //// take params, create a book then store it in the array
  const newBook = new Book(title, author, read, review);
  console.log(newBook);
  myLibrary.push(newBook);
}
console.log("library", myLibrary);

const cardContainer = document.querySelector(".cards-container");

// display the books
for (const book of myLibrary) {
  const card = document.createElement("div");
  card.className = "card";
  cardContainer.appendChild(card);
  card.textContent = book.title;
}
