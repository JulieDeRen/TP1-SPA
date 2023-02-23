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

    async getHtml() {
        return ""
    }
}