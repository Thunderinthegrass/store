console.log('привет');
document.addEventListener("DOMContentLoaded", start);

function start() {
  //выпадающее меню
  let mainSubnavItem = document.querySelectorAll('.main-subnav__item');

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

  //search
  function headerSearch() {
    let searchIcon = document.querySelector('.search__icon');
    let search = document.querySelector('.search');

    function openSearchForm() {
      searchIcon.addEventListener('click', () => {
        search.classList.add('search--open');
      })
    }
    function clearSearchForm() {
      let searchClear = document.querySelector('.search__clear');
      searchClear.addEventListener('click', () => document.querySelector('.search__input').value = ''); 
    }
    function searchHide() {
      document.addEventListener('click', (e) => {
        if (search.classList.contains('search--open')) {
          if ((e.target.classList.contains('search--hide')) == false) {
          search.classList.remove('search--open');
        }
        }
      })
    }
    mainSubnavHover();
    openSearchForm();
    clearSearchForm();
    searchHide();
  
  }
  function bannerSlider() {
    $('.js-banner').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      prevArrow: '.banner__navigation--prev',
      nextArrow: '.banner__navigation--next',
      dots: true,
      customPaging : function(slider, i) {
        return '<a class="banner__dot"></a>';
      },
    })
  }
  function tabs() {
    let tabNav = document.querySelectorAll('.tabs-navigation__item');
    let tab = document.querySelectorAll('.tab');
    tabNav.forEach((elem, index) => {
      elem.addEventListener('click', (e) => {
        for (let i = 0; i < tabNav.length; i++) {
          tabNav[i].classList.remove('tabs-navigation__item--active');
          e.target.classList.add('tabs-navigation__item--active');
          tab[i].classList.remove('tab--active');
        }
        tab[index].classList.add('tab--active');
      })
    })
  }

  headerSearch();
  bannerSlider();
  tabs();
}