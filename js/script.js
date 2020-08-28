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
 * Original List
 * @type {HTMLUListElement}
 */
const originalList = document.querySelector('.student-list');

/**
 * Original List Items
 * @type {NodeListOf<HTMLLIElement>}
 */
const originalListItems = document.querySelectorAll('.student-item');

/**
 * Max List Items
 * @type {number}
 */
const maxListItems = 10;

