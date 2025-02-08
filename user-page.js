import formCard from "./components/form-card.js";
import { generateSurvey } from "./final-survey.js";
import loadModule from "./generator.js";
import changeModule from "./script.js";

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
        {
          tag: 'button',
          attributes: {
            class: 'discard-survey-btn'
          },
          content: 'Logout'
        }
      ],
    },
    {
      tag: "div",
      attributes: {
        class: "admin-main",
      },
      children: [     
      ],
    },
  ],
};

const userPage = loadModule(obj);

const images = ['form1.png', 'form2.webp', 'form3.webp', 'form4.webp', 'form5.webp',]

const logout = userPage.querySelector('.discard-survey-btn');

logout.addEventListener('click', () => {
  changeModule('login');
});

function createCard(survey) {
  const container = userPage.querySelector(".admin-main");

  const form = loadModule(formCard);
  const img = form.querySelector('.form-card-img');
  img.setAttribute('src', `../images/${images[Math.floor(Math.random() * 10) % 5]}`);

  form.data = survey;
  form.addEventListener('click', (e) => {
    console.log(form.data);
    changeModule(`survey/${form.data.id}`);
    setTimeout(() => generateSurvey(form.data));
    
  });

  form.querySelector('.form-card-btn-container').style.display = 'none';

  const title = form.querySelector('.form-card-title');
  title.innerText = form.data.title;
  
  container.append(form);
}

const observer = new MutationObserver((mutationsList, observer) => {
  console.log("Fetching surveys...");
  fetch("http://127.0.0.1:8080/enabled")
    .then(response => {
      if (!response.ok) {
        throw new Error("Not found");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Fetched Data:", data);
      
      data.forEach((survey) => {
        createCard(survey);
      });

      observer.disconnect();
      console.log("Observer disconnected.");
    })
    .catch(error => console.log(error));
});

observer.observe(document.body, { childList: true, subtree: true });


export default userPage;
