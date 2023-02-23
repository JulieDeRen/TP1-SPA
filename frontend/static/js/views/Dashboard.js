import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Dashboard")
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
              <h1>Dog</h1>
            </div>
    
            <div class="row">
              <div class="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <li data-filter="*" class="filter-active">All</li>
                  <li data-filter=".filter-app">App</li>
                  <li data-filter=".filter-card">Card</li>
                  <li data-filter=".filter-web">Web</li>
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