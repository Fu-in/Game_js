const socket = io();

const _gameForm = document.getElementById("game-form");
const _btn = document.getElementById("btn_test");
const _message = document.getElementById("msg");
const game_message = document.querySelector(".game-message");
_btn.addEventListener("click", () => {
  socket.emit("message", "Ai apasat butonul");
});
// Message from server
socket.on("message", (message) => {
  outputMessage(message);

  // Scroll down
  game_message.scrollTop = game_message.scrollHeight;
});

// Message submit

_gameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Get message text
  const msg = e.target.elements.msg.value;

  // Emit message to server
  socket.emit("gameMessage", msg);
  _message.value = "";
});

// Output Message to DOM

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="text"> ${message}</p>`;
  game_message.appendChild(div);
}
