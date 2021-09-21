// importer les  profiles
import source from "./photographes.js";

// récupérer le tableau des photographes
let profils = source.photographers;

// Récupérer l'élément du DOM sur lequel je souhaite créer les profils des photographes
let main = document.getElementsByClassName("main")[0];

//Insérer une div de class "profile" pour chaque photographe

const createDivForEachProfil = () => {
  for (let i = 0; i < profils.length; i++) {
    main.innerHTML += '<div class="profile">';
  }
};


createDivForEachProfil();




// on récupère toutes les div de class "profile"

const divProfile = document.getElementsByClassName("profile");

const createContent = () => {
  // Créer les éléments à ajouter dans les div de class "profile"
  const insideDivProfile =
    '<div class="photographs-id" id=""><img class="profile__img" src="" alt=""></img><h2 class="profile__name">exemple</h2><p class="profile__location">exemple</p><p class="profile__intro">exemple</p><p class="profile__price"></p><ul class="profile__skills"></ul></div>';

  // Ajouter les éléments dans les div de class "profile"
  for (let i = 0; i < divProfile.length; i++) {
    divProfile[i].innerHTML += insideDivProfile;
  }
};

createContent();

let profileName = document.getElementsByClassName("profile__name");
let profileLocation = document.getElementsByClassName("profile__location");
let profileIntro = document.getElementsByClassName("profile__intro");
let profileImage = document.getElementsByClassName("profile__img");
let profilePrice = document.getElementsByClassName("profile__price");
let profileTag = document.getElementsByClassName("profile__skills");
let idInjection = document.getElementsByClassName("photographs-id");


// Récupérer les tags et les insérer dans le HTML


for (let i = 0; i < profils.length; i++) {
  // Injecter le nom des photographes dans le HTML
  profileName[i].textContent = profils[i].name;
  // Injecter la localisation des photographes dans le HTML
  profileLocation[i].textContent = profils[i].city + ", " + profils[i].country;
  // Injecter les phrases de présentation des photographes dans le HTML
  profileIntro[i].textContent = profils[i].tagline;
  // Injecter les photos des photographes dans le HTML
  profileImage[i].src = profils[i].portrait;
  // Injecter les tarifs des photographes dans le HTML
  profilePrice[i].textContent = profils[i].price + "€/jour";
  // Changer dynamiquement l'ID de la div de class "photographs-id" afin d'inclure l'ID de chaque photographe
  idInjection[i].id = profils[i].id;
}


// Pour chaque tag tu tableau tags : créer un innerHtml 

const tags = profils.map((profil) => {
  return {
    tag: profil.tags,
  };
});


for (let i=0; i<tags.length; i++){
  //Insérer une balise <li> dans le HTML
  tags[i].tag.forEach(tag =>{profileTag[i].innerHTML += `<li class="btn__speciality"><a class = "btn__speciality__link" href ="">${tag}</a></li>`})
}


// regarder fonction filter
// First class citizen
// Evenement Onload >> Attendre chargement page html


let mainContent = document.getElementsByClassName("main-content")[0]
let photographContent = document.getElementsByClassName("photograph-content")[0]
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







