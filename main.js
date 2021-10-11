// importer les  profiles
import source from "./photographes.js";

// Créer un tableau avec le profil des photographes
const profilsTable = source.photographers.map((profil) => {
  return {
    name: profil.name,
    id: profil.id,
    city: profil.city,
    country: profil.country,
    tags: profil.tags,
    tagline: profil.tagline,
    price: profil.price,
    portrait: profil.portrait,
  };
});

// Créer un tableau avec les caractéristiques des médias
const mediaTable = source.media.map((media) => {
  return {
    id: media.id,
    photographerId: media.photographerId,
    title: media.title,
    picture: media.image,
    tags: media.tags,
    likes: media.likes,
    date: media.date,

    price: media.price,
    video: media.video,
  };
});

/////////////////////////////// PAGE D'ACCEUIL ////////////////////////////////////////////

if (window.location.pathname === "/index.html") {
  // Récupérer l'élément du DOM sur lequel je souhaite créer les profils des photographes
  let main = document.getElementsByClassName("main")[0];

  const render = (array) => {
    // Vider la div de class "main"
    main.innerHTML = "";
    //Insérer le titre
    main.innerHTML = `<h1 class="titre_h1">Nos photographes</h1>
    <button class="top-btn">Passer au contenu</button>`;

    //Insérer une div de class "profile" pour chaque photographe sur la page "index.html"

    array.forEach((profil) => {
      main.innerHTML += `<div class="profile" id="${profil.id}"></div>`;
    });

    // on récupère toutes les div de class "profile"
    const divProfile = document.getElementsByClassName("profile");

    // Ajouter les éléments dans les div de class "profile"
    for (let i = 0; i < divProfile.length; i++) {
      divProfile[
        i
      ].innerHTML += `<form class="form-photographer" action="/photographer.html"><input type="hidden" name="id" value=${array[i].id}><img class="profile__img" src="" alt=""></img><h2 class="profile__name">exemple</h2><p class="profile__location">exemple</p><p class="profile__intro">exemple</p><p class="profile__price"></p><ul class="profile__skills"></ul></input></form>`;
    }

    // Récupérer les éléments du DOM de la page principale
    let profileName = document.getElementsByClassName("profile__name");
    let profileLocation = document.getElementsByClassName("profile__location");
    let profileIntro = document.getElementsByClassName("profile__intro");
    let profileImage = document.getElementsByClassName("profile__img");
    let profilePrice = document.getElementsByClassName("profile__price");
    let profileTag = document.getElementsByClassName("profile__skills");
    let topButton = document.getElementsByClassName("top-btn")[0];

    // Créer une boucle pour insérer le contenu de la page d'acceuil

    for (let i = 0; i < array.length; i++) {
      // Injecter le nom des photographes dans le HTML
      profileName[i].textContent = array[i].name;
      // Injecter la localisation des photographes dans le HTML
      profileLocation[i].textContent = array[i].city + ", " + array[i].country;
      // Injecter les phrases de présentation des photographes dans le HTML
      profileIntro[i].textContent = array[i].tagline;
      // Injecter les photos des photographes dans le HTML
      profileImage[i].src = array[i].portrait;
      // Injecter les tarifs des photographes dans le HTML
      profilePrice[i].textContent = array[i].price + "€/jour";
      // Pour chaque tag tu tableau tags : créer un innerHtml
      //Insérer une balise <li> dans le HTML
      array[i].tags.forEach((tag) => {
        profileTag[i].innerHTML += `<li class="profile__tag">#${tag}</li>`;
      });
    }

    // Activer l'envoi du formulaire au click sur un profil
    const profilsForm = document.querySelectorAll(".profile");
    profilsForm.forEach((p) => {
      p.addEventListener("click", () => {
        p.firstElementChild.submit();
      });
    });

    // Faire apparaître le bouton "haut de page" au scroll
    document.addEventListener("scroll", () => {
      topButton.style.display = "block";
    });

    // permettre de revenir en haut de page
    topButton.addEventListener("click", () => {
      scrollTo(0, 0);
      topButton.style.display = "none";
    });
  };
  render(profilsTable);
  // Ajouter un listener sur les tags afin de filtrer les photographes
  const labels = document.getElementsByClassName("btn__speciality");

  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener("click", (e) => {
      let labelName = e.target.textContent.split("#")[1].toLowerCase();
      console.log(labelName);
      // Vérifier si le tag correspond a un des tags des photographes

      const filterProfil = profilsTable.filter((profil) => {
        if (profil.tags.includes(labelName)) return profil;
      });
      render(filterProfil);
    });
  }
}

