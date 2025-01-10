import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

const isDesktop = window.matchMedia("(min-width: 1024px)");

export default async function decorate(block) {
  const navMeta = getMetadata("nav");
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : "/nav";
  const fragment = await loadFragment(navPath);

  block.textContent = "";
  const nav = document.createElement("nav");
  nav.id = "nav";
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);
  nav.children[0].classList.add("row-brand");

  nav.children[1].classList.add("nav-middle");
  const middle = nav.querySelector(".nav-middle  p");
  nav.children[2].classList.add("main-menu");

  const burgerMenu = document.createElement("div");
  burgerMenu.classList.add("burger-menu");
  burgerMenu.setAttribute("aria-controls", "nav");
  burgerMenu.setAttribute("aria-label", "Open navigation");
  middle.prepend(burgerMenu);
  burgerMenu.innerHTML = `
        <div class="bar1"></div>
        <div class="bar2"></div>
        <div class="bar3"></div>
      `;

  const mainMenu = nav.querySelector(".main-menu .default-content-wrapper");

  burgerMenu.addEventListener("click", () => {
    burgerMenu.classList.toggle("change");
    mainMenu.classList.toggle("menu-active");
  });
  const navMiddleContentWrapper = nav.querySelector(".nav-middle");

  const search = document.createElement("div");
  search.classList.add("nav-search");
  navMiddleContentWrapper.append(search);
  search.innerHTML = `
    <div class="search-container">
      <form role="search" aria-labelledby="search-label" class="search-form">
        <input 
          type="text" 
          id="search-input" 
          name="search-input" 
          placeholder="What are you looking for?" 
          aria-label="Search input" 
          autocomplete="off" 
        />
        <button 
          type="submit" 
          aria-label="Submit search" 
          class="search-btn">
          <i class="search-icon"></i>
        </button>
      </form>
    </div>
`;

  if (isDesktop.matches) {
    mainMenu.classList.remove("menu-active");
  }

  const navWrapper = document.createElement("div");
  navWrapper.className = "nav-wrapper";
  navWrapper.append(nav);
  block.append(navWrapper);
}
