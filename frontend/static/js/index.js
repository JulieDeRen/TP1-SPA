//router
import Dashboard from "./views/Dashboard.js"
import Posts from "./views/Posts.js"
import PostView from "./views/PostView.js"

const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")

const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    return Object.fromEntries(keys.map((key, i) =>{
        return [key, values[i]]
    }))
}

const router = async () => {

    const routes = [
        {path: "/", view:Dashboard},
        {path: "/cat", view:Posts},
        {path: "/dog", view:Posts},
        {path: "/cat/", view:Posts},
        {path: "/dog/", view:Posts},
        {path: '/cat/post-view/:id', view: PostView},
        {path: '/dog/post-view/:id', view: PostView}
    ]
    //match
    const potencialMatches = routes.map(route =>{
        return{
            route: route,
            //isMatch: location.pathname === route.path
            result: location.pathname.match(pathToRegex(route.path))
        }
    })
    //console.log(potencialMatches)
     let match = potencialMatches.find(potencialMatch => potencialMatch.result != null)

     if(!match){
         match = {
            route: routes[0],
            result: [location.pathname]
         }
     }
     //console.log(match)
     const view = new match.route.view(getParams(match))
     document.querySelector("#app").innerHTML = await view.getHtml()
}

const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", ()=>{
    document.body.addEventListener("click", e => {
        // ajouter condition si clique sur icône <i>
        if(e.target.matches("[data-link]")||e.target.classList.contains("bx")){
            // console.log(e.target);
            let element = e.target;
            if(e.target.classList.contains("bx")){
                element=element.parentElement;
            }
            e.preventDefault()
            navigateTo(element.href)
        }
    })
    router()
})