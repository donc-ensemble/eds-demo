export default function decorate(block) {
  const buttons = block.querySelectorAll(".card .button-container");
  buttons.forEach((button) => {
    button.classList.add("shop-button", "learn-btn");
  });
}
