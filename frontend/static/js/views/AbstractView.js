export default class {
    constructor(params){
        this.params = params
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

    async getHtml() {
        return ""
    }
}