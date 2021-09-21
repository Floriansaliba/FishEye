// importer les  profiles

import showMainPage from "./main.js";

// Récupérer les éléments du DOM
let profilPic = document.getElementsByClassName("profil-pic")[0]
let presentation = document.getElementsByClassName("presentation")[0]
let picturesSection = document.getElementsByClassName("pictures")[0]
let likesNumber = document.getElementsByClassName("counter__likes")[0]
let price = document.getElementsByClassName("counter__price")[0]


// Utiliser 2 Regex pour dissocier les vidéos des images
let regexImg = /.jpeg/
let regexVideo = /.mp4/

idInjection[0].addEventListener("click", () => {
    window.location.href = "./photographer.html"
    profilPic.innerHTML =
      '<img class="profile__img" src="' + profils[0].portrait + '" alt=""></img>';
    presentation.innerHTML =
      '<h2 class="profile__name">' +
      profils[0].name +
      '</h2><p class="profile__location">' +
      profils[0].city +
      '</p><p class="profile__intro">' +
      profils[0].tagline +
      '</p><p class="profile__price">' +
      profils[0].price +
      "€/jour</p>";
    document.body.className = "second-body";
    for (let i = 0; i < source.media.length; i++) {
      if ((source.media[i].photographerId = profils[0].id)) {
        picturesSection.innerHTML +=
          '<div class="pictures__media"><img class = "pictures__pics" src = ./pictures/' +
          source.media[i].image +
          '></img><div class="pictures__description"><p class="pictures__title">' +
          source.media[i].title +
          '</p><p class="pictures__number">' +
          source.media[i].likes +
          '<i class="fas fa-heart"></i></p></div></div>';
      }
    }
    likesNumber.innerHTML = '<p class="counter__likes__number">' + 144 + "</p>";
    price.innerHTML =
      '<p class="counter__price__text">' + profils[0].price + "€/jours</p>";
  });