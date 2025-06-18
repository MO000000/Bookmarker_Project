var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var deleteBtns;
var visitBtns;
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-container");
var bookmarks = [];



if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
  }
}

/**
 * Function to display a bookmark in the table  and adding click event to visit and delete buttons
 * @param {number} indexOfWebsite - The index of the website to be displayed
 */
function displayBookmark(indexOfWebsite) {
  var userURL = bookmarks[indexOfWebsite].siteURL;
  var httpsRegex = /^https?:\/\//g;
  if (httpsRegex.test(userURL)) {
    validURL = userURL;
    fixedURL = validURL
      .split("")
      .splice(validURL.match(httpsRegex)[0].length)
      .join("");
  } else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
  }
  var newBookmark = `
              <tr>
                <td>${indexOfWebsite + 1}</td>
                <td>${bookmarks[indexOfWebsite].siteName}</td>              
                <td>
                  <button class="btn btn-visit" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-eye pe-2"></i>Visit
                  </button>
                </td>
                <td>
                  <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
                    <i class="fa-solid fa-trash-can"></i>
                    Delete
                  </button>
                </td>
            </tr>
            `;
  tableContent.innerHTML += newBookmark;
    
  /**
   * Adding click event to visit and delete buttons
   */
  deleteBtns = document.querySelectorAll(".btn-delete");
  if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
      deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
      });
    }
  }
    
  visitBtns = document.querySelectorAll(".btn-visit");
  if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
      visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
      });
    }
  }
}


/**
 * Clear the value of siteName and siteURL input fields
 */

function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}


/**
 * Takes a string and capitalizes the first letter
 * @param {string} str - The string to be capitalized
 * @returns {string} The capitalized string
 */
function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}



/**
 * Event listener for the submit button
 */
submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") && siteURL.classList.contains("is-valid")) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
});


/**
 * Deletes a bookmark from the bookmarks list and updates the localStorage
 * @param {object} e - the event object, containing the index of the bookmark to be deleted
 */
function deleteBookmark(e) {
  tableContent.innerHTML = "";
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}


/**
 * Opens a bookmarked website in a new tab
 * @param {object} e - the event object, containing the index of the bookmark to be visited
 */
function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
  } else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
  }
}

/**
 * Regular expressions for validating site name and URL
 */
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;


/**
 * Event listeners for input fields
 */
siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});


/**
 * Event listeners for input fields
 */
siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

/**
 * Validates an input element against a given regular expression
 * and adds or removes is-valid/is-invalid classes accordingly
 * @param {object} element - the input element to be validated
 * @param {object} regex - the regular expression to test against
 */
function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}


/**
 * Closes the modal by adding the "d-none" class to hide it.
 * @return {undefined} - nothing is returned
 */
function closeModal() {
  boxModal.classList.add("d-none");
}

/**
 * Event listener for the close button
 */
closeBtn.addEventListener("click", closeModal);

/**
 * Event listener for the escape key
 */
document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

/**
 * Event listener for clicking outside the modal
 */
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});








