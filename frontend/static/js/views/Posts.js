import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    #animal;
    #datas;
    #oAbstractView;
    constructor(params) {
        super(params)
        this.setTitle("Posts")
        this.#animal = window.location.pathname;
        this.#oAbstractView = new AbstractView(this.#datas);

        // traiter le pathname si termine par "/"
        if (this.#animal.charAt(this.#animal.length - 1) == '/') {
            this.#animal.slice(0, -1);
        }

        this.afficherHeader();
        const header = document.querySelector("#header");
        if (header.childNodes.length > 0) {
            // switch button redirectionner
            let switchButton = document.querySelector(".switch-button-checkbox");
            if (this.#animal.includes("cat")) {
                switchButton.setAttribute("checked", true);
                switchButton.classList.toggle("cat")
            }

            switchButton.addEventListener("click", this.redirection.bind(this));
        }




        // Header hero banner and aside a insérer dans le dom
        
        this.imageHeader();
        console.log(this.#animal);
        this.aside(this.#animal);

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

    // affichage général
    async getHtml() {
        async function getData(url) {
            console.log(url)
            const response = await fetch(url)
            return response.json()
        }
        this.#datas = await getData('/static/js/views/data' + this.#animal + 'Data.json');

        // titre animal à éditer 
        let animal = this.#animal;
        // enlever le slash first char
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
        for (let i in this.#datas) {

            if (this.#animal.includes("cat")) {
                if (this.#datas[i].hasOwnProperty('reference_image_id')) {
                    url = 'https://api.thecatapi.com/v1/images/' + this.#datas[i]['reference_image_id'];
                    // console.log(url);
                    fetch(url)
                        .then((response) => response.json())
                        .then((data) => {
                            this.cb(data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                                    <img src="${img}" class="img-fluid" alt="image carte" data-img="${this.#datas[i]['reference_image_id']}">
                                    <div class="portfolio-info" style="position:absolute">
                                        <h4>${this.#datas[i]['name']}</h4>
                                        <p>${this.#datas[i]['origin']}</p>
                                        <a href="${this.#animal}/post-view/${this.#datas[i]['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${this.#datas[i]['name']}" data-link><i class="bx bx-plus"></i></a>
                                        <a href="${this.#animal}/post-view/${this.#datas[i]['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>`
                }

            }

            else {

                img = this.#datas[i]['image']['url'];


                post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                                <img src="${img}" class="img-fluid" alt="image carte">
                                <div class="portfolio-info" style="position:absolute">
                                    <h4>${this.#datas[i]['name']}</h4>
                                    <p>${this.#datas[i]['origin']}</p>
                                    <a href="${this.#animal}/post-view/${this.#datas[i]['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${this.#datas[i]['name']}" data-link><i class="bx bx-plus"></i></a>
                                    <a href="${this.#animal}/post-view/${this.#datas[i]['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
                                </div>
                            </div>`
            };
        }
        post += `</div>
                    </div>
                    </section><!-- End Portfolio Section -->`;



        // Ref : Template-Tempo-Bootstrap
        return post;


    }
    cb(data) {

        let img = document.querySelectorAll(".img-fluid");
        img.forEach((uneImg) => {

            if (uneImg.dataset.img == data.id) {
                uneImg.src = data.url;
            }
        })
    }
}