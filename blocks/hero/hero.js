export default async function decorate(block) {
  const button = block.querySelector('.hero.block .button-container');
  const caption = block.querySelector('.hero.block p');
  
  caption.classList.add('caption');
  button.classList.add('shop-button');

  const heroParent = block.children[0];
  heroParent.classList.add('hero-brand-parent');
  const heroChild = heroParent.children[0];
  heroChild.classList.add('hero-brand-description');
  const heroVideo = document.createElement('div');
  block.append(heroVideo);
  heroVideo.classList.add('hero-video-container');

  const heroVideoWrapper = document.createElement('div');
  heroVideoWrapper.classList.add('hero-video-wrapper');
  heroVideoWrapper.innerHTML = `
  <video 
    id="hero-video"
    autoplay 
    muted
    controls 
    loop 
    playsinline
    title="Promotional video showcasing product features"
    aria-label="Promotional video showcasing product features"
  >
    <source src="https://newellbrands.scene7.com/is/content/NewellRubbermaid/244621433_CL_DEC_DTC_HP2_Hero_Masonry75_TNF" type="video/mp4">
    Your browser does not support the video tag. Please view the transcript or contact support.
  </video>
  <div class="video-transcript" style="display:none;">
    <p>
      This video highlights the features of the product, demonstrating its usage in various scenarios.
    </p>
  </div>

  `;
  heroVideo.append(heroVideoWrapper);
}
