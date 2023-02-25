import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    #animal;
    #datas;
    #oAbstractView;
    constructor(params) {
        super(params)
        this.setTitle("Viewing Post");
        this.deleteHeader();
        this.#animal = window.location.pathname;
        this.#oAbstractView = new AbstractView(this.#datas);

        this.aside();

        // bouton search
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
        // console.log(this.params.id)
        const nu = Number(this.params.id)

        async function getData(url) {
            const response = await fetch(url)
            return response.json()
        }


        // console.log(window.location.pathname)
        let animal = String(window.location.pathname);
        // console.log(typeof(animal));
        if (animal.includes('/cat')) {
            animal = '/cat'
        }
        else if (animal.includes('/dog')) {
            animal = '/dog'
        }
        const data = await getData('/static/js/views/data' + animal + 'Data.json');

        const article = data.find(item => String(item.id) === this.params.id)
        // console.log(article);
        let postView;

        postView = `    <section id="portfolio" class="portfolio">
                        <div class="container">
                
                        <div class="section-title">
                            <h2>${article.name}</h2>
                        </div>`;
        if (article.hasOwnProperty('origin')) {
            postView += `<p>` + article.origin + `</p>`;
        }
        if (article.hasOwnProperty('bred_for')) {
            postView += `<p>This breed is for ` + article.bred_for + `</p>`;
        }
        if (article.hasOwnProperty('breed_group')) {
            postView += `<p>Group: ` + article.breed_group + `</p>`;
        }
        if (article.hasOwnProperty('description')) {
            postView += `<p>` + article.description + `</p>`;
        }
        postView += `<p>` + article.temperament + `</p>
        <p>Weight `+ article.weight.imperial + ` pounds</p>`;

        if (article.hasOwnProperty('image')) {
            postView += `<img src="${article.image.url}" alt="image" class="img-post-views">`
        }
        else {
            let url = 'https://api.thecatapi.com/v1/images/' + article.reference_image_id;

            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    this.cb(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });

            // let image = this.getCatImage(article.reference_image_id, this.cb.bind(this));

            postView += `<img src="" alt="image" class="img-post-views">`;

        }
        postView += `</div></section>`;
        return postView;
    }
    // Dans le callback sélectionner l'image, lui passer en attribut src la valeur de la propriété de la donnée fetchéee
    cb(data) {
        let img = document.querySelector(".img-post-views");
        img.src = data.url;
    }

}