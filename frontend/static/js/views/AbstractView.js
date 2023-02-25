export default class {
    #animal;
    constructor(params){
        this.params = params
        //console.log(params);
    }
    setTitle(title){
        document.title = title
    }
   
    // afficher header
    afficherHeader(){
        // check if header exist -- in postView header is earased;
        const header = document.querySelector("#header");
        // console.log(header.childNodes.length);
        // Si pas de header, afficher
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
    }
    // fonction pour changer l'image du hero banner
    imageHeader(){
        let header = document.querySelector(".img-header");
        if(window.location.pathname== "/cat"){
            header.src = "/static/assets/img/gerrard_getthings_heroCat.jpg"
        }
        else{
            header.src = "/static/assets/img/gerrard_getthings_hero.jpeg"
        }
    }
    // earase header here
    deleteHeader(){
        const header = document.querySelector("#header");
        console.log(header);
        header.innerHTML="";
    }
    // fonction pour la composante aside à construire dans le constructeur de la classe
    async aside(animal){
        if(!animal){
            let animal = window.location.href
            if(String(animal).includes('dog')){
                animal = '/dog';
            }
            else if(String(animal).includes('cat')){
                animal = '/cat';
            }
            else{
                animal = '/dog';
            }
            async function getData(url) {
                console.log(url)
                const response = await fetch(url)
                return response.json()
            }
            let datas = await getData('/static/js/views/data' + animal + 'Data.json');
            console.log(datas);
            let aside = document.querySelector("#aside");
            let post = `
                        <nav class="aside-nav">
                            <a href="/" class="aside__link" data-link>Home</a>
                            <a href="/cat" class="aside__link" data-link>Cat</a>
                            <a href="/dog" class="aside__link" data-link>Dog</a>
                        `;
                datas.forEach((uneData)=>{
                    post += `<a href="${animal}/post-view/${uneData['id']}" class="aside__link" data-link>${uneData.name}</a>`
                })
                post += `</nav>`;
            aside.innerHTML= post;
            
        }
        else{
            async function getData(url) {
                console.log(url)
                const response = await fetch(url)
                return response.json()
            }
            let datas = await getData('/static/js/views/data' + animal + 'Data.json');
            console.log(datas);
            let aside = document.querySelector("#aside");
            let post = `
                        <nav class="aside-nav">
                            <a href="/cat" class="aside__link" data-link>Cat</a>
                            <a href="/dog" class="aside__link" data-link>Dog</a>
                        `;
                datas.forEach((uneData)=>{
                    post += `<a href="${animal}/post-view/${uneData['id']}" class="aside__link" data-link>${uneData.name}</a>`
                })
                post += `</nav>`;
            aside.innerHTML= post;
            
        }
        return aside;
       
    }
    async search(datas, e){
        console.log(typeof(datas));
        // aller sélectionner la valeur de l'input qui est avant le e.target
        let input = document.querySelector(".form-control").value;
        var res=[];
        res = datas.filter(data=> ((JSON.stringify(data)).toUpperCase()).includes((String(input)).toUpperCase()));
        return res;
    }
    typeAnimal(animalTitre){
        animalTitre = animalTitre.slice(1);
        animalTitre = animalTitre.charAt(0).toUpperCase() + animalTitre.slice(1)
        animalTitre = animalTitre.concat("s");
        return animalTitre;
    }

    redirection(e){
        e.target.classList.toggle("cat");
        console.log(e.target);
        
        if(e.target.classList.contains("cat")){
            window.location.replace("http://localhost:8082/cat");
        }
        else{
            window.location.replace("http://localhost:8082/dog");
        }
    }

    async getHtml() {
        return ""
    }
}