const express = require('express');
const path = require('path');
const fs = require('fs');
const request = require('request');
const config = require('./config.js')
const { PORT } = require('./config');
const { API_KEY } = require('./config');
const app=express();


// obtenir données chats
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

            }
            
        })
    
}

function getCatImage(){
    let ticker = 'catImgData2';
    let newData='';
  
        fs.readFile(__dirname + "/frontend/static/js/views/data/catData.json", 'utf8', function (err, data){
            (JSON.parse(data)).forEach((uneData)=>{
                let url = 'https://api.thecatapi.com/v1/images/' + uneData.reference_image_id;
                request.get({
                    url: url,
                    json: true,
                    mode: 'cors',
                    headers: {'User-Agent': 'request'}
                }, (err, res, data) => {
                    if (err) {
                    console.log('Error:', err);
                    } else if (res.statusCode !== 200) {
                    console.log('Status:', res.statusCode);
                    } else {
                    // data is successfully parsed as a JSON object:
                    newData += JSON.stringify(data)
                    }

                })


            })
            // Écrire le fichier json pour les images de chats
            fs.writeFile('./frontend/static/js/views/data/' + ticker + '.json', newData, err => {
                if(err) throw err;
            })

        })
     
}

// données chiens
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
// appel des fonctions fetch et store datas in file
getDataCat();
getDataDog();
getCatImage();

// créer une exception sur le dossier static
app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

// toujours tomber sur index

app.get('/*', function(req, res){
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});


app.listen(8082, ()=> console.log("server TP1 running..."));


