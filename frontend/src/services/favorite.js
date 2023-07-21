const noRightClick = (e) => {
  e.preventDefault();
};

function disableRightClick() {
  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("contextmenu", noRightClick);
  });
}

function removeDisableRightClick() {
  document.querySelectorAll("img").forEach((image) => {
    image.removeEventListener("contextmenu", noRightClick);
  });
}

export { disableRightClick, removeDisableRightClick };
