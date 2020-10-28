/**
 * @author  Michael Grigoryan
 * @version 1.0.0
 */

/*
 * Licensed under MIT License
 * Copyright 2020 Michael Grigoryan
 * Save ISS Location Over Time ( SISSLOT ) yeah, I know that this is a bullshit name
 * Save ISS location over time to MongoDB
 * This is a cool project... yeah.. I'm so lonely..
*/

require("dotenv").config();

const fetch = require("node-fetch");
const mongoose = require("mongoose");
const moment = require("moment");

const dataSchema = require("./models/data");

let output;
let allData = [];

console.log("STARTING...");

mongoose.connect(process.env.MONGO, { useUnifiedTopology: true, useNewUrlParser: true });

function fetchData() {
    fetch("http://api.michaelgrigoryan.com/iss-api")
        .then(res => res.json())
        .then(data => {
            let latitude = data.details.iss_position.latitude;
            let longitude = data.details.iss_position.longitude;
            let coords = [`${latitude}`, `${longitude}`];

            allData.push(coords);

            let dataMongo = new dataSchema({
                latitude: latitude,
                longitude: longitude,
                latlng: `${latitude}, ${longitude}`
            })

            dataMongo.save()
            console.log(`Saving timestamp: ${moment().format()}`);
        })
        .catch(e => {
            console.log(e);
        });
};

console.log("STARTED");
setInterval(fetchData, 1000);
