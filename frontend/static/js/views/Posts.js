import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    #animal;
    constructor(params){
        super(params)
        this.setTitle("Posts")
        this.#animal = window.location.pathname;
        // switch button redirectionner
        let switchButton = document.querySelector(".switch-button-checkbox");
        if(this.#animal == "/cat"){
            switchButton.setAttribute("checked", true);
            switchButton.classList.toggle("cat")
        }
        switchButton.addEventListener("click", this.redirection.bind(this));
        this.imageHeader();
        this.aside();
    }

    async getHtml() {
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }
        // console.log(window.location.pathname);
        const data = await getData('/static/js/views/data' + this.#animal + 'Data.json');
        // console.log(data);
         // enlever le slash first char
         let animalTitre = this.#animal;
         animalTitre = animalTitre.slice(1);
         animalTitre = animalTitre.charAt(0).toUpperCase() + animalTitre.slice(1)
         animalTitre = animalTitre.concat("s");
         console.log(animalTitre);

         let post = `
         <!-- ======= Portfolio Section Ref : BootstrapMade template Tempo======= -->
         <section id="portfolio" class="portfolio">
           <div class="container">
     
             <div class="section-title">
               <h2>${animalTitre}</h2>
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
             for(let i in data){
                
                if(this.#animal =="/cat"){
                    if(data[i].hasOwnProperty('reference_image_id')){
                        url = 'https://api.thecatapi.com/v1/images/' + data[i]['reference_image_id'];
                        console.log(url);
                        fetch(url)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data[i]);
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
            
                else{
                    
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
            post +=`</div>
                    </div>
                    </section><!-- End Portfolio Section -->`;
        
                    
                    
         // Ref : Template-Tempo-Bootstrap
         return post;
         
        
    }
    cb(data){
        
        let img = document.querySelectorAll(".img-fluid");
        img.forEach((uneImg)=>{
            
            if(uneImg.dataset.img == data.id){
                uneImg.src = data.url;
            }
        })
        
    }
}