const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('request');
const config = require('./config.js')
const { PORT } = require('./config');
const { API_KEY } = require('./config');
const app=express();


//app.get('/ticker=:id', function(req, res){ ...  ajout ... });
function getDataCat(){
    let ticker = 'catData';
    let url = 'https://api.thecatapi.com/v1/breeds';

        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
            console.log('Error:', err);
            } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
            } else {
            // data is successfully parsed as a JSON object:
            let newData = JSON.stringify(data)
                fs.writeFile('./frontend/static/js/views/data/' + ticker + '.json', newData, err => {
                if(err) throw err;
                // console.log(newData);
                console.log("success");
                })
                let datas = JSON.parse(newData);

            }
            
        })
    
}

function getCatImage(){
    let ticker = 'catImgData';
    let url = 'https://api.thecatapi.com/v1/images';

    fs.readFile('./frontend/static/js/views/data/' + ticker + '.json', newData, err => {})

        request.get({
            url: url,
            json: true,
            headers: {'User-Agent': 'request'}
        }, (err, res, data) => {
            if (err) {
            console.log('Error:', err);
            } else if (res.statusCode !== 200) {
            console.log('Status:', res.statusCode);
            } else {
            // data is successfully parsed as a JSON object:
            let newData = JSON.stringify(data)
                fs.writeFile('./frontend/static/js/views/data/' + ticker + '.json', newData, err => {
                if(err) throw err;
                // console.log(newData);
                console.log("success");
                })
                let datas = JSON.parse(newData);

            }
            
        })
}


function getDataDog(){
    let ticker = 'dogData';
    let url = 'https://api.thedogapi.com/v1/breeds';

    request.get({
        url: url,
        json: true,
        headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
        if (err) {
        console.log('Error:', err);
        } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
        } else {
        // data is successfully parsed as a JSON object:
        let newData = JSON.stringify(data)
            fs.writeFile('./frontend/static/js/views/data/' + ticker + '.json', newData, err => {
            if(err) throw err;
            // console.log(newData);
            console.log("success");
            })
        }
    })
}

getDataCat();
getDataDog();

console.log(__dirname);
// créer une exception sur le dossier static
// // app.use("/cat/", express.static(path.resolve(__dirname, "frontend", "static")));
// app.use("/dog/", express.static(path.resolve(__dirname ./, "frontend", "static")));
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// toujours tomber sur index

app.get('/*', function(req, res){
    /*console.log(req.url);
    if(String(req.url).includes("cat")){
        console.log("test req")
        req.url = req.url.replaceAll("cat/", "");
    }
    console.log(req.url);
    // path.resolve utilise le chemin absolu
    
    console.log("test server");*/
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});


app.listen(8082, ()=> console.log("server TP1 running..."));


