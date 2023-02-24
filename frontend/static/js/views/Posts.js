import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    #animal;
    #datas;
    constructor(params) {
        super(params)
        this.setTitle("Posts")
        this.#animal = window.location.pathname;

        // traiter le pathname si termine par "/"
        if (this.#animal.charAt(this.#animal.length - 1) == '/') {
            this.#animal.slice(0, -1);
        }

        // check if header exist -- in postView header is earased;
        const header = document.querySelector("#header");
        console.log(header.childNodes.length);
        if (header.childNodes.length === 0) {
            header.innerHTML = ` <header class="content-on-image box-shadow content-on-image-accueil" id="header">
                                    <img src="/static/assets/img/gerrard_getthings_hero.jpeg" alt="gerrard getthings" class="img-header">
                                    <!--Source : Nitish Tyagi https://codepen.io/nikkk-me/pen/abvPjeG * Modifié-->
                                    <div class="switch-button" id="switch-button">
                                        <input name = "langue" class="switch-button-checkbox" type="checkbox"><!--si c'est checked == cat-->
                                        <label class="switch-button-label" for="langue"><span class="switch-button-label-span">Dog</span></label>
                                    </div>
                                    <h1>Looking for a<br>Companion?</h1>
                                </header>`
        }
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
        const abstractView = new AbstractView();
        let res = abstractView.search(data);
        const promise = Promise.resolve(res);
        promise.then((value) => {
            let datas = value;
            console.log(value)
            this.cbSearch(datas)
        })



    }
    // fonction de rappel pour afficher les données recherchées
    cbSearch(datas) {
        let animal = this.#animal;
        // enlever le slash first char fonction crée dans AbstractView
        let abstractView = new AbstractView;
        animal = abstractView.typeAnimal(animal);


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
            console.log(url)
            const response = await fetch(url)
            return response.json()
        }
        const data = await getData('/static/js/views/data' + this.#animal + 'Data.json');

        // titre animal à éditer 
        let animal = this.#animal;
        // enlever le slash first char
        let abstractView = new AbstractView;
        animal = abstractView.typeAnimal(animal);

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
        for (let i in data) {

            if (this.#animal.includes("cat")) {
                if (data[i].hasOwnProperty('reference_image_id')) {
                    url = 'https://api.thecatapi.com/v1/images/' + data[i]['reference_image_id'];
                    console.log(url);
                    fetch(url)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                            this.cb(data);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });
                    post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                                    <img src="${img}" class="img-fluid" alt="image carte" data-img="${data[i]['reference_image_id']}">
                                    <div class="portfolio-info" style="position:absolute">
                                        <h4>${data[i]['name']}</h4>
                                        <p>${data[i]['origin']}</p>
                                        <a href="${this.#animal}/post-view/${data[i]['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${data[i]['name']}" data-link><i class="bx bx-plus"></i></a>
                                        <a href="${this.#animal}/post-view/${data[i]['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
                                    </div>
                                </div>`
                }

            }

            else {

                img = data[i]['image']['url'];


                post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                                <img src="${img}" class="img-fluid" alt="image carte">
                                <div class="portfolio-info" style="position:absolute">
                                    <h4>${data[i]['name']}</h4>
                                    <p>${data[i]['origin']}</p>
                                    <a href="${this.#animal}/post-view/${data[i]['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${data[i]['name']}" data-link><i class="bx bx-plus"></i></a>
                                    <a href="${this.#animal}/post-view/${data[i]['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
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