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

if (window.location.pathname === "/pages/index.html") {
  // Récupérer l'élément du DOM sur lequel je souhaite créer les profils des photographes
  let main = document.getElementsByClassName("main")[0];

  // Insérer la liste de tags dans le header
  let headerList = document.getElementsByClassName("header__liste")[0];
  let tableTags = [
    "#Portrait",
    "#Fashion",
    "#Architecture",
    "#Travel",
    "#Sport",
    "#Animals",
    "#Events",
  ];

  for (let i = 0; i < tableTags.length; i++) {
    headerList.innerHTML +=
      '<li class="btn__speciality" role="link" tabindex="0"><span aria-label="tag">' +
      tableTags[i] +
      "</span></li>";
  }

  const render = (array) => {
    // Vider la div de class "main"
    main.innerHTML = "";
    //Insérer le titre
    main.innerHTML = `<h1 class="titre_h1" tabindex="0">Nos photographes</h1>
    <button  role="link" class="top-btn" tabindex="0">Passer au contenu</button>`;

    //Insérer une div de class "profile" destinée à afficher chaque photographe sur la page "index.html"

    array.forEach((profil) => {
      main.innerHTML += `<div class="profile" id="${profil.id}"></div>`;
    });

    // on récupère toutes les div de class "profile"
    const divProfile = document.getElementsByClassName("profile");

    // Ajouter les éléments dans les div de class "profile"
    for (let i = 0; i < divProfile.length; i++) {
      divProfile[
        i
      ].innerHTML += `<form class="form-photographer" action="../pages/photographer.html" tabindex="0"><input id="hidden-input" type="hidden" name="id" value=${array[i].id}><img class="profile__img" src="" alt="${array[i].name}" role="img"></img><h2 class="profile__name">exemple</h2></form><p class="profile__location">exemple</p><p class="profile__intro">exemple</p><p class="profile__price"></p><ul class="profile__skills"></ul></input>`;
    }

    // Récupérer les éléments du DOM insérés en Javascript
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
      profileImage[i].src = "../assets/pictures/" + array[i].portrait;
      // Injecter les tarifs des photographes dans le HTML
      profilePrice[i].textContent = array[i].price + "€/jour";
      // Pour chaque tag tu tableau tags : créer un innerHtml
      //Insérer une balise <li> dans le HTML
      array[i].tags.forEach((tag) => {
        profileTag[
          i
        ].innerHTML += `<li class="profile__tag" aria-label="Tag" tabindex="0">#${tag}</li>`;
      });
    }

    const photographersLink = document.querySelectorAll(".form-photographer");

    // Activer l'envoi du formulaire au click sur un profil
    photographersLink.forEach((p) => {
      p.addEventListener("click", () => {
        p.submit();
      });
    });

    // Faire apparaître le bouton "haut de page" au scroll
    document.addEventListener("scroll", () => {
      topButton.style.display = "block";
      if (window.pageYOffset == 0) {
        topButton.style.display = "none";
      }
    });

    // permettre de revenir en haut de page au click du bouton
    topButton.addEventListener("click", () => {
      scrollTo(0, 0);
    });
  };
  render(profilsTable);

  // Ajouter un filtre au click sur les tags des profils
  // Cibler la liste de tag pour chaque profil
  let tagsByProfil = document.getElementsByClassName("profile__tag");

  // Ajouter un listener au click sur les tags afin de filtrer les photographes
  const labels = document.getElementsByClassName("btn__speciality");

  let filterbyTags = (tagList) => {
    for (let i = 0; i < tagList.length; i++) {
      tagList[i].addEventListener("click", (e) => {
        let labelName = e.target.textContent.split("#")[1].toLowerCase();
        // Vérifier si le tag correspond a un des tags des photographes
        const filterProfil = profilsTable.filter((profil) => {
          if (profil.tags.includes(labelName)) return profil;
        });
        render(filterProfil);
      });
    }
  };

  // Filtrer les photographes à partir des tags du header
  filterbyTags(labels);

  // Filtrer les photographes à partir des tags des photographes

  filterbyTags(tagsByProfil);

  // Filtrer les photographes au clavier3

  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener("focus", () => {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          let labelName = e.target.textContent.split("#")[1].toLowerCase();
          // Vérifier si le tag correspond a un des tags des photographes
          const filterProfil = profilsTable.filter((profil) => {
            if (profil.tags.includes(labelName)) return profil;
          });
          render(filterProfil);
        }
      });
    });
  }
}

/////////////////////////////////////// PAGE PHOTOGRAPHE //////////////////////////////////////

