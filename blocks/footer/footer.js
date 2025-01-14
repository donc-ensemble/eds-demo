import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) {
    footer.append(fragment.firstElementChild);
  }
  block.append(footer);

  // Setup mobile dropdowns
  function setupMobileDropdowns() {
    const sections = block.querySelectorAll('.section');

    sections.forEach((section) => {
      const strong = section.querySelector('strong');
      const wrapper = section.querySelector('.default-content-wrapper');

      // Move strong element outside the wrapper
      if (strong && strong.parentElement.tagName === 'P') {
        const strongP = strong.parentElement;
        wrapper.removeChild(strongP);
        section.insertBefore(strong, wrapper);
      }

      // Add click handler
      strong.addEventListener('click', () => {
        if (window.innerWidth <= 785) {
          // Match your media query breakpoint
          section.classList.toggle('active');
        }
      });
    });
  }

  // Run setup
  setupMobileDropdowns();

  // Handle window resize
  window.addEventListener('resize', () => {
    const sections = block.querySelectorAll('.section');
    if (window.innerWidth > 785) {
      sections.forEach((section) => {
        section.classList.remove('active');
      });
    }
  });
}
