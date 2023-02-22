import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Posts")
    }

    async getHtml() {
        async function getData(url){
            const response = await fetch(url)
            return response.json()
        }
        // console.log(window.location.pathname);
        let animal = window.location.pathname;
        const data = await getData('/static/js/views/data' + animal + 'Data.json')
        
        // enlever le slash first char
        let animalTitre = animal;
        animalTitre = animalTitre.slice(1);
        animalTitre = animalTitre.charAt(0).toUpperCase() + animalTitre.slice(1)
        console.log(animalTitre);

        let listPosts = `<h1>${animalTitre}</h1>`

        listPosts += "<ul>";
        for(let i in data){
            listPosts += "<li><a href='"+animal+"/post-view/"+data[i]['id']+"' data-link>"+data[i]['name']+"</a></li>"
        }
        listPosts +="</ul>"

        

        return listPosts;
    }
}