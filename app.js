const express = require("express");
const app = express();
const fs = require("fs");
const formidable = require("formidable");
const mv = require("mv");

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/upload", (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        let ekstensi = files.file.originalFilename.split(".");
        ekstensi = ekstensi[ekstensi.length - 1];

        let newName = Math.round(Math.random() * 100000 * 100000);

        const oldpath = files.file.filepath;
        const newpath = __dirname + "/uploads/" + `${newName}.${ekstensi}`;

        mv(oldpath, newpath, function (err) {
            if (err) {
                throw err;
            }
            console.log("file uploaded successfully");
            return res.end("file uploaded successfully");
        });
    });
});

app.listen(3000, () => console.log(`Listening on port 3000...`));
