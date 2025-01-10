function getVisibleItems() {
  const windowWidth = window.innerWidth;

  if (windowWidth >= 1280) {
    return 6;
  } else if (windowWidth >= 768) {
    return 4;
  } else {
    return 2.5;
  }
}

function createContainer() {
  const container = document.createElement("div");
  container.className = "carousel-container-block";
  return container;
}

function createWrapper() {
  const wrapper = document.createElement("div");
  wrapper.className = "carousel-wrapper-block";
  return wrapper;
}

function createNavigationButtons() {
  const prevButton = createButton("prev", "←", moveCarousel.bind(null, -1));
  const nextButton = createButton("next", "→", moveCarousel.bind(null, 1));
  return [prevButton, nextButton];
}

function createButton(className, text, onClick) {
  const button = document.createElement("button");
  button.className = `carousel-button ${className}`;
  button.onclick = onClick;
  button.textContent = text;
  return button;
}

function createCarouselItem(item) {
  const newItem = document.createElement("div");
  newItem.className = "carousel-item";

  const picture = item.querySelector("picture");
  if (picture) {
    newItem.appendChild(picture.cloneNode(true));
  }

  const text = item.querySelector("p");
  if (text) {
    const p = document.createElement("p");
    p.textContent = text.textContent;
    newItem.appendChild(p);
  }

  return newItem;
}

function fillGaps(wrapper, originalItems) {
  const totalItems = originalItems.length;
  const visibleItems = getVisibleItems();
  const itemsToFill = visibleItems - (totalItems % visibleItems);

  if (itemsToFill > 0 && itemsToFill < visibleItems) {
    for (let i = 0; i < itemsToFill; i++) {
      const borrowIndex = totalItems - visibleItems + i;
      const borrowedItem =
        wrapper.children[borrowIndex % totalItems].cloneNode(true);
      wrapper.appendChild(borrowedItem);
    }
  }
}

function getTotalGroups() {
  const items = document.querySelectorAll(".carousel-item");
  const visibleItems = getVisibleItems();
  const totalItems = items.length;

  return Math.ceil(totalItems / visibleItems) - 1;
}

function updateButtonState() {
  const totalGroups = getTotalGroups();
  const prevButton = document.querySelector(".carousel-button.prev");
  const nextButton = document.querySelector(".carousel-button.next");

  if (prevButton && nextButton) {
    prevButton.disabled = currentGroup <= 0;
    nextButton.disabled = currentGroup >= totalGroups;

    const items = document.querySelectorAll(".carousel-item");
    const visibleItems = getVisibleItems();
    const shouldShowButtons = items.length > visibleItems;

    prevButton.style.display = shouldShowButtons ? "flex" : "none";
    nextButton.style.display = shouldShowButtons ? "flex" : "none";
  }
}

let currentGroup = 0;

function moveCarousel(direction) {
  const wrapper = document.querySelector(".carousel-wrapper-block");
  const totalGroups = getTotalGroups();

  currentGroup = Math.max(0, Math.min(totalGroups, currentGroup + direction));

  const visibleItems = getVisibleItems();
  const translateX = -(currentGroup * (100 / visibleItems) * visibleItems);
  wrapper.style.transform = `translateX(${translateX}%)`;

  updateButtonState();
}

export default function decorate(block) {
  transformCarousel(block);
  updateButtonState();

  window.addEventListener("resize", () => {
    currentGroup = 0;
    const wrapper = document.querySelector(".carousel-wrapper-block");
    if (wrapper) {
      wrapper.style.transform = "translateX(0)";
    }
    updateButtonState();
  });
}

function transformCarousel(block) {
  if (!block) return;

  const originalCarousel = block;
  const newContainer = createContainer();
  const wrapper = createWrapper();
  const [prevButton, nextButton] = createNavigationButtons();

  const originalItems = Array.from(originalCarousel.children);
  originalItems.forEach((item) => {
    wrapper.appendChild(createCarouselItem(item));
  });

  fillGaps(wrapper, originalItems);

  newContainer.appendChild(prevButton);
  newContainer.appendChild(wrapper);
  newContainer.appendChild(nextButton);

  originalCarousel.parentNode.replaceChild(newContainer, originalCarousel);
}
