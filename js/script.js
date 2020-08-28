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
 * Dynamically-created 'Pagination' Div element
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

console.log(getPageList(originalListItems, 1));

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