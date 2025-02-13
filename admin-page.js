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
    console.log(form.data);
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
      fetch(`http://127.0.0.1:8080/enable/${form.data.id}`, {
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
          console.log(data);
          form.data = data;
        })
        .catch((error) => console.log(error));
    } else {
      fetch(`http://127.0.0.1:8080/disable/${form.data.id}`, {
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
          console.log(data);
          form.data = data;
        })
        .catch((error) => console.log(error));
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
        fetch(`http://127.0.0.1:8080/${form.data.id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Not found");
            }
            return response.text();
          })
          .then((data) => {
            console.log(data);
            if (data === "Deleted Successfully!!") {
              fetch(`http://127.0.0.1:8080/response/survey/${form.data.id}`, {
                method: "DELETE",
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Not found");
                  }
                  return response.text();
                })
                .then((data) => {
                  console.log(data);
                  container.removeChild(form);
                  swal({
                    title: "Survey deleted Successfully",
                    icon: "success",
                  });
                })
                .catch((error) => console.log(error));
            }
            container.removeChild(form);
          })
          .catch((error) => console.log(error));
      }
    });
  });

  container.append(form);
}

function loadAdminPage() {
  adminPage.querySelector(".profile").innerText = store.name;
  fetch("http://127.0.0.1:8080/")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched Data:", data);

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
    .catch((error) => console.log(error));
}

export default adminPage;
export { createCard, loadAdminPage };
