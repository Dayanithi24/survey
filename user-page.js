import formCard from "./components/form-card.js";
import { generateSurvey } from "./final-survey.js";
import loadModule from "./generator.js";
import changeModule from "./script.js";
import profile from "./components/profile.js";
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
  swal("Sure?", "Do you want to logout?", "warning", {
    buttons: ["No", "Yes"],
    closeOnClickOutside: false,
    dangerMode: true
  })
  .then((value) => {
    if(value){
      swal({
        title: "Logged Out Successfully",
        icon: "success"
      });
      changeModule("login");
    }
  });
});

function createCard(survey) {
  const container = userPage.querySelector(".admin-main");

  const form = loadModule(formCard);
  const img = form.querySelector('.form-card-img');
  img.setAttribute('src', `../images/${images[Math.floor(Math.random() * 10) % 5]}`);

  form.data = survey;
  form.addEventListener('click', (e) => {
    changeModule(`survey/${form.data.id}`);
    setTimeout(() => generateSurvey(form.data));
    
  });

  form.querySelector('.form-card-btn-container').style.display = 'none';

  const title = form.querySelector('.form-card-title');
  title.innerText = form.data.title;
  
  container.append(form);
}
  
function loadUserPage(){

  userPage.querySelector('.profile p').innerText = store.name;
  userPage.querySelector(".profile").setAttribute("data-avatar", store.name.charAt(0).toUpperCase());

  fetch(`${store.baseUrl}enabled`)
  .then(response => {
      if (!response.ok) {
        throw new Error("Not found");
      }
      return response.json();
    })
    .then((data) => {   
      const container = userPage.querySelector(".admin-main");
      let child = container.lastElementChild;

      while (child) {
        container.removeChild(child);
        child = container.lastElementChild;
      }
      data.forEach((survey) => {
        createCard(survey);
      });
    })
    .catch(error => swal("Error", error, "error"));
}


export default userPage;
export {loadUserPage};
