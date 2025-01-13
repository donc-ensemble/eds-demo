function createCard(product) {
  const card = document.createElement('div');
  card.className = 'product-card';
  if (Number(product.bestseller)) {
    const bestsellerTag = document.createElement('div');
    bestsellerTag.className = 'bestseller-tag';
    bestsellerTag.innerText = 'Best Seller';
    card.appendChild(bestsellerTag);
  }

  const image = document.createElement('img');
  image.src = product.image;
  card.appendChild(image);

  const rating = document.createElement('div');
  rating.className = 'product-rating';
  rating.innerHTML = `
    <span>⭐${product.rating}</span>
    <span>(${product.reviews})</span>
  `;
  card.appendChild(rating);

  const label = document.createElement('div');
  label.className = 'product-label';
  label.innerText = product.label;
  card.appendChild(label);

  const price = document.createElement('div');
  price.className = 'product-price';
  price.innerText = `$${(Number(product.price) / 100).toFixed(2)}`;
  card.appendChild(price);

  const actions = document.createElement('div');
  actions.className = 'actions';

  const quantitySelect = document.createElement('select');
  quantitySelect.className = 'quantity-select';
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.innerText = i;
    quantitySelect.appendChild(option);
  }
  actions.appendChild(quantitySelect);

  const addToBagButton = document.createElement('button');
  addToBagButton.className = 'add-to-bag';
  addToBagButton.innerText = 'Add to Bag';
  actions.appendChild(addToBagButton);

  card.appendChild(actions);

  return card;
}

export default async function decorate(block) {
  const products = block.querySelector('a[href$=".json"]');
  const buttonContainer = document.querySelector(
    '.products.carousel.slide.block .button-container',
  );
  if (buttonContainer) {
    buttonContainer.parentElement.remove();
  }

  const pathname = new URL(products.href);
  const productsCarouselBlock = document.querySelector('.products.carousel.slide.block');

  if (products) {
    const res = await fetch(pathname);
    const { data: productList } = await res.json();
    productList.forEach((product) => {
      const productCard = createCard(product);
      productsCarouselBlock.appendChild(productCard);
    });
  }

  const createNavButtons = () => {
    const container = document.querySelector('.products-container');

    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-button prev-button';
    prevButton.innerHTML = '←';

    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-button next-button';
    nextButton.innerHTML = '→';

    container.appendChild(prevButton);
    container.appendChild(nextButton);

    return { prevButton, nextButton };
  };

  const initCarousel = () => {
    const { prevButton, nextButton } = createNavButtons();
    const productsContainer = document.querySelector('.products');
    let currentPosition = 0;

    function getVisibleSlides() {
      if (window.innerWidth >= 1024) {
        return 5;
      }
      if (window.innerWidth >= 768) {
        return 3;
      }
      return 2;
    }

    function updateCarousel() {
      const visibleSlides = getVisibleSlides();
      const cards = document.querySelectorAll('.product-card');
      const maxPosition = Math.max(0, cards.length - visibleSlides);

      currentPosition = Math.min(currentPosition, maxPosition);

      const cardWidth = cards[0].offsetWidth;
      const gap = Number(window.getComputedStyle(productsContainer).gap);
      const slideAmount = cardWidth + gap;

      const translateX = currentPosition * -slideAmount;
      productsContainer.style.transform = `translateX(${translateX}px)`;

      prevButton.disabled = currentPosition <= 0;
      nextButton.disabled = currentPosition >= maxPosition;
    }

    prevButton.addEventListener('click', () => {
      if (currentPosition > 0) {
        currentPosition--;
        updateCarousel();
      }
    });

    nextButton.addEventListener('click', () => {
      const visibleSlides = getVisibleSlides();
      const cards = document.querySelectorAll('.product-card');
      const maxPosition = cards.length - visibleSlides;

      if (currentPosition < maxPosition) {
        currentPosition++;
        updateCarousel();
      }
    });

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        currentPosition = 0;
        updateCarousel();
      }, 100);
    });

    updateCarousel();
  };

  initCarousel();
}
