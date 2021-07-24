const modal = document.getElementById("myModal");

function closeModal() {
  modal.style.display = "none";
}

const span = document.getElementsByClassName("close")[0];
span.onclick = function () {
  closeModal();
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};