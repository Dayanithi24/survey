const body = document.body;
const div = document.createElement("div");

async function changeModule(pathname) {
  try {
    switch (pathname) {
      case "admin":
        const adminPage = await import("./admin-page.js");
        div.replaceChild(adminPage.default, div.childNodes[0]);
        break;
      case "user":
        const userPage = await import("./user-page.js");
        div.replaceChild(userPage.default, div.childNodes[0]);
        break;
      case "create-survey":
        const createSurvey = await import("./create-survey.js");
        div.replaceChild(createSurvey.default, div.childNodes[0]);
        break;
      case "new-survey":
        const newSurvey = await import("./new-survey.js");
        div.replaceChild(newSurvey.newSurveyModule, div.childNodes[0]);
        break;
    }
    history.pushState({ path: pathname }, "", pathname);
  } catch (error) {
    console.log(error);
  }
}


window.addEventListener("popstate", (event) => {
  const path = event.state?.path || "hello.html";
  changeModule(path);
});

div.append(document.createElement('span'));
body.appendChild(div);

changeModule('admin');

export default changeModule;
