export default function decorate() {
  const cardTips = document.querySelector('.badges.card-tips.block');
  if (cardTips) {
    const parent = cardTips.parentElement.parentElement;
    parent.style.background = '#e2dfd5';
    parent.style.margin = '0.5rem';
    parent.style.paddingBottom = '1rem';

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        parent.style.margin = '0';
      } else {
        parent.style.margin = '0.5rem';
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
  }
}
