/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/**
 * List Filter and Pagination
 * 
 * @file script.js is the root file for this List Filter and Pagination project
 * @author Allen Price
 * 
 * The List Filter and Pagination application dynamically generates the required number of
 * pages necessary to fit a maximum of ten student items per page.
 * 
 * This application also dynamically generates an input field and a button to search for any
 * particular student/students. The 'searched' student/students are filtered into another
 * unordered list and paginated so as to have a maximum of ten students per page as well.
 */


/**
 * Parent Page
 * @type {HTMLDivElement}
 */
const parentPage = document.querySelector('.page');

/**
 * Page Header
 * @type {HTMLDivElement}
 */
const pageHeader = document.querySelector('.page-header');

/**
 * Original Student List
 * @type {HTMLUListElement}
 */
const originalList = document.querySelector('.student-list');

/**
 * Original Student List Items
 * @type {NodeListOf<HTMLLIElement>}
 */
const originalListItems = document.querySelectorAll('.student-item');

/**
 * Number of List Items displayed on a single page
 * @type {number}
 */
const maxListItems = 10;

/**
 * Creates a new HTML element with an assigned class name
 * @param {string} elementType type of element to create
 * @param {string} elementClass class name to assign to created element
 * @returns {HTMLElement} HTML element with assigned class name
 */
const createNewElement = (elementType, elementClass) => {
   let newElement = document.createElement(elementType);
   newElement.className = elementClass;
   return newElement;
};

/**
 * Dynamically-created 'Pagination' Div
 * @type {HTMLDivElement}
 */
const pagination = createNewElement('div', 'pagination');
parentPage.appendChild(pagination);

/**
 * Returns a HTML UL element assigned to a specific page number
 * @param {NodeListOf<HTMLLIElement} list HTML LI elements of students to display
 * @param {number} page Number of the page that will be displayed
 * @returns {HTMLUListElement} A list of ten students and the page they will be displayed on
 */
const getPageList = (list, page) => {
   let studentListItem;
   let firstIndex = maxListItems * (page - 1);
   let lastIndex = maxListItems + firstIndex;

   let pageList = createNewElement('ul', 'student-list');

   if (list.length <lastIndex) {
      lastIndex = list.length;
      for (let i = firstIndex; i < lastIndex; i++) {
         studentListItem = list[i].cloneNode(true);
         pageList.appendChild(studentListItem);
      }
   } else {
      for (let i = firstIndex; i < lastIndex; i++) {
         studentListItem = list[i].cloneNode(true);
         pageList.appendChild(studentListItem);
      }
   }
   return pageList;
};

/**
 * Display the trimmed list of at least ten students per page
 * @param {NodeListOf<HTMLLIElement} list HTML LI elements of students to display
 * @param {number} page Number of the page that will be displayed
 */
const showPage = (list, page) => {
   let newPageList = getPageList(list, page);
   let oldPageList = parentPage.querySelector('.student-list');
   parentPage.replaceChild(newPageList, oldPageList);
};

/**
 * Dynamically-created UL element containing links acting as page numbers
 * @param {NodeListOf<HTMLLIElement>} list HTML LI elements of students to display
 * @returns {HTMLUListElement} HTML UL element containing links acting as page numbers
 */
const getPageLinks = list => {
   const numberOfPages = Math.ceil(list.length / maxListItems);

   let pagesList = document.createElement('ul');

   for (let i = 1; i <= numberOfPages; i++) {
      let pagesListItem = document.createElement('li');
      let pageLink = document.createElement('a');
      pageLink.href = "#";
      pageLink.innerHTML = i;

      pagesListItem.appendChild(pageLink);
      pagesList.appendChild(pagesListItem);
   }

   let activeDefault = pagesList.getElementsByTagName('a')[0];
   activeDefault.className = "active";

   pagesList.addEventListener('click', event =>{
      let pageLinks = pagesList.getElementsByTagName('a');
      for (let i = 0; i < pageLinks.length; i++) {
         pageLinks[i].className = "";
      }

      if (event.target.tagName === 'A') {
         let activeLink = event.target;
         activeLink.className = "active";
         showPage(list, event.target.innerHTML);
      }
   });
   return pagesList;
};

/**
 * Display the page numbers by appending the page links to the Pagination Div element
 * @param {NodeListOf<HTMLLIElement>} list HTML LI elements of students to display
 */
const appendPageLinks = list => {
   showPage(list, 1);
   pagination.appendChild(getPageLinks(list));
};

// for testing - delete after next save
appendPageLinks(originalListItems);



// The Student Search Section

/**
 * Dynamically-created 'Student Search' Div
 * @type {HTMLDivElement}
 */
const studentSearch = createNewElement('div', 'student-search');
pageHeader.appendChild(studentSearch);

/**
 * Dynamically-created search input field
 * @type {HTMLInputElement}
 */
const searchInput = document.createElement('input');
searchInput.placeholder = "Search for students...";
studentSearch.appendChild(searchInput);

/**
 * Dynamically-created search button
 * @type {HTMLButtonElement}
 */
const searchButton = document.createElement('button');
searchButton.innerHTML = "Search";
studentSearch.appendChild(searchButton);

/**
 * Dynamically-created H3 element to show no results
 * @type {HTMLHeadingElement}
 */
let showNoResults = document.createElement('h3');
showNoResults.innerHTML = "No results have been found.";
showNoResults.style.display = "none";
parentPage.appendChild(showNoResults);

/**
 * Create a new list from the search results
 * @param {NodeListOf<HTMLHeadingElement} list Heading elements containing the Text Content of student names
 * @param {HTMLInputElement} input Access the input value to match the names of students within the Heading elements
 * @returns {HTMLUListElement} The list of students that match the criteria of the search
 */
const createFilteredList = (list, input) => {
   let filteredList = document.createElement('ul');
   filteredList.className = "student-list";

   let nameInput = input.value.toLowerCase();

   for (let i = 0; i < list.length; i++) {
      let studentName = list[i].innerHTML;
      let spaceBar = studentName.indexOf(" ");
      let firstName = studentName.slice(0, spaceBar);
      let lastName = studentName.slice(spaceBar + 1, studentName.length);

      let studentListItem = list[i].parentNode.parentNode;

      if (firstName.slice(0, nameInput.length) === nameInput) {
         let firstNameMatch = studentListItem.cloneNode(true);
         filteredList.appendChild(firstNameMatch);
      } else if (lastName.slice(0, nameInput.length) === nameInput) {
         let lastNameMatch = studentListItem.cloneNode(true);
         filteredList.appendChild(lastNameMatch);
      } else if (nameInput === studentName) {
         let fullNameMatch = studentListItem.cloneNode(true);
         filteredList.appendChild(fullNameMatch);
      }
   }
   
   return filteredList;
};