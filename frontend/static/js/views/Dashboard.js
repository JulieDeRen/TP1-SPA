import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Dashboard")
        let inputAnimal = document.querySelector(".switch-button-checkbox");
        inputAnimal.addEventListener("click", this.redirection.bind(this));
        this.imageHeader();
    }


    async getHtml() {
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }
        // console.log(window.location.pathname);
        let animal = "dog";
        const data = await getData('/static/js/views/data/dogData.json');
        
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
    
            
            for(let i in data){
                let img = data[i]['image']['url'];

                post += `<div class="col-lg-4 col-md-6 portfolio-item filter-web" style="position:relative">
                            <img src="${img}" class="img-fluid" alt="">
                            <div class="portfolio-info" style="position:absolute">
                                <h4>${data[i]['name']}</h4>
                                <p>${data[i]['origin']}</p>
                                <a href="${animal}/post-view/${data[i]['id']}" data-gallery="portfolioGallery" class="portfolio-lightbox preview-link" title="${data[i]['name']}" data-link><i class="bx bx-plus"></i></a>
                                <a href="${animal}/post-view/${data[i]['id']}" class="details-link" title="More Details"><i class="bx bx-link"></i></a>
                            </div>
                        </div>`
            };
        post +=`</div>
                </div>
                </section><!-- End Portfolio Section -->`;


        // Ref : Template-Tempo-Bootstrap
        return post;
        
    }
}