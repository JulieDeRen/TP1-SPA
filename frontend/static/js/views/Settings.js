import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params)
        this.setTitle("Settings")
    }

    async getHtml() {
        return `
        <h1>Settings</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum quas cumque harum libero! Dicta explicabo voluptatibus iste vitae dolor corrupti, voluptas assumenda pariatur cum obcaecati dignissimos ipsa, repellat delectus saepe.</p>
        <p>
            <a href="/posts" data-link>Voir les publications</a>
        </p>
        `;
    }
}