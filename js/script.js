/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/***
This "List Filter and Pagination" application takes a list of students,
tallies up the total and displays a maximum of ten students per page.
 
A new page is created every time the limit of tenstudents is reached.

Students can also be filtered by search.
***/


// The parent node to append the pagination links to
const mainPage = document.querySelector('.page');

// The list of students to filter out and paginate
const studentItems = document.querySelectorAll('.student-item');

// The parent node to append the student search bar to
const pageHeader = document.querySelector('.page-header');


// createNewElement function
   // Helper function to create and append new elements
const createNewElement = (elementName, parentName) => {
   let newElement = document.createElement(elementName);
   parentName.appendChild(newElement);
   return newElement;
};

// Pagination Section
const pagination = createNewElement('div', mainPage);
pagination.className = "pagination";

// Student Search Section
const studentSearch = createNewElement('div', pageHeader);
studentSearch.className = "student-search";

const hideList = list => {
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
   }
};

// showPage function
const showPage = (list, page) => {
   
   hideList(list);

   const itemsPerPage = 10;

   // determine the position of each list item
   // that will be displayed on a given page
   let firstIndex = itemsPerPage * (page - 1);
   let lastIndex = itemsPerPage + firstIndex;

   // each list item will be made visible if they are within
   // the first and last index position of the given page number
   if (list.length < lastIndex) {
      lastIndex = list.length;
      for (let i = firstIndex; i < lastIndex; i++) {
         list[i].style.display = "";
      }
   } else {
      for (let i = firstIndex; i < lastIndex; i++) {
         list[i].style.display = "";
      }
   }
};


// appendPageLinks function
const appendPageLinks = list => {

   // display the first page by default
   showPage(list, 1);

   // determine the total number of pages
   const totalPages = Math.ceil(list.length / 10);

   // create the unordered list as a child of the pagination div
   let paginationList = createNewElement('ul', pagination);

   // create the pagination page numbers
   for (let i = 1; i <= totalPages; i++) {
      let listItem = createNewElement('li', paginationList);

      let link = createNewElement('a', listItem);
      link.href = "#";
      link.innerHTML = i;
   }

   // set the first page link as active by default
   let activeLink = paginationList.getElementsByTagName('a')[0];
   activeLink.className = "active";

   // add functionality to the links
   paginationList.addEventListener('click', (event) => {

      // trigger the event only if a link is targeted
      if (event.target.tagName === 'A') {
         let links = paginationList.getElementsByTagName('a');
         
         for (let i = 0; i < links.length; i++){
            links[i].className = "";

            if (event.target.innerHTML === links[i].innerHTML) {
               links[i].className = "active";
            }
         }
         showPage(list, event.target.innerHTML);
      }
   });
};


// appendStudentSearch function
const appendStudentSearch = list => {

   // create the search input field
   let searchInput = createNewElement('input', studentSearch);
   searchInput.placeholder = "Search for students...";

   // create the search button
   let searchButton = createNewElement('button', studentSearch);
   searchButton.innerHTML = "Search";

   // create a message if no results are found
   let noResults = createNewElement('h3', mainPage);
   noResults.innerHTML = "No results have been found.";
   noResults.style.display = "none";


   // add functionality to the search button
   studentSearch.addEventListener('click', (event) => {
      let filteredList = list[0].parentNode;
      let inputValue = searchInput.value.toUpperCase();

      // trigger the event only if the button is targeted
      if (event.target.tagName === 'BUTTON') {

         // cycle through the student names found in the h3 tags
         for (let i = 0; i < list.length; i++) {
            let studentName = list[i].getElementsByTagName('h3')[0].innerHTML;

            // display the names which contain any character that matches the input
            if (studentName.toUpperCase().indexOf(inputValue) !== -1) {
               list[i].style.display = "";
            } else {
               list[i].style.display = "none";
            }
         }

         // apply pagination to the search results
         let searchResults = filteredList.querySelectorAll('li[style=""]');
         appendPageLinks(searchResults);
         
         // set conditions for the search results
         if (searchResults.length < 1) {
            hideList(list);
            pagination.style.display = "none";
            noResults.style.display = "";
         } else {
            noResults.style.display = "none";
            pagination.style.display = "";
            
         }

         // remove original pagination buttons
         let originalPaginationLinks = pagination.firstElementChild;
         pagination.removeChild(originalPaginationLinks);
      }
   });
};


appendPageLinks(studentItems);
appendStudentSearch(studentItems);