/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   
// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/**
 * This "List Filter and Pagination" application takes a list of students, tallies up the total and
 * displays a maximum of ten students per page.
 * A new page is created every time the limit of tenstudents is reached.
 * Students can also be filtered by search.
 **/


// The parent node to append the pagination links to
const mainPage = document.querySelector('.page');

// The list of students to filter out and paginate
const studentItems = document.querySelectorAll('.student-item');

// The parent node to append the student search bar to
const pageHeader = document.querySelector('.page-header');


// showPage function
const showPage = (list, page) => {
   
   // hide the original list
   for (let i = 0; i < list.length; i++) {
      list[i].style.display = "none";
   }

   const itemsPerPage = 10;

   // determine the position of each list item
   // that will be displayed on a given page
   let firstIndex = itemsPerPage * (page - 1);
   let lastIndex = itemsPerPage + firstIndex;

   // each list item will be made visible if they
   // are within the first and last index position
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
const appendPageLinks = list => {};


// appendStudentSearch function
const appendStudentSearch = list => {};