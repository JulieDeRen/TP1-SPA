export default class {
    constructor(params){
        this.params = params
        //console.log(params);
    }
    setTitle(title){
        document.title = title
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
    aside(){
        let aside = document.querySelector("#aside");
        aside.innerHTML= `
                        <nav class="aside-nav">
                            <a href="/" class="aside__link" data-link>Home</a>
                            <a href="/cat" class="aside__link" data-link>Cat</a>
                            <a href="/dog" class="aside__link" data-link>Dog</a>
                        </nav>`
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

    async getHtml() {
        return ""
    }
}