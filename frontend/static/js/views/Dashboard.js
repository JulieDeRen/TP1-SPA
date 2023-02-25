import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  #datas;
  #oAbstractView;
  #animal;
  constructor(params) {
    super(params)
    this.#oAbstractView = new AbstractView(this.#datas);
    this.setTitle("Dashboard")
    this.#animal = "/dog";
    // switch button
    let inputAnimal = document.querySelector(".switch-button-checkbox");
    // si existe (dans view post existe pas)
    if (inputAnimal) {
      inputAnimal.addEventListener("click", this.redirection.bind(this));
    }

    // afficher header 
    this.afficherHeader();
    // header hero banner selon cat ou dog
    this.imageHeader();

    // aside affichage
    this.aside();

    let button = document.querySelector("button.btn.btn-outline");
    button.addEventListener("click", this.search.bind(this));

  }

  // fonction de recherche
  async search(e) {
    async function getData(url) {
      console.log(url)
      const response = await fetch(url)
      return response.json()
    }
    // condition pour éviter que ex :  /cat soit /cat/
    if (this.#animal.includes("cat")) {
      this.#animal = "/cat";
    }
    else {
      this.#animal = "/dog";
    }


    // récupérer les données du fichier json et passer en paramètre de la fonction search dna la classe AbstractView
    const data = await getData('/static/js/views/data' + this.#animal + 'Data.json');
    let res = this.#oAbstractView.search(data);
    const promise = Promise.resolve(res);
    promise.then((value) => {
      this.#datas = value;
      // console.log(value)
      this.cbSearch(this.#datas)
    })



  }
  // fonction de rappel pour afficher les données recherchées
  cbSearch(datas) {
    let animal = this.#animal;
    // enlever le slash first char fonction crée dans AbstractView
    animal = this.#oAbstractView.typeAnimal(animal);


    let post = `
            <!-- ======= Portfolio Section Ref : BootstrapMade template Tempo======= -->
            <section id="portfolio" class="portfolio">
              <div class="container">
        
                <div class="section-title">
                  <h2>${animal}</h2>
                </div>
        
                <div class="row">
                  <div class="col-lg-12 d-flex justify-content-center">
                    <ul id="portfolio-flters">
                      <li data-filter="*" class="filter-active">All</li>
                      <li data-filter=".filter-app">Friendly</li>
                      <li data-filter=".filter-card">Sportive</li>
                      <li data-filter=".filter-web">Calm</li>
                    </ul>
                  </div>
                </div>
                <div class="row portfolio-container" style="position:relative">`

    let img;
    let url;
    datas.forEach((uneData) => {

      if (this.#animal.includes("cat")) {
        if (uneData.hasOwnProperty('reference_image_id')) {
          url = 'https://api.thecatapi.com/v1/images/' + uneData['reference_image_id'];
          console.log(url);
          fetch(url)
            .then((response) => response.json())
            .then((uneData) => {
              console.log('Success:', uneData);
              cb(uneData);
            })
            .catch((error) => {
              console.error('Error:', error);
            });
          post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                                       <img src="${img}" class="img-fluid" alt="image carte" data-img="${uneData['reference_image_id']}">
                                       <div class="portfolio-info" style="position:absolute">
                                           <h4>${uneData['name']}</h4>
                                           <p>${uneData['origin']}</p>
                                           <a href="${this.#animal}/post-view/${uneData['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${uneData['name']}" data-link><i class="bx bx-plus"></i></a>
                                           <a href="${this.#animal}/post-view/${uneData['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
                                       </div>
                                   </div>`
        }
        // contion de rappel pour associer les url à chaque src d'image
        function cb(data) {

          let img = document.querySelectorAll(".img-fluid");
          img.forEach((uneImg) => {

            if (uneImg.dataset.img == data.id) {
              uneImg.src = data.url;
            }
          })
        }

      }

      else {

        img = uneData['image']['url'];


        post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                                   <img src="${img}" class="img-fluid" alt="image carte">
                                   <div class="portfolio-info" style="position:absolute">
                                       <h4>${uneData['name']}</h4>
                                       <p>${uneData['origin']}</p>
                                       <a href="${this.#animal}/post-view/${uneData['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${uneData['name']}" data-link><i class="bx bx-plus"></i></a>
                                       <a href="${this.#animal}/post-view/${uneData['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
                                   </div>
                               </div>`
      };
    })
    post += `</div>
                       </div>
                       </section><!-- End Portfolio Section -->`;

    const app = document.getElementById("app");

    app.innerHTML = "";
    console.log(app);
    app.innerHTML = post;
  }

  async getHtml() {
    async function getData(url) {
      const response = await fetch(url)
      return response.json()
    }
    // console.log(window.location.pathname);
    let animal = "dog";
    this.#datas = await getData('/static/js/views/data/dogData.json');


    let post = `
        <!-- ======= Portfolio Section ======= -->
        <section id="portfolio" class="portfolio">
          <div class="container">
    
            <div class="section-title">
              <h2>Dogs</h2>
            </div>
    
            <div class="row">
              <div class="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <li data-filter="*" class="filter-active">All</li>
                  <li data-filter=".filter-app">Friendly</li>
                  <li data-filter=".filter-card">Sportive</li>
                  <li data-filter=".filter-web">Calm</li>
                </ul>
              </div>
            </div>
            <div class="row portfolio-container" style="position:relative">`


    for (let i in this.#datas) {
      let img = this.#datas[i]['image']['url'];

      post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                            <img src="${img}" class="img-fluid" alt="">
                            <div class="portfolio-info" style="position:absolute">
                                <h4>${this.#datas[i]['name']}</h4>
                                <p>${this.#datas[i]['origin']}</p>
                                <a href="${animal}/post-view/${this.#datas[i]['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${this.#datas[i]['name']}" data-link><i class="bx bx-plus"></i></a>
                                <a href="${animal}/post-view/${this.#datas[i]['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
                            </div>
                        </div>`
    };
    post += `</div>
                        </div>
                        </section><!-- End Portfolio Section -->`;
    // search bar


    // Ref : Template-Tempo-Bootstrap
    return post;

  }
}