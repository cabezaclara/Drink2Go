'use strict';

// Открытие меню в мобильной версии
var navMain = document.querySelector('.main-nav');
var navToggle = document.querySelector('.main-nav__toggle');

navMain.classList.remove('main-nav--nojs');

navToggle.addEventListener('click', function() {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

// Слайдер Swiper
var swiper = new Swiper(".mySwiper",
  {
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// Карта Leaflet
/* global L:readonly */
const map = L.map('map', { scrollWheelZoom: false})
.setView({
  lat: 59.968407,
  lng: 30.317606
}, 17.5);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

var mapPin = L.icon({
  iconUrl: '../img/map-pin.png',

  iconSize:     [38, 50], // size of the icon
  iconAnchor:   [19, 50], // point of the icon which will correspond to marker's location
});

const marker = L.marker(
  {
    lat: 59.968407,
    lng: 30.317606
  },
  {
    icon: mapPin
  }
);

marker.addTo(map);

// Пагинация, скрытие кнопок назад\вперед на первой и последней странице

var paginationItems = document.querySelectorAll(".pagination__item");
var paginationPrev = document.querySelector(".pagination__item--prev");
var paginationNext = document.querySelector(".pagination__item--next");
var paginationCurrent = document.querySelector(".pagination__item--current");

if (paginationCurrent === paginationItems[1]) {
  paginationPrev.classList.add("pagination__item--disabled");
}
if (paginationCurrent === paginationItems[paginationItems.length - 2]) {
  paginationNext.classList.add("pagination__item--disabled");
}

// Сортировка

const select = document.querySelector('.select');
const selectTitle = select.querySelector('.select__title');
const selectLabels = select.querySelectorAll('.select__label');

selectTitle.addEventListener('click', () => {
  if ('active' === select.getAttribute('data-state')) {
    select.setAttribute('data-state', '');
  } else {
    select.setAttribute('data-state', 'active');
  }
});

for (let i = 0; i < selectLabels.length; i++) {
  selectLabels[i].addEventListener('click', (evt) => {
    selectTitle.textContent = evt.target.textContent;
    select.setAttribute('data-state', '');
  });
}
