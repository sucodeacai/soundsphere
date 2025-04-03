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

function sec2time(timeInSeconds: any) {
  let time: any = parseFloat(timeInSeconds).toFixed(3);
  let hours = Math.floor(time / 60 / 60);
  let minutes = Math.floor(time / 60) % 60;
  let seconds = Math.floor(time - minutes * 60);
  let milliseconds = time.slice(-3);

  return (
    pad(hours, 2) +
    ":" +
    pad(minutes, 2) +
    ":" +
    pad(seconds, 2) +
    "." +
    pad(milliseconds, 3)
  );
}
function pad(num: any, size: any) {
  return ("000" + num).slice(size * -1);
}
function removeAllEvents(elemento: any) {
  const novoElemento = elemento.cloneNode(true); // Clona sem eventos
  elemento.replaceWith(novoElemento); // Substitui o antigo pelo novo
  return novoElemento; // Retorna o novo para que possamos usá-lo
}
function formateDateBr(date: any) {
  const stringDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;

  return stringDate;
}