/////////////////////////////////////// PAGE PHOTOGRAPHE //////////////////////////////////////

if (window.location.pathname === "/photographer.html") {
  // Récupérer les éléments du DOM
  let profilPic = document.getElementsByClassName("profil-pic")[0];
  let presentation = document.getElementsByClassName("presentation")[0];
  let picturesSection = document.getElementsByClassName("pictures");
  let divTotalLikes = document.getElementsByClassName("counter")[0];
  let likesNumber = document.getElementsByClassName("counter__likes")[0];
  let price = document.getElementsByClassName("counter__price-bis")[0];

  // récupérer l'id du photographe soumis par le formulaire

  let idNumber = window.location.search.split("?")[1].split("=")[1];

  // Filtrer le tableau de photographes selon l'idNumber
  const selectedProfil = profilsTable.filter((profil) => {
    return profil.id == idNumber;
  });

  // Editer le HTML en fonction des données du photograph sélèctionné

  profilPic.innerHTML = `<img class="profile__img" src="${selectedProfil[0].portrait} " alt=""></img>`;
  presentation.innerHTML = `<h2 class="profile__name">${selectedProfil[0].name}</h2>
    <p class="profile__location">${selectedProfil[0].city}</p>
    <p class="profile__intro">${selectedProfil[0].tagline}</p>
    <p class="profile__price">${selectedProfil[0].price}€/jour</p>`;
  document.body.className = "second-body";

  // Filtrer les médias pour ne retenir que ceux du photographe ciblé

  const selectedMedias = mediaTable.filter((media) => {
    return media.photographerId == idNumber;
  });

  let renderMedias = (array) => {
    // Vider la section "pictures"
    picturesSection[0].innerHTML = "";

    array.forEach((media) => {
      // Si le media représente une image
      if (media.picture) {
        picturesSection[0].innerHTML += `<div class="pictures__media"><img class = "pictures__pics" src="./pictures/${media.picture}"
          ></img><div class="pictures__description"><p class="pictures__title">
          ${media.title} 
          </p><p class="pictures__number"> 
          ${media.likes} 
          </p><i class="fas fa-heart"></i></div></div>`;
      } else {
        // Le media représente une vidéo
        picturesSection[0].innerHTML += `<div class="pictures__media"><video class = "pictures__pics" controls><source src="./pictures/${media.video}" type="video/mp4"></video>
          <div class="pictures__description"><p class="pictures__title">${media.title}</p><p class="pictures__number">${media.likes}</p><i class="fas fa-heart"></i></div></div>`;
      }
    });
    // Afficher le contenu de la balise "aside" en bas de page
    // Définir une variable correspondant à chaque bloc media de la page HTML "Photographer"
    let likesCounter = 0;
    array.forEach((media) => {
      likesCounter += media.likes;
    });

    likesNumber.innerHTML = `<p class="counter__likes__number">${likesCounter}</p>`;
    price.innerHTML = `<p class="counter__price__text">${selectedProfil[0].price} €/jours</p>`;
    // ajouter l'incrémentation des coeurs
    const coeurs = document.getElementsByClassName("fas fa-heart");
    const totalOfLikes = document.getElementsByClassName(
      "counter__likes__number"
    )[0];

    for (let i = 0; i < coeurs.length; i++) {
      coeurs[i].addEventListener("click", () => {
        picturesNumber[i].textContent =
          parseInt(picturesNumber[i].textContent) + 1;
        totalOfLikes.textContent = parseInt(totalOfLikes.textContent) + 1;
        console.log(totalOfLikes.textContent);
      });
    }
  };

  renderMedias(selectedMedias);

  //DOM Elements for the filter
  const select = document.getElementsByClassName("filter")[0];
  let picturesNumber = document.getElementsByClassName("pictures__number");

  // Fonction trie des médias par popularité
  const sortByPopularity = (mediaTable) => {
    mediaTable.sort((a, b) => {
      return b.likes - a.likes >= 0 ? 1 : -1;
    });
    renderMedias(mediaTable);
  };

  // Fonction trie des médias par Titre
  const sortByTitle = (mediaTable) => {
    mediaTable.sort((a, b) => {
      return b.title - a.title >= 0 ? 1 : -1;
    });
  };

  // Fontction trie des médias par Date

  const sortByDate = (mediaTable) => {
    mediaTable.sort((a, b) => {
      return a.date.split("-").join() < b.date.split("-").join() ? 1 : -1;
    });
  };

  sortByPopularity(selectedMedias);

  // Appliquer un trie des médias par titre
  // 1.  cibler l'élément "select"
  select.addEventListener("change", () => {
    //2. Appliquer un trie des médias
    if (select.value === "Titre") {
      sortByTitle(selectedMedias);
      renderMedias(selectedMedias);
      console.log(selectedMedias);
    } else if (select.value === "Date") {
      sortByDate(selectedMedias);
      renderMedias(selectedMedias);
      console.log(selectedMedias);
    } else {
      sortByPopularity(selectedMedias);
      renderMedias(selectedMedias);
      console.log(selectedMedias);
    }
  });

  // Faire apparaitre la lightbox au click de chaque image
  let photographerPictures = document.getElementsByClassName("pictures__pics");
  const lightbox = document.getElementById("slider-section");
  let lightboxImage = document.getElementsByClassName("slider__img")[0];

  const lightboxCross = document.getElementById("slider__cross");
  const openLightbox = () => {
    lightbox.style.display = "flex";
    divTotalLikes.style.display = "none";
  };

  const closeLightbox = () => {
    lightbox.style.display = "none";
    divTotalLikes.style.display = "flex";
  };
  const nextBtn = document.getElementById("next-btn");
  const previousBtn = document.getElementById("previous-btn");
  const container = document.getElementsByClassName("slider__container")[0];

  // ouverture de la lightbox

  const lightboxFunction = () => {
    for (let i = 0; i < photographerPictures.length; i++) {
      let picturesAndVideos = selectedMedias.map((media) => {
        if (media.picture !== undefined) {
          return media.picture;
        } else {
          return media.video;
        }
      });

      photographerPictures[i].addEventListener("click", () => {
        openLightbox();
        const renderLightbox = () => {
          if (picturesAndVideos[i].split(".")[1] === "jpg") {
            container.innerHTML = `<img class="slider__img" src="/pictures/${picturesAndVideos[i]}" alt=""/>`;
          } else {
            container.innerHTML = `<video class = "slider__img"><source src="./pictures/${picturesAndVideos[i]}" type="video/mp4">`;
          }
        };
        renderLightbox();

        // Défilement à droite
        nextBtn.addEventListener("click", () => {
          previousBtn.style.display = "block";
          if (i === picturesAndVideos.length - 1) {
            renderLightbox();
            nextBtn.style.display = "none";
          } else {
            i++;
            renderLightbox();
          }
        });
        // Défilement vers la gauche
        previousBtn.addEventListener("click", () => {
          nextBtn.style.display = "block";
          if (i === 0) {
            renderLightbox();
            previousBtn.style.display = "none";
          } else {
            i--;
            renderLightbox();
          }
        });
      });
    }

    lightboxCross.addEventListener("click", () => {
      closeLightbox();
    });
  };
  lightboxFunction();

  // Ajouter 2 fonctions pour pouvoir ouvrir et fermer le formulaire
  const contactButton = document.getElementsByClassName("contact-me__btn")[0];
  const contactForm = document.getElementsByClassName("form-section")[0];
  const cross = document.getElementById("cross");

  const openModal = () => {
    contactForm.style.display = "flex";
  };

  const closeModal = () => {
    contactForm.style.display = "none";
  };

  contactButton.addEventListener("click", () => {
    openModal();
  });
  cross.addEventListener("click", () => {
    closeModal();
  });

  // Données d'entré du formulaire
  const inputFirstName =
    document.getElementsByClassName("form__input-first")[0];
  const inputLastName = document.getElementsByClassName("form__input-last")[0];
  const inputEmail = document.getElementsByClassName("form__input-email")[0];
  const inputMessage = document.getElementsByClassName(
    "form__input-message"
  )[0];

  // Fonction de suppression des données du formulaire
  const clearForm = () => {
    inputFirstName.value = "";
    inputLastName.value = "";
    inputEmail.value = "";
    inputMessage.value = "";
  };

  // Validation du formulaire
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (
      inputFirstName.value &&
      inputLastName.value &&
      inputEmail.value &&
      inputMessage.value
    ) {
      console.log(
        `${inputFirstName.value}
${inputLastName.value}
${inputEmail.value}
${inputMessage.value}`
      );
      clearForm();
      closeModal();
    }
  });
}
