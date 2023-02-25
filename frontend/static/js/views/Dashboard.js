import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    #datas;
    #oAbstractView;
    constructor(params){
        super(params)
        this.#oAbstractView=new AbstractView(this.#datas);
        this.setTitle("Dashboard")
        let inputAnimal = document.querySelector(".switch-button-checkbox");
        // si existe (dans view post existe pas)
        if(inputAnimal){
          inputAnimal.addEventListener("click", this.redirection.bind(this));
        }

        // header hero banner selon cat ou dog
        this.imageHeader();

        // aside affichage
        this.aside();

      let button = document.querySelector("button.btn.btn-outline");
      button.addEventListener("click", this.search.bind(this));
  
    }

    search(e){
      // envoyer le set de data en paramètre lorsque bouton click
      let res = this.#oAbstractView.search(this.#datas);
      const promise = Promise.resolve(res);
      promise.then((value)=>{
        console.log(value)
        this.#datas = value;
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
    
            let animal = "dog";
            for(let i in this.#datas){
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
            post +=`</div>
                    </div>
                    </section><!-- End Portfolio Section -->`;

            const app = document.getElementById("app");

            app.innerHTML="";
            app.innerHTML=post;

      })
    

    }

    async getHtml() {
        async function getData(url){
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
    
            
            for(let i in this.#datas){
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
                post +=`</div>
                        </div>
                        </section><!-- End Portfolio Section -->`;
                        // search bar


        // Ref : Template-Tempo-Bootstrap
        return post;
        
    }
}