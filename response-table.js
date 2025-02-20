import loadModule from "./generator.js";
import { store } from "./store.js";

const obj = {
  tag: "div",
  attributes: {
    class: "response-page",
  },
  children: [
    {
      tag: 'div',
      attributes: {
        class: "response-page-title-container"
      },
      children: [
        {
          tag: "span",
          attributes: {
            class: "admin-header-title",
          },
          content: '',
        },
        {
          tag: "p",
          attributes: {
            
          },
          content: '',
        },  
      ]
    },
    {
      tag: "div",
      attributes: {
        class: "response-page-header",
      },
      children: [
        {
          tag: "div",
          attributes: {
            class: "response-page-header-date-container",
          },
          children: [
            {
              tag: "input",
              attributes: {
                type: "date",
                id: "from-date",
                class: "form-input-date",
              },
            },
            {
              tag: "label",
              content: "To",
            },
            {
              tag: "input",
              attributes: {
                type: "date",
                id: "to-date",
                class: "form-input-date",
              },
            },
            {
              tag: "i",
              attributes: {
                'aria-hidden': 'true',
                class: "fa fa-search search-btn",
              },
            },
            {
              tag: "i",
              attributes: {
                'aria-hidden': 'true',
                class: "fa fa-times close-btn",
              },
            },
            
          ],
        },
        {
          tag: "div",
          attributes: {
            class: "response-count-container",
          },
          children: [
            {
              tag: "label",
              content: "Responses per page : ",
            },
            {
              tag: "select",
              attributes: {
                class: "question-card-dropdown border",
              },
              children: [
                {
                  tag: "option",
                  attributes: {
                    value: "5",
                    selected: true,
                  },
                  content: "5",
                },
                {
                  tag: "option",
                  attributes: {
                    value: "10",
                  },
                  content: "10",
                },
                {
                  tag: "option",
                  attributes: {
                    value: "15",
                  },
                  content: "15",
                },
                {
                  tag: "option",
                  attributes: {
                    value: "20",
                  },
                  content: "20",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      tag: "div",
      attributes: {
        class: "response-table-container",
      },
      children: [
        {
          tag: "table",
          attributes: {
            class: "response-table",
          },
          children: [],
        },
      ],
    },
    {
      tag: "div",
      attributes: {
        class: "response-page-footer",
      },
      children: [
        {
          tag: 'span',
          attributes: {},
          content: ''
        },
        {
          tag: "div",
          attributes: {},
          children: [
            {
              tag: "i",
              attributes: {
                'aria-hidden': 'true',
                class: "fa fa-chevron-left prev-btn",
              },
            },
            {
              tag: "i",
              attributes: {
                'aria-hidden': 'true',
                class: "fa fa-chevron-right next-btn",
              },
            },
          ],
        },
      ],
    },
  ],
};

const responsePage = loadModule(obj);


function createTd(data) {
  const td = document.createElement("td");
  td.setAttribute("class", "response-table-cell");
  td.innerText = data;
  return td;
}

function createTh(data) {
  const th = document.createElement("th");
  th.setAttribute("class", "response-table-cell");
  th.innerText = data;
  return th;
}

let currentSurvey = null;
let page = 0;
let size = 5;
let pageCount = 0;
let from = "";
let to = "";
let responseCount = 0;
let isFirst = true;
let isLast = true;
let isFiltered = false;

const title = responsePage.querySelector('.response-page-title-container span');
const id = responsePage.querySelector('.response-page-title-container p');
const pageData = responsePage.querySelector('.response-page-footer span');

function loadTableData(survey) {
  let flag = true;
  currentSurvey = survey;
  if(!isFiltered) responseCount = survey.responseCount;
  title.innerText = currentSurvey.title;
  id.innerText = `Survey ID : ${currentSurvey.id}`;
  const table = document.createElement("table");
  table.setAttribute("class", "response-table");
  const header = document.createElement("tr");
  header.setAttribute("class", "response-table-header response-table-row");
  header.append(createTh("Response ID"));
  header.append(createTh("Responded By"));
  header.append(createTh("Responded At"));
  survey.questions.forEach((question) => {
    header.append(createTh(question.question));
  });
  table.append(header);
  fetch(
    `${store.baseUrl}response/survey/${survey.id}?page=${page}&size=${size}&from=${from}&to=${to}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Not found");
      }
      return response.json();
    })
    .then((data) => {
      responseCount = data.totalElements;
      isFirst = data.first;
      isLast = data.last;
      pageCount = data.totalPages;
      data.content.forEach((response) => {
        const tr = document.createElement("tr");
        tr.setAttribute("class", "response-table-row");

        tr.append(createTd(response.id));
        tr.append(createTd(response.respondedBy));
        tr.append(createTd(response.respondedAt));
        for (let res in response.responses) {
          tr.append(createTd(response.responses[res]));
        }
        table.append(tr);
      });
      flag = data.empty;
    })
    .catch((error) => swal("Error", error, "error"))
    .finally(() => {
      const container = responsePage.querySelector(".response-table-container");
      container.replaceChild(table, container.childNodes[0]);
      pageData.innerText = `Page ${flag ? 0 : page + 1} of ${pageCount}`
    });
}

const next = responsePage.querySelector(".next-btn");
const prev = responsePage.querySelector(".prev-btn");
const fromDate = responsePage.querySelector("#from-date");
const toDate = responsePage.querySelector("#to-date");
const search = responsePage.querySelector(".search-btn");
const close = responsePage.querySelector(".close-btn");
const pageSize = responsePage.querySelector(".question-card-dropdown");

pageSize.addEventListener("change", () => {
  size = Number(pageSize.value);
  page = 0;
  loadTableData(currentSurvey);
});

next.addEventListener("click", () => {
  if (!isLast) {
    page++;
    loadTableData(currentSurvey);
  }
});

prev.addEventListener("click", () => {
  if (!isFirst) {
    page--;
    loadTableData(currentSurvey);
  }
});

toDate.addEventListener("focus", (e) => {
  if (fromDate.value === "") {
    toDate.value = "";
    fromDate.classList.add("border-red");
    e.preventDefault();
  } else {
    toDate.min = fromDate.value;
  }
});

fromDate.addEventListener("focus", () => {
  fromDate.classList.remove("border-red");
});

toDate.addEventListener("focus", () => {
  toDate.classList.remove("border-red");
});

fromDate.addEventListener("input", () => {
  toDate.value = "";
});

search.addEventListener("click", () => {
  if (fromDate.value === "") {
    fromDate.classList.add("border-red");
    return;
  }
  if (toDate.value === "") {
    toDate.classList.add("border-red");
    return;
  }
  from = fromDate.value;
  to = toDate.value;
  isFiltered = true;
  page = 0;
  loadTableData(currentSurvey);
  
});

close.addEventListener('click', () => {
    page = 0;
    fromDate.value = '';
    toDate.value = '';
    from = '';
    to = '';
    isFiltered = false;
    isFirst = true;
    isLast = true;
    loadTableData(currentSurvey);
})

export { responsePage, loadTableData };
