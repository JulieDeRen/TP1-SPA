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
    }

    async getHtml() {
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }
        // console.log(window.location.pathname);
        const data = await getData('/static/js/views/data' + this.#animal + 'Data.json');

        
        
        // enlever le slash first char
        let animalTitre = this.#animal;
        animalTitre = animalTitre.slice(1);
        animalTitre = animalTitre.charAt(0).toUpperCase() + animalTitre.slice(1)
        console.log(animalTitre);

        let listPosts = `<h1>${animalTitre}</h1>`

        listPosts += "<ul>";
        for(let i in data){
            listPosts += "<li><a href='"+this.#animal+"/post-view/"+data[i]['id']+"' data-link>"+data[i]['name']+"</a></li>"
        }
        listPosts +="</ul>"

        

        return listPosts;
    }
}