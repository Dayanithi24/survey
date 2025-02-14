export default function loadModule(obj) {
  const keys = Object.keys(obj);
  let element;
  for (const c of keys) {
    if (c === "tag") {
      element = document.createElement(obj.tag);
    } else if (c === "children") {
      if (obj.count) {
        for (let i = 0; i < obj.count; i++) {
          for (const object of obj.children) {
            element.appendChild(loadModule(object));
          }
        }
      } else {
        for (const object of obj.children) {
          element.appendChild(loadModule(object));
        }
      }
    } else if (c === "content") {
      element.appendChild(document.createTextNode(obj.content));
    } else if (c === "style") {
      for (const s of Object.keys(obj.style)) {
        element.style[s] = obj.style[s];
      }
    } else if (c === "attributes") {
      for (const s of Object.keys(obj.attributes)) {
        if (obj.attributes[s] instanceof Function) {
          element.setAttribute(s, obj.attributes[s](k));
        } else element.setAttribute(s, obj.attributes[s]);
      }
    }
  }
  return element;
}
