const subTitles = ["Full stack software developer", "Possibly your next best hire", "Delivering solutions from the Himalayas"];
let subTitleIndex = 0;
let i = 0;
let reverse = false;
function typeWriter(containerId = "subtitle-container") {
  const textJitter = Math.floor(Math.random() * (70 - 45) + 45);
  let currentText = subTitles[subTitleIndex];
  if (reverse) {
    handleTextRemoval(containerId, textJitter);
  } else {
    handleTextTyping(containerId, currentText, textJitter);
  }
}
function handleTextRemoval(containerId, textJitter) {
  const container = document.getElementById(containerId);
  if (container.innerHTML.length > 0) {
    container.innerHTML = container.innerHTML.slice(0, -1);
    setTimeout(() => typeWriter(containerId), textJitter);
  } else {
    moveToNextSubtitle(containerId);
  }
}
function handleTextTyping(containerId, currentText, textJitter) {
  if (i === currentText.length) {
    i = 0;
    reverse = true;
    setTimeout(() => typeWriter(containerId), 3000);
  } else {
    if (i < currentText.length) {
      document.getElementById(containerId).innerHTML += currentText.charAt(i);
      i++;
      setTimeout(() => typeWriter(containerId), textJitter);
    }
  }
}
function moveToNextSubtitle(containerId) {
  subTitleIndex = (subTitleIndex + 1) % subTitles.length;
  reverse = false;
  i = 0;
  setTimeout(() => typeWriter(containerId), 1000);
}
export { typeWriter };