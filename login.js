import loadModule from "./generator.js";
import changeModule from "./script.js";

const obj = {
  tag: "div",
  attributes: {
    class: 'login-card'
  },
  children: [
    {
      tag: "input",
      attributes: {
        type: "text",
        class: "input-option border",
        placeholder: "User Name",
        autofocus: true
      },
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
            value: "USER",
            selected: true,
          },
          content: "USER",
        },
        {
          tag: "option",
          attributes: {
            value: "ADMIN",
          },
          content: "ADMIN",
        },
      ],
    },
    {
        tag: "button",
        attributes: {
          class: "create-survey-btn",
        },
        content: "Login",
      },
  ],
};

const loginPage = loadModule(obj);

const loginBtn = loginPage.querySelector('.create-survey-btn');
const userName = loginPage.querySelector('.input-option');

userName.addEventListener('focus', () => {
    userName.classList.remove('border-red');
});


loginBtn.addEventListener('click', () => {
    const role = loginPage.querySelector('.question-card-dropdown').value;
    let flag = true;

    if(userName.value === ''){
        userName.classList.add('border-red');
        flag = false;
        alert("Enter user name");
    }
    else userName.classList.remove('border-red');

    if(flag) {
        if(role === 'ADMIN'){
            changeModule('admin');
        }
        else changeModule('user');
    }
    
});

export default loginPage;
