//Substitui o   $(".x").classList.remove(".y");
function removeClassFromElements(selector: string, className: string) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.classList.remove(className);
  });
}
//substitui o $(".x").children("y")!.classList.toggle("black white");
//o Seletor deve ser alterado
function toggleClasses(selector: string, class1: string, class2: string) {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.classList.toggle(class1);
    element.classList.toggle(class2);
  });
}