if (window.location.pathname === "/pages/photographer.html") {
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

  profilPic.innerHTML = `<img class="profile__img--photograph" src="../assets/pictures/${selectedProfil[0].portrait}" alt="${selectedProfil[0].name}" tabindex="0"></img>`;
  presentation.innerHTML = `<h1 class="profile__name--photograph" tabindex="0">${selectedProfil[0].name}</h1>
    <p class="profile__location--photograph" tabindex="0">${selectedProfil[0].city}, ${selectedProfil[0].country}</p>
    <p class="profile__intro--photograph" tabindex="0">${selectedProfil[0].tagline}</p>
    <ul class="profile__tagslist"></ul>`;

  // Ajouter les tags du profil
  const tagslist = document.getElementsByClassName("profile__tagslist")[0];
  selectedProfil[0].tags.forEach((tag) => {
    tagslist.innerHTML += `<li class="profile__tag--photograph" aria-label="Link" tabindex="0">#${tag}</li>`;
  });

  document.body.className = "second-body";

  // Filtrer les médias pour ne retenir que ceux du photographe ciblé

  const selectedMedias = mediaTable.filter((media) => {
    return media.photographerId == idNumber;
  });

  // Fonction de rendu de la page photographe

  let renderMedias = (array) => {
    // Vider la section "pictures"
    picturesSection[0].innerHTML = "";

    array.forEach((media) => {
      // Si le media représente une image
      if (media.picture) {
        picturesSection[0].innerHTML += `<div class="pictures__media"><img class = "pictures__pics" src="../assets/pictures/${media.picture}" alt="${media.title}" aria-label="Lilac breasted roller, closeup view" tabindex="0" ></img><div class="pictures__description"><p class="pictures__title" tabindex="0">
          ${media.title}</p><div class="mini-container"><p class="pictures__number" tabindex="0"> 
          ${media.likes} 
          </p><i class="fas fa-heart" aria-label="Likes" tabindex="0"></i></div></div></div>`;
      } else {
        // Le media représente une vidéo
        picturesSection[0].innerHTML += `<div class="pictures__media"><video class = "pictures__pics" alt="${media.title}" aria-label="Lilac breasted roller, closeup view" controls tabindex="0"><source src="../assets/pictures/${media.video}" type="video/mp4"></video>
          <div class="pictures__description"><p class="pictures__title" tabindex="0">${media.title}</p><div class="mini-container"><p class="pictures__number" tabindex="0">${media.likes}</p><i class="fas fa-heart" tabindex="0"></i></div></div></div>`;
      }
    });
    // Afficher le contenu de la balise "aside" en bas de page
    // Définir une variable correspondant à chaque bloc media de la page HTML "Photographer"
    let likesCounter = 0;
    array.forEach((media) => {
      likesCounter += media.likes;
    });

    likesNumber.innerHTML = `<p class="counter__likes__number" tabindex="0">${likesCounter}</p>`;
    price.innerHTML = `<p class="counter__price__text" tabindex="0">${selectedProfil[0].price} €/jours</p>`;
    // ajouter l'incrémentation des coeurs
    const coeurs = document.getElementsByClassName("fas fa-heart");
    const totalOfLikes = document.getElementsByClassName(
      "counter__likes__number"
    )[0];

    // Incrémenter le total de likes en bas de page
    for (let i = 0; i < coeurs.length; i++) {
      coeurs[i].addEventListener("click", () => {
        picturesNumber[i].textContent =
          parseInt(picturesNumber[i].textContent) + 1;
        totalOfLikes.textContent = parseInt(totalOfLikes.textContent) + 1;
      });
    }

    // Retourner vers la homepage après click sur les Tags
    let clickOnTags = () => {
      const photographerTags = document.getElementsByClassName(
        "profile__tag--photograph"
      );

      for (let i = 0; i < photographerTags.length; i++) {
        photographerTags[i].addEventListener("click", () => {
          window.location.pathname = "/index.html";
        });
      }
    };
    clickOnTags();

    const lightboxFunction = () => {
      // Faire apparaitre la lightbox au click de chaque image
      let photographerPictures =
        document.getElementsByClassName("pictures__pics");
      const lightbox = document.getElementById("slider-section");
      let ariaHidden = lightbox.getAttribute("aria-hidden");

      const lightboxCross = document.getElementById("slider__cross");
      const openLightbox = () => {
        lightbox.style.display = "flex";
        divTotalLikes.style.display = "none";
        ariaHidden = "false";
      };

      const closeLightbox = () => {
        lightbox.style.display = "none";
        if (window.matchMedia("(max-width: 1100px)").matches) {
          divTotalLikes.style.display = "none";
        } else {
          divTotalLikes.style.display = "flex";
        }
      };
      const nextBtn = document.getElementById("next-btn");
      const previousBtn = document.getElementById("previous-btn");
      const container = document.getElementsByClassName("slider__container")[0];

      // Dissocier les vidéos des images

      for (let i = 0; i < photographerPictures.length; i++) {
        let picturesAndVideos = selectedMedias.map((media) => {
          if (media.picture !== undefined) {
            return media.picture;
          } else {
            return media.video;
          }
        });

        // Fonction d'affichage de la lightbox
        const renderLightbox = () => {
          if (picturesAndVideos[i].split(".")[1] === "jpg") {
            container.innerHTML = `<img class="slider__img" src="../assets/pictures/${picturesAndVideos[i]}" alt="${selectedMedias[i].title}" aria-label="Lilac Breasted Roller" role="img" tabindex="0"/><h3 class="slider__name">${selectedMedias[i].title}</h3>`;
          } else {
            container.innerHTML = `<video class = "slider__img" alt="${selectedMedias[i].title}" aria-label="Lilac Breasted Roller" controls tabindex="0"><source src="../assets/pictures/${picturesAndVideos[i]}" type="video/mp4"><h3 class="slider__name">${selectedMedias[i].title}</h3>`;
          }
        };

        // fonction défilement vers la gauche ou vers la droite au click
        const changePicturesByClick = (button) => {
          button.addEventListener("click", () => {
            switch (button) {
              case previousBtn:
                nextBtn.style.display = "block";
                if (i === 0) {
                  renderLightbox();
                  button.style.display = "none";
                } else {
                  i--;
                  renderLightbox();
                }
                break;
              case nextBtn:
                previousBtn.style.display = "block";
                if (i === picturesAndVideos.length - 1) {
                  renderLightbox();
                  button.style.display = "none";
                } else {
                  i++;
                  renderLightbox();
                }
                break;
              default:
                console.log("button doesn't work");
            }
          });
        };

        // Fonction défilement au clavier
        const changePicturesByKeyboard = () => {
          window.addEventListener("keydown", (e) => {
            switch (e.key) {
              case "ArrowRight":
                previousBtn.style.display = "block";
                if (i === picturesAndVideos.length - 1) {
                  renderLightbox();
                  nextBtn.style.display = "none";
                } else {
                  i++;
                  renderLightbox();
                }
                break;

              case "ArrowLeft":
                nextBtn.style.display = "block";
                if (i === 0) {
                  renderLightbox();
                  previousBtn.style.display = "none";
                } else {
                  i--;
                  renderLightbox();
                }
                break;

              default:
                return;
            }
          });
        };

        // Fonction générique
        const showLightboxbyClick = () => {
          photographerPictures[i].addEventListener("click", () => {
            openLightbox();
            renderLightbox();
            changePicturesByClick(previousBtn);
            changePicturesByClick(nextBtn);
            changePicturesByKeyboard();
          });
        };

        showLightboxbyClick();

        // Permettre l'ouverture de la ligthbox au clavier

        photographerPictures[i].addEventListener("focus", () => {
          window.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && ariaHidden === "true") {
              showLightboxbyClick();
            }
          });
        });
      }
      // Fermeture de la lightbox au clic
      lightboxCross.addEventListener("click", () => {
        closeLightbox();
      });
      // Fermeture de la ligtbox au clavier
      window.addEventListener("keydown", (e) => {
        if (ariaHidden == "false" && e.key === "Escape") {
          closeLightbox();
        }
      });
    };
    lightboxFunction();
  };

  renderMedias(selectedMedias);

  // Partie Filtre :

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
      return b.title >= a.title ? -1 : 1;
    });
  };

  // Fonction trie des médias par Date

  const sortByDate = (mediaTable) => {
    mediaTable.sort((a, b) => {
      return a.date.split("-").join() < b.date.split("-").join() ? 1 : -1;
    });
  };

  sortByPopularity(selectedMedias);

  // Permettre le classement des médias avec le bouton select

  const sortWithSelectButton = () => {
    select.addEventListener("change", () => {
      switch (select.value) {
        case "Titre":
          sortByTitle(selectedMedias);
          break;
        case "Date":
          sortByDate(selectedMedias);
          break;
        case "Popularité":
          sortByPopularity(selectedMedias);
          break;
        default:
          console.log("Select button doesn't work");
      }
      renderMedias(selectedMedias);
    });
  };

  sortWithSelectButton();

  // Partie formulaire
  const contactButton = document.getElementsByClassName("contact-me__btn")[0];
  const contactForm = document.getElementsByClassName("form-section")[0];
  let modalClosed = contactForm.getAttribute("aria-hidden");
  const contactTitle = document.getElementsByClassName("form__title")[0];
  const cross = document.getElementById("cross");

  // Fonction ouverture de modale
  const openModal = () => {
    contactForm.style.display = "flex";
    contactTitle.textContent = `Contactez-moi ${selectedProfil[0].name}`;
    modalClosed = "false";
  };

  // Fonction fermeture de modale
  const closeModal = () => {
    contactForm.style.display = "none";
  };

  // Ajouter un listener au click sur le bouton d'ouverture de la modale
  contactButton.addEventListener("click", () => {
    openModal();
  });

  // Ajouter un listener au click sur le bouton de fermeture de la modale
  cross.addEventListener("click", () => {
    closeModal();
  });

  // Permettre la fermeture de la modale au clavier
  window.addEventListener("keydown", (e) => {
    if (modalClosed == "false" && e.key === "Escape") {
      closeModal();
    }
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
