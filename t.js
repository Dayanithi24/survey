import { questionCard } from "./question.js";
import { inputMap } from "./input.js";
import loadModule from "./generator.js";

let k = 1;

const obj = {
  tag: "form",
  attributes: {
    id: "form",
    // method: 'POST'
  },
  children: [
    questionCard,
    {
      tag: "button",
      attributes: {
        id: "more",
      },
      content: "More",
    },
    {
      tag: "input",
      attributes: {
        type: "submit",
        id: "submit",
      },
      content: "Create",
    },
  ],
};

const final = loadModule(obj);
console.log(document.body);
document.body.appendChild(final);

let inputTypes = document.querySelectorAll("#input-type");
let inputAreas = document.querySelectorAll("#input-area");

function attachEventListeners(card) {
  // console.log(card)
  let inputType = card.querySelector("#input-type");
  let inputArea = card.querySelector("#input-area");
  const inc = card.querySelector("#incrementor");
  let dec = card.querySelectorAll("#decrementor");

  inputType.addEventListener("change", () => {
    const element = loadModule(inputMap.get(inputType.value));
    if (
      inputType.value === "multiple choice" ||
      inputType.value === "checkbox"
    ) {
      const label = element.querySelector("#label");
      element.children[0].value = label.value;
      label.addEventListener("input", () => {
        element.children[0].value = label.value;
      });
    }
    const d = element.querySelector("#decrementor");
    if (d) {
      d.addEventListener("click", () => {
        if (dec.length > 1) inputArea.removeChild(d.parentElement);
        dec = card.querySelectorAll("#decrementor");
      });
    }
    if (
      !(inputType.value === "multiple choice" || inputType.value === "checkbox")
    )
      inc.style.display = "none";
    else inc.style.display = "block";
    inputArea.replaceChildren(element);
  });

  inc.addEventListener("click", () => {
    const element = loadModule(inputMap.get(inputType.value));
    if (
      inputType.value === "multiple choice" ||
      inputType.value === "checkbox"
    ) {
      const label = element.querySelector("#label");
      element.children[0].value = label.value;
      label.addEventListener("input", () => {
        element.children[0].value = label.value;
      });
    }
    const d = element.querySelector("#decrementor");
    if (d) {
      d.addEventListener("click", () => {
        if (dec.length > 1) inputArea.removeChild(d.parentElement);
        dec = card.querySelectorAll("#decrementor");
      });
    }
    inputArea.append(element);
    dec = card.querySelectorAll("#decrementor");
  });

  for (let i = 0; i < dec.length; i++) {
    dec[i].addEventListener("click", () => {
      if (dec.length > 1) inputArea.removeChild(dec[i].parentElement);
      dec = card.querySelectorAll("#decrementor");
    });
  }
}

attachEventListeners(final.childNodes[0]);

const form = document.getElementById("form");
const more = document.getElementById("more");

more.addEventListener("click", () => {
  k++;
  console.log(questionCard);
  const newCard = loadModule(questionCard);
  const child = form.childNodes;
  form.insertBefore(newCard, form.childNodes[child.length - 2]);
  attachEventListeners(newCard);
  inputTypes = document.querySelectorAll("#input-type");
  inputAreas = document.querySelectorAll("#input-area");
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const jsonObject = {};
  formData.forEach((value, key) => {
    jsonObject[key] = value;
  });
  console.log(jsonObject);
  // fetch("http://127.0.0.1:8080/",{
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     "Accept": "application/json",
  //   },
  //   body: JSON.stringify(jsonObject),
  // })
  // .then(response => {
  //   if(!response.ok){
  //     throw new Error("Not found")
  //   }
  //   return response.json();
  // })
  // .then(data => console.log(data))
  // .catch(error => console.log(error));
});
