import formCard from "./components/form-card.js";
import profile from "./components/profile.js";
import { generateSurvey } from "./final-survey.js";
import loadModule from "./generator.js";
import { loadTableData } from "./response-table.js";
import changeModule from "./script.js";
import { store } from "./store.js";

const obj = {
  tag: "div",
  attributes: {
    class: "admin-container ",
  },
  children: [
    {
      tag: "div",
      attributes: {
        class: "admin-header",
      },
      children: [
        {
          tag: "span",
          attributes: {
            class: "admin-header-title",
          },
          content: "Survey Master",
        },
        profile,
        {
          tag: "div",
          attributes: {
            class: "flex-spb",
          },
          children: [
            {
              tag: "div",
              attributes: {
                class: "tooltip",
              },
              children: [
                {
                  tag: "button",
                  attributes: {
                    id: "create-survey",
                    class: "create-survey-btn",
                  },
                  content: "New",
                },
                {
                  tag: "span",
                  attributes: {
                    class: "tooltiptext",
                  },
                  content: "Create Survey",
                },
              ],
            },
            {
              tag: "button",
              attributes: {
                class: "discard-survey-btn",
              },
              content: "Logout",
            },
          ],
        },
      ],
    },
    {
      tag: "div",
      attributes: {
        class: "admin-main",
      },
      children: [],
    },
  ],
};

const adminPage = loadModule(obj);

const images = [
  "form1.png",
  "form2.webp",
  "form3.webp",
  "form4.webp",
  "form5.webp",
];

const logout = adminPage.querySelector(".discard-survey-btn");

logout.addEventListener("click", () => {
  swal("Sure?", "Do you want to logout?", "warning", {
    buttons: ["No", "Yes"],
    closeOnClickOutside: false,
    dangerMode: true,
  }).then((value) => {
    if (value) {
      swal({
        title: "Logged Out Successfully",
        icon: "success",
      });
      changeModule("login");
    }
  });
});

const createSurvey = adminPage.querySelector("#create-survey");

createSurvey.addEventListener("click", () => {
  changeModule("create-survey");
});

function createCard(survey) {
  const container = adminPage.querySelector(".admin-main");
  const form = loadModule(formCard);
  const img = form.querySelector(".form-card-img");

  img.setAttribute(
    "src",
    `../images/${images[Math.floor(Math.random() * 10) % 5]}`
  );

  form.data = survey;
  form.addEventListener("click", (e) => {
    if (e.target.closest(".form-card-btn-container")) {
      e.stopPropagation();
      return;
    }
    changeModule(`survey/${form.data.id}`);
    setTimeout(() => generateSurvey(form.data));
  });

  const title = form.querySelector(".form-card-title");
  title.innerText = form.data.title;

  const checkbox = form.querySelector(".required");
  checkbox.checked = form.data.active;

  checkbox.addEventListener("change", function (e) {
    e.stopPropagation();
    if (this.checked) {
      fetch(`${store.baseUrl}enable/${form.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Not found");
          }
          return response.json();
        })
        .then((data) => {
          form.data = data;
        })
        .catch((error) => swal("Error", error, "error"));
    } else {
      fetch(`${store.baseUrl}disable/${form.data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Not found");
          }
          return response.json();
        })
        .then((data) => {
          form.data = data;
        })
        .catch((error) => swal("Error", error, "error"));
    }
  });

  const viewResponses = form.querySelector(".view-btn");

  viewResponses.addEventListener("click", () => {
    changeModule(`response/${form.data.id}`);
    loadTableData(form.data);
  });

  const deletesurvey = form.querySelector(".delete-btn");

  deletesurvey.addEventListener("click", () => {
    swal(
      "Are you sure?",
      "If you delete the survey, its responses will also be deleted..",
      "warning",
      {
        buttons: true,
        closeOnClickOutside: false,
        dangerMode: true,
      }
    ).then((value) => {
      if (value) {
        fetch(`${store.baseUrl}${form.data.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Not found");
            }
            return response.text();
          })
          .then((data) => {
            if (data === "Deleted Successfully!!") {
              fetch(`${store.baseUrl}response/survey/${form.data.id}`, {
                method: "DELETE",
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Not found");
                  }
                  return response.text();
                })
                .then((data) => {
                  container.removeChild(form);
                  swal({
                    title: "Survey deleted Successfully",
                    icon: "success",
                  });
                })
                .catch((error) => swal("Error", error, "error"));
            }
            container.removeChild(form);
          })
          .catch((error) => swal("Error", error, "error"));
      }
    });
  });

  container.append(form);
}

function loadAdminPage() {
  adminPage.querySelector(".profile p").innerText = store.name;
  adminPage.querySelector(".profile").setAttribute("data-avatar", store.name.charAt(0).toUpperCase());
  fetch(`${store.baseUrl}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Not found");
      }
      return response.json();
    })
    .then((data) => {
      const container = adminPage.querySelector(".admin-main");
      let child = container.lastElementChild;
      while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
      }

      data.forEach((survey) => {
        createCard(survey);
      });
    })
    .catch((error) => swal("Error", error, "error"));
}

export default adminPage;
export { createCard, loadAdminPage };
