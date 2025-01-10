export default async function decorate(block) {
  const showcase = block;

  const divs = showcase.children;
  const sherpaDiv = divs[0];
  const chairDiv = divs[1];

  const container = document.createElement('div');
  container.className = 'showcase-container';

  const sherpaSection = document.createElement('div');
  sherpaSection.className = 'sherpa-section';

  const bgDiv = document.createElement('div');
  bgDiv.className = 'sherpa-bg';
  bgDiv.appendChild(sherpaDiv.querySelector('picture').cloneNode(true));

  const contentDiv = document.createElement('div');
  contentDiv.className = 'sherpa-content';
  const content = sherpaDiv.querySelectorAll('p, h2');
  content.forEach((element) => {
    contentDiv.appendChild(element.cloneNode(true));
  });

  sherpaSection.appendChild(bgDiv);
  sherpaSection.appendChild(contentDiv);

  const chairSection = document.createElement('div');
  chairSection.className = 'chair-section';
  chairSection.appendChild(chairDiv.querySelector('picture').cloneNode(true));

  container.appendChild(sherpaSection);
  const shopButton = container.querySelector(
    '.sherpa-section .sherpa-content .button-container'
  );
  shopButton.classList.add('shop-button');
  container.appendChild(chairSection);

  showcase.innerHTML = '';
  showcase.appendChild(container);
}
