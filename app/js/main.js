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
  // function productPrevSlider() {
  //   $('.product-prev__slider').each(function (idx) {
  //     let productPrevSliderClass = "product-prev__slider-" + idx;
  //     this.closest('.product-prev').classList.add(productPrevSliderClass);
  //     $(this).slick({
  //       slidesToShow: 1,
  //       slidesToScroll: 1,
  //       // infinite: true,
  //       arrows: false,
  //       dots: true,
  //       fade: true,
  //       swipe: false,
  //       infinity: false,
  //       appendDots: '.' + productPrevSliderClass + ' .product-prev__colors',
  //       customPaging: function (slider, i) {
  //         let color = $('.product-prev__img').eq(i).data('color');
  //         // console.log(color);
  //         return '<a class="product-prev__color" style="background-color:' + color + '"></a>'
  //       }
  //     })
  //   })
  // }
  function productLineSlider() {
    $('.js-products-line-slider').each(function (idx) {
      let productsLineSliderId = "products-line-slider-" + idx;
      this.closest('.products-line-slider').id = productsLineSliderId;
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        appendDots: '#' + productsLineSliderId + ' .products-line-slider__dots',
        prevArrow: '#' + productsLineSliderId + ' .products-line-slider__btn--prev',
        nextArrow: '#' + productsLineSliderId + ' .products-line-slider__btn--next',
        responsive: [{
          breakpoint: 1139,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            customPaging: function (slider, i) {
              return '<div class="products-line-slider__dot"></div>';
            }
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
          // $('.product-prev__slider').slick('refresh');
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
  // productPrevSlider();
  productLineSlider();
  allTabs();
  sandwich();

  function productPrev() {
    let productPrevSlider = document.querySelector('.product-prev__slider');
    let productPrevColor = document.createElement('div');
    productPrevColor.className = 'product-prev__color';


    let productPrevImg = productPrevSlider.querySelector('.product-prev__img');
    let productPrevColors = document.querySelector('.product-prev__colors');
    productPrevColors.appendChild(productPrevColor);
    let color = productPrevImg.dataset.color;
    console.log(color);
    productPrevColor.style.background = `${color}`;
  }

  function productPrevSlider1() {
    let productPrev = document.querySelectorAll('.product-prev');
    let productPrevSlider = document.querySelectorAll('.product-prev__slider');
    let productPrevImg;
    let productPrevColors;


    for (let i = 0; i < productPrevSlider.length; i++) {
      productPrevImg = productPrevSlider[i].querySelectorAll('.product-prev__img');
      productPrevColors = productPrev[i].querySelector('.product-prev__colors');
      console.log(productPrevImg.length);
      let colorId = 1;

      for (let k = 0; k < productPrevImg.length; k++) {
        let productPrevColor = document.createElement('div');
        productPrevColor.className = 'product-prev__color';
        productPrevColor.id = `elem${colorId}`;
        let color = productPrevImg[k].dataset.color;
        productPrevColor.style.background = `${color}`;
        productPrevColors.appendChild(productPrevColor);
        colorId++;

        productPrevColor.addEventListener('click', () => {
          productPrevColor.style.background = '#000';
        })
      }
    }
  }
  function productPrevColor() {
    let productPrev = document.querySelectorAll('.product-prev');
    for (let i = 0; i < productPrev.length; i++) {
      productPrevImg = productPrev[i].querySelectorAll('.product-prev__img');
      productPrevColor = productPrev[i].querySelectorAll('.product-prev__color');
      console.log(productPrevImg.length);
      
      for (let i = 0; i < productPrevImg.length; i++) {
        productPrevColor[i].style.display = 'inline-block';
        productPrevColor[i].classList.add('d-block');
        productPrevColor[i].classList.add('color--active');
        let color = productPrevImg[i].dataset.color;
        productPrevColor[i].style.background = `${color}`;
      } 
    }
  }


  function productPrevSlider() {
    let productPrevColor = document.querySelectorAll('.color--active');
    // console.log(`длина color--active ${productPrevColor.length}`)
    for (let i = 0; i < productPrevColor.length; i++) {
      productPrevColor[i].addEventListener('click', (e) => {
        let parentElem = productPrevColor[i].closest('.product-prev');
        // console.log(`родитель ${parentElem.classList}`);
        let z = getComputedStyle(productPrevColor[i]);
        console.log(z.backgroundColor);
        let productPrevImg = parentElem.querySelectorAll('.product-prev__img');
        console.log(`длина картинок ${productPrevImg.length}`);
        for (let k = 0; k < productPrevImg.length; k++) {
          let color = productPrevImg[k].dataset.color;
          let u = getComputedStyle(productPrevColor[i]);
          let z = u.backgroundColor;
          // console.log(color)
          // console.log(z)
          productPrevImg[k].closest('.product-prev__img-wrapper').style.zIndex = '1';
          if(color == z) {
            productPrevImg[k].closest('.product-prev__img-wrapper').style.zIndex = '10';
          }
        }
        console.log(i)
      })
    }
  }

  productPrevColor();
  productPrevSlider();
  // let z = document.querySelector('.header-basket');
  // let zStyle = getComputedStyle(z);
  // console.log(zStyle.backgroundColor)
}
// productPrevColor[i].addEventListener('click', () => {
//   let z = getComputedStyle(productPrevColor[i]);
//   console.log(z.backgroundColor);
//   if (z.backgroundColor == color) {
//     console.log(i);
//     let imgWrapper = productPrevImg[i].closest('.product-prev__img-wrapper');
//     imgWrapper.style.zIndex = '10';
//     // let u = getComputedStyle(productPrevImg[i]);
//     // console.log(u.zIndex);
//   }
// })