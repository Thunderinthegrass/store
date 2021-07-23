console.log('привет');
document.addEventListener("DOMContentLoaded", start);

function start() {
  let mainSubnavItem = document.querySelectorAll('.main-subnav__item');
  // let mainSubnavList = document.querySelectorAll('.main-subnav__list');
  // let mainNavDropdown = document.querySelector('.main-nav__dropdown');

  function mainSubnavHover() { 


    mainSubnavItem.forEach((elem, index) => {
      let parentList = elem.closest('.main-subnav__list');
      let mainNavDropdown = elem.closest('.main-nav__dropdown');

      elem.addEventListener('mouseenter', () => {
        if (elem.children[1]) {
          let navHeight = elem.children[1].offsetHeight;
          if (parentList.offsetHeight < navHeight) {
            parentList.style.height = `${navHeight}px`;
          }
          else{
            elem.children[1].style.height = `${mainNavDropdown.offsetHeight}px`;
          }
        }
      })
      elem.addEventListener('mouseleave', () => {
        parentList.style.height = 'auto';
      })
    })
  }

  mainSubnavHover();
}
