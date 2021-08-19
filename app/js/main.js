console.log('привет');
document.addEventListener("DOMContentLoaded", start);

window.onload = function () {
  document.querySelector('body').classList.remove('fixed');
  let preloader = document.querySelector('.preloader');
  preloader.classList.add('anim-opasity');
  let timeOut = setTimeout(() => {
    preloader.classList.add('d-none');
  }, 300);

}

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
          else {
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
      fade: true,
      customPaging: function (slider, i) {
        return '<div class="banner__dot"></div>';
      },
    })
  }
  function productLineSlider() {
    $('.js-products-line-slider').each(function (idx) {
      let productsLineSliderId = "products-line-slider-" + idx;
      this.closest('.products-line-slider').id = productsLineSliderId;
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        customPaging: function (slider, i) {
          return '<div class="products-line-slider__dot"></div>';
        },
        appendDots: '#' + productsLineSliderId + ' .products-line-slider__dots',
        prevArrow: '#' + productsLineSliderId + ' .products-line-slider__btn--prev',
        nextArrow: '#' + productsLineSliderId + ' .products-line-slider__btn--next',
        responsive: [{
          breakpoint: 1139,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        }],
      })
    })
  }
  function tabs(tabItem, tabNavItem) {
    tabNavItem.forEach((elem, index) => {
      elem.addEventListener('click', (e) => {
        for (let i = 0; i < tabNavItem.length; i++) {
          tabNavItem[i].classList.remove('tabs-navigation__item--active');
          e.target.classList.add('tabs-navigation__item--active');
          tabItem[i].classList.remove('tab--active');
        }
        tabItem[index].classList.add('tab--active');
        if (e.target.closest('.hits')) {
          $('.js-products-line-slider').slick('refresh');
        }
      })
    })
  }
  function allTabs() {
    let hits = document.querySelector('.hits');
    let tabNav = hits.querySelectorAll('.tabs-navigation__item');
    let tab = hits.querySelectorAll('.tab');
    let about = document.querySelector('.about');
    let aboutTab = about.querySelectorAll('.tab');
    let aboutTabNav = about.querySelectorAll('.tabs-navigation__item');
    tabs(tab, tabNav);
    tabs(aboutTab, aboutTabNav);
  }
  function sandwich() {
    let sandwich = document.querySelector('.sandwich');
    sandwich.addEventListener('click', () => {
      sandwich.classList.toggle('sandwich--active');
    })
  }

  headerSearch();
  bannerSlider();
  productLineSlider();
  allTabs();
  sandwich();
  function productPrevColor() {
    let productPrev = document.querySelectorAll('.product-prev');
    for (let i = 0; i < productPrev.length; i++) {
      productPrevImg = productPrev[i].querySelectorAll('.product-prev__img');
      productPrevColor = productPrev[i].querySelectorAll('.product-prev__color');
      productPrevImg[0].closest('.product-prev__img-wrapper').style.zIndex = '2';
      productPrevColor[0].style.borderColor = 'transparent';
      
      for (let i = 0; i < productPrevImg.length; i++) {
        productPrevColor[i].style.display = 'inline-block';
        productPrevColor[i].classList.add('color--active');
        let color = productPrevImg[i].dataset.color;
        productPrevColor[i].style.background = `${color}`;
      } 
    }
  }
  function productPrevSlider() {
    let productPrevColor = document.querySelectorAll('.color--active');
    
    for (let i = 0; i < productPrevColor.length; i++) {
      productPrevColor[i].addEventListener('click', (e) => {
        for (let j = 0; j < productPrevColor.length; j++) {
        }
        productPrevColor[i].style.borderColor = '#f74f40';
        let parentElem = productPrevColor[i].closest('.product-prev');
        let productPrevImg = parentElem.querySelectorAll('.product-prev__img');
        let parentProductPrevColor = parentElem.querySelectorAll('.product-prev__color');
        for (let k = 0; k < productPrevImg.length; k++) {
          parentProductPrevColor[k].style.borderColor = '#fff';
          e.target.style.borderColor = 'transparent';
          let color = productPrevImg[k].dataset.color;
          let u = getComputedStyle(productPrevColor[i]);
          let z = u.backgroundColor;
          productPrevImg[k].closest('.product-prev__img-wrapper').style.zIndex = '1';
          if(color == z) {
            productPrevImg[k].closest('.product-prev__img-wrapper').style.zIndex = '10';
          }
        }
      })
    }
  }
  productPrevColor();
  productPrevSlider();
}
