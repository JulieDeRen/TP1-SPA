import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    #img;
    constructor(params){
        super(params)
        this.setTitle("Viewing Post")
        console.log(params)
        console.log("test post view")
    }

    
    async getHtml() {
        console.log('test')
       // console.log(this.params.id)
        const nu  = Number(this.params.id)

        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }

        
        console.log(window.location.pathname)
        let animal = String(window.location.pathname);
        console.log(typeof(animal));
        if(animal.includes('/cat')){
            animal = '/cat'
        }
        else if(animal.includes('/dog')){
            animal = '/dog'
        }
        const data = await getData('/static/js/views/data' + animal + 'Data.json');

        const article = data.find(item => String(item.id) === this.params.id)
        console.log(article);
        let postView;

        postView = `    <section id="portfolio" class="portfolio">
                        <div class="container">
                
                        <div class="section-title">
                            <h2>${article.name}</h2>
                        </div>`;
        if(article.hasOwnProperty('origin')){
            postView += `<p>`+article.origin+`</p>`;
        }
        if(article.hasOwnProperty('bred_for')){
            postView += `<p>This breed is for `+article.bred_for+`</p>`;
        }
        if(article.hasOwnProperty('breed_group')){
            postView += `<p>Group: `+article.breed_group+`</p>`;
        }
        if(article.hasOwnProperty('description')){
            postView += `<p>`+article.description+`</p>`;
        }
        postView += `<p>`+article.temperament+`</p>
        <p>Weight `+article.weight.imperial+` pounds</p>`;

        if(article.hasOwnProperty('image')){
            postView += `<img src="${article.image.url}" alt="image" class="img-post-views">
            <p><a href='/post' data-link>Retour</a></p>
            `
        }
        else{
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
        
            postView+= `<img src="" alt="image" class="img-post-views"><p><a href='/' data-link>Retour</a></p>` ;

        }
        postView += `</div></section>`;
        return postView;
    }
    // Dans le callback sélectionner l'image, lui passer en attribut src la valeur de la propriété de la donnée fetchéee
    cb(data){
        let img = document.querySelector(".img-post-views");
        img.src = data.url;
    }

}