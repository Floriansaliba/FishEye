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
      main.innerHTML += `<div class="profile" id="${profil.id}" ></div>`;
    });

    // on récupère toutes les div de class "profile"
    const divProfile = document.getElementsByClassName("profile");

    // Ajouter les éléments dans les div de class "profile"
    for (let i = 0; i < divProfile.length; i++) {
      divProfile[
        i
      ].innerHTML += `<form class="form-photographer" action="/photographer.html"><input id="hidden-input" type="hidden" name="id" value=${array[i].id}><img class="profile__img" src="" alt="${array[i].name}" role="img"></img><h2 class="profile__name">exemple</h2><p class="profile__location">exemple</p><p class="profile__intro">exemple</p><p class="profile__price"></p><ul class="profile__skills"></ul></input></form>`;
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

    const profilsForm = document.querySelectorAll(".profile");

    // Activer l'envoi du formulaire au click sur un profil
    profilsForm.forEach((p) => {
      p.addEventListener("click", () => {
        p.firstElementChild.submit();
      });
      // Idem pour l'envoi du formulaire au clavier
      p.addEventListener("focus", () => {
        window.addEventListener("keydown", (e) => {
          if (e.key === "Enter") {
            p.firstElementChild.submit();
          }
        });
      });
    });

    // Faire apparaître le bouton "haut de page" au scroll
    document.addEventListener("scroll", () => {
      topButton.style.display = "block";
      if (window.pageYOffset == 0) {
        topButton.style.display = "none";
      }
    });

    // permettre de revenir en haut de page
    topButton.addEventListener("click", () => {
      scrollTo(0, 0);
    });
  };
  render(profilsTable);

  // Ajouter un listener au click sur les tags afin de filtrer les photographes
  const labels = document.getElementsByClassName("btn__speciality");

  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener("click", (e) => {
      let labelName = e.target.textContent.split("#")[1].toLowerCase();

      // Vérifier si le tag correspond a un des tags des photographes

      const filterProfil = profilsTable.filter((profil) => {
        if (profil.tags.includes(labelName)) return profil;
      });
      render(filterProfil);
    });
    // Idem pour activer le filtre au clavier
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

  profilPic.innerHTML = `<img class="profile__img--photograph" src="${selectedProfil[0].portrait}" alt="${selectedProfil[0].name}" role="img"></img>`;
  presentation.innerHTML = `<h1 class="profile__name--photograph">${selectedProfil[0].name}</h1>
    <p class="profile__location--photograph">${selectedProfil[0].city}, ${selectedProfil[0].country}</p>
    <p class="profile__intro--photograph">${selectedProfil[0].tagline}</p>
    <ul class="profile__tagslist"></ul>`;

  // Ajouter les tags du profil
  const tagslist = document.getElementsByClassName("profile__tagslist")[0];
  selectedProfil[0].tags.forEach((tag) => {
    tagslist.innerHTML += `<li class="profile__tag--photograph">#${tag}</li>`;
  });

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
        picturesSection[0].innerHTML += `<div class="pictures__media"><img class = "pictures__pics" src="./pictures/${media.picture}" alt="${media.title}" aria-label="Lilac breasted roller, closeup view" role="img" ></img><div class="pictures__description"><p class="pictures__title">
          ${media.title}</p><div class="mini-container"><p class="pictures__number"> 
          ${media.likes} 
          </p><i class="fas fa-heart" aria-label="Likes"></i></div></div></div>`;
      } else {
        // Le media représente une vidéo
        picturesSection[0].innerHTML += `<div class="pictures__media"><video class = "pictures__pics" alt="${media.title}" aria-label="Lilac breasted roller, closeup view" controls><source src="./pictures/${media.video}" type="video/mp4"></video>
          <div class="pictures__description"><p class="pictures__title">${media.title}</p><div class="mini-container"><p class="pictures__number">${media.likes}</p><i class="fas fa-heart"></i></div></div></div>`;
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
      });
    }
    const lightboxFunction = () => {
      // Faire apparaitre la lightbox au click de chaque image
      let photographerPictures =
        document.getElementsByClassName("pictures__pics");
      const lightbox = document.getElementById("slider-section");
      let ariaHidden = lightbox.getAttribute("aria-hidden");
      let lightboxImage = document.getElementsByClassName("slider__img")[0];
      const lightboxTitle = document.getElementsByClassName("slider__name")[0];

      const lightboxCross = document.getElementById("slider__cross");
      const openLightbox = () => {
        lightbox.style.display = "flex";
        divTotalLikes.style.display = "none";
        ariaHidden = "false";
      };

      const closeLightbox = () => {
        lightbox.style.display = "none";
        divTotalLikes.style.display = "flex";
      };
      const nextBtn = document.getElementById("next-btn");
      const previousBtn = document.getElementById("previous-btn");
      const container = document.getElementsByClassName("slider__container")[0];

      // ouverture de la lightbox

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
            container.innerHTML = `<img class="slider__img" src="/pictures/${picturesAndVideos[i]}" alt="${selectedMedias[i].title}" aria-label="Lilac Breasted Roller" role="img"/><h3 class="slider__name">${selectedMedias[i].title}</h3>`;
          } else {
            container.innerHTML = `<video class = "slider__img" alt="${selectedMedias[i].title}" aria-label="Lilac Breasted Roller" controls><source src="./pictures/${picturesAndVideos[i]}" type="video/mp4"><h3 class="slider__name">${selectedMedias[i].title}</h3>`;
          }
        };

        // Ouverture de la lightbox au clic
        photographerPictures[i].addEventListener("click", () => {
          openLightbox();
          renderLightbox();
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

          // Défilement au clavier

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
        });

        // Permettre l'ouverture de la ligthbox au clavier

        photographerPictures[i].addEventListener("focus", () => {
          window.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && ariaHidden === "true") {
              openLightbox();
              renderLightbox();
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

              // Défilement au clavier

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
    } else if (select.value === "Date") {
      sortByDate(selectedMedias);
      renderMedias(selectedMedias);
    } else {
      sortByPopularity(selectedMedias);
      renderMedias(selectedMedias);
    }
  });

  // Ajouter 2 fonctions pour pouvoir ouvrir et fermer le formulaire
  const contactButton = document.getElementsByClassName("contact-me__btn")[0];
  const contactForm = document.getElementsByClassName("form-section")[0];
  let modalClosed = contactForm.getAttribute("aria-hidden");
  const contactTitle = document.getElementsByClassName("form__title")[0];
  const cross = document.getElementById("cross");

  const openModal = () => {
    contactForm.style.display = "flex";
    contactTitle.textContent = `Contactez-moi ${selectedProfil[0].name}`;
    modalClosed = "false";
  };

  const closeModal = () => {
    contactForm.style.display = "none";
  };

  contactButton.addEventListener("click", () => {
    openModal();
  });

  // Fermeture de la modale à la souris
  cross.addEventListener("click", () => {
    closeModal();
  });

  // Fermeture de la modale au clavier
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
