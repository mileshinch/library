function Books(title,author,pages,read) {
    if (!new.target) {
        throw Error("use the 'new' operator")
    }
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

let myLibrary = [];

function addBookToLibrary(title,author,pages,read) {

    const newBook = new Books(title,author,pages,read)
    console.log(newBook)
    myLibrary.push(newBook)

}

addBookToLibrary("The Hobbit","Tolkien",333,false)
addBookToLibrary("Why we're getting poorer", "Cahal Moran", 100,false)
addBookToLibrary("Orbital", "Lady Jane Grey", 100,false)

const n = myLibrary.length
const infoArray = ["title","author","pages","read"]

const tableBody = document.querySelector("tbody")

for (let i = 0; i < n; i++) {
    const tableRow = document.createElement("tr");
    tableRow.className = "row" + (i + 1)
    tableBody.appendChild(tableRow);

    for (let j = 0; j < 4; j++) {
        const tableDataElement = document.createElement("td");
        tableDataElement.textContent = myLibrary[i][infoArray[j]]
        tableRow.appendChild(tableDataElement);
    }
}
