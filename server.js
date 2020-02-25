/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Jim Fang. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *  Server sided hosted on Heroku. Website hosted on Infinity Free.
 *  WEBSITE WITH IMPLIMENTATION: http://generator.rocketscience.monster/
 *--------------------------------------------------------------------------------------------*/

var fs = require('fs');
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var fontkit = require('@pdf-lib/fontkit');
const pdfLib = require('pdf-lib');
const { degrees, PDFDocument, StandardFonts, rgb } = pdfLib;
var util = require('util');
var fs = require('fs');
const fetch = require("node-fetch");
var vertical = 'horizontal'


var classes = ["", "", "", "", "", "", ""];

app.post('/', function (request, response) {
    console.log('POST /')
    console.log(request.body)
    classes[0] = request.body.first;
    classes[1] = request.body.second;
    classes[2] = request.body.third;
    classes[3] = request.body.fourth;
    classes[4] = request.body.fifth;
    classes[5] = request.body.sixth;
    classes[6] = request.body.seventh;
    vertical = request.body.vertical;

    console.log(vertical)


    var fontData;
    fs.readFile('Roboto-Regular.ttf', function read(err, data1) {
        if (err) {
            throw err;
        }
        fontData = data1;
        if (vertical === "horizontal") {
            fs.readFile('./colPreSch.pdf', function read(err, data) {
                if (err) {
                    throw err;
                }
                content = data;
                console.log(data);
                modifyPdf(data, fontData, classes, vertical);          // Or put the next step in a function and invoke it
            });
        } else if (vertical === 'vertical') {
            fs.readFile('./verticalSchGen.pdf', function read(err, data) { // update this with vertical file
                if (err) {
                    throw err;
                }
                content = data;
                console.log(data);
                modifyPdf(data, fontData, classes, vertical);          // Or put the next step in a function and invoke it
            });
        }
    });

    async function modifyPdf(data, font, clathingsses, vertical) {
        // Load exsisting PDF
        const existingPdfBytes = data
        const pdfDoc = await PDFDocument.load(existingPdfBytes)
        //register Font
        await pdfDoc.registerFontkit(fontkit);
        //embed font
        const productSansFont = await pdfDoc.embedFont(font);

        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        console.log(`width: ${width}`)
        console.log(`height: ${height}`)
        var x = 0;
        var y = 0;
        var classesDone = 0;
        console.log(vertical)
        console.log(vertical === 'horizontal')
        console.log(vertical == 'horizontal')
        // I am sorry :( IK this is stupidly inefficient; but dont kill me pls thx <3

        if (vertical === 'horizontal') {

            var final = ["", "", "", "", "", "", ""]

            //M1
            for (var i = 0; i < 7; i++) {
                final[i] = classes[i]

            }
            x = 121.68;
            y = 1230;
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 250

                }
                else if (classesDone === 3) {
                    y -= 290
                }
                else {
                    y -= 145

                }

            }

            //t1
            console.log("I AM IN T1")
            final = ["", "", "", "", "", "", ""]
            x += 170;
            y = 1230;
            var t1 = [1, 2, 0, 3, 5, 6, 4]
            for (var i = 0; i < 7; i++) {
                final[i] = classes[t1[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 250
                }
                else if (classesDone === 3) {
                    y -= 290
                }
                else {
                    y -= 145
                }

            }

            //w1
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 180;
            y = 1187;
            var w1 = [0, 1, 4, 5]
            for (var i = 0; i < 4; i++) {
                final[i] = classes[w1[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 4; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 386
                }
                else if (classesDone === 1) {
                    y -= 357
                }
                // else if (classesDone === 2) {
                //     y -= 290
                // }
                else {
                    y -= 280
                }

            }

            //r1
            console.log("I am in r1")
            final = ["", "", "", "", "", "", ""]
            x += 168;
            y = 1022;
            var w1 = [2, 3, 6]
            for (var i = 0; i < 3; i++) {
                final[i] = classes[w1[i]]
                console.log(i)
            }
            for (classesDone = 0; classesDone < 3; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 315
                }
                else if (classesDone === 1) {
                    y -= 542
                }
                else {
                    y -= 280
                }
            }

            //f1
            console.log("I am in r1")
            final = ["", "", "", "", "", "", ""]
            x += 172;
            y = 1230;
            var f1 = [2, 0, 1, 3, 6, 4, 5]
            for (var i = 0; i < 7; i++) {
                final[i] = classes[f1[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 250

                }
                else if (classesDone === 3) {
                    y -= 290
                }
                else {
                    y -= 145

                }
            }

            //M2
            for (var i = 0; i < 7; i++) {
                final[i] = classes[i]
            }
            console.log(final)
            x += 230;
            y = 1230;
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 250
                }
                else if (classesDone === 3) {
                    y -= 290
                }
                else {
                    y -= 145
                }
            }

            //t2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 175;
            y = 1187;
            var t2 = [1, 0, 5]
            for (var i = 0; i < 3; i++) {
                final[i] = classes[t2[i]]
            }
            console.log(final)
            for (classesDone = 0; classesDone < 3; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((171.36 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 386
                }
                else if (classesDone === 1) {
                    y -= 450
                }
                else {
                    y -= 280
                }
            }

            //w2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 170;
            y = 1187;
            var w2 = [2, 3, 6, 4]
            for (var i = 0; i < 4; i++) {
                final[i] = classes[w2[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 4; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((171.36 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 386
                }
                else if (classesDone === 1) {
                    y -= 375
                }
                else {
                    y -= 272
                }
            }

            //r2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 170;
            y = 1187;
            var r2 = [0, 1, 4, 5]
            for (var i = 0; i < 4; i++) {
                final[i] = classes[r2[i]]
            }
            console.log(final)
            for (classesDone = 0; classesDone < 4; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((171.36 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 386
                }
                else if (classesDone === 1) {
                    y -= 375
                }
                else {
                    y -= 272
                }
            }

            //f2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 173;
            y = 1187;
            var r2 = [2, 3, 6]
            for (var i = 0; i < 3; i++) {
                final[i] = classes[r2[i]]
            }
            console.log(final)
            for (classesDone = 0; classesDone < 3; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((171.36 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 20,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 445
                }
                else if (classesDone === 1) {
                    y -= 515
                }
                else {
                    y -= 265
                }

            }
        } else if (vertical === 'vertical') {
            console.log("I AM IN VERTICAL")
            var final = ["", "", "", "", "", "", ""]

            //M1
            for (var i = 0; i < 7; i++) {
                final[i] = classes[i]

            }
            x = 38.16;
            y = 686;
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], { //54.72
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 78

                }
                else if (classesDone === 3) {
                    y -= 92
                }
                else {
                    y -= 45.5

                }

            }

            //t1
            console.log("I AM IN T1")
            final = ["", "", "", "", "", "", ""]
            x += 56.5;
            y = 686;
            var t1 = [1, 2, 0, 3, 5, 6, 4]
            for (var i = 0; i < 7; i++) {
                final[i] = classes[t1[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 78
                }
                else if (classesDone === 3) {
                    y -= 92
                }
                else {
                    y -= 45.5
                }

            }

            //w1
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 54.5;
            y = 676;
            var w1 = [0, 1, 4, 5]
            for (var i = 0; i < 4; i++) {
                final[i] = classes[w1[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 4; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 119
                }
                else if (classesDone === 1) {
                    y -= 119
                }
                // else if (classesDone === 2) {
                //     y -= 290
                // }
                else {
                    y -= 85.4
                }

            }

            //r1
            console.log("I am in r1")
            final = ["", "", "", "", "", "", ""]
            x += 55;
            y = 618.48;
            var w1 = [2, 3, 6]
            for (var i = 0; i < 3; i++) {
                final[i] = classes[w1[i]]
                console.log(i)
            }
            for (classesDone = 0; classesDone < 3; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 99
                }
                else if (classesDone === 1) {
                    y -= 169.2
                }
                else {
                    y -= 280
                }
            }

            //f1
            console.log("I am in r1")
            final = ["", "", "", "", "", "", ""]
            x += 54.3;
            y = 686;
            var f1 = [2, 0, 1, 3, 6, 4, 5]
            for (var i = 0; i < 7; i++) {
                final[i] = classes[f1[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 78

                }
                else if (classesDone === 3) {
                    y -= 92
                }
                else {
                    y -= 45.5

                }
            }

            //M2
            for (var i = 0; i < 7; i++) {
                final[i] = classes[i]
            }
            console.log(final)
            x += 72;
            y = 686;
            for (classesDone = 0; classesDone < 7; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 78

                }
                else if (classesDone === 3) {
                    y -= 92
                }
                else {
                    y -= 45.5

                }
            }

            //t2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 56.5;
            y = 680;
            var t2 = [1, 0, 5]
            for (var i = 0; i < 3; i++) {
                final[i] = classes[t2[i]]
            }
            console.log(final)
            for (classesDone = 0; classesDone < 3; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 1) {
                    y -= 138.96
                }
                else if (classesDone === 3) {
                    y -= 290
                }
                else {
                    y -= 126.72
                }
            }

            //w2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 55;
            y = 680;
            var w2 = [2, 3, 6, 4]
            for (var i = 0; i < 4; i++) {
                final[i] = classes[w2[i]]
                console.log(i)
            }
            console.log(final)
            for (classesDone = 0; classesDone < 4; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 126.72
                }
                else if (classesDone === 1) {
                    y -= 115.92
                }
                else {
                    y -= 84.24
                }
            }

            //r2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 55;
            y = 680;
            var r2 = [0, 1, 4, 5]
            for (var i = 0; i < 4; i++) {
                final[i] = classes[r2[i]]
            }
            console.log(final)
            for (classesDone = 0; classesDone < 4; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 126.72
                }
                else if (classesDone === 1) {
                    y -= 115.92
                }
                else {
                    y -= 84.24
                }
            }

            //f2
            console.log("I am in w1")
            final = ["", "", "", "", "", "", ""]
            x += 55;
            y = 680;
            var r2 = [2, 3, 6]
            for (var i = 0; i < 3; i++) {
                final[i] = classes[r2[i]]
            }
            console.log(final)
            for (classesDone = 0; classesDone < 3; classesDone++) {
                firstPage.drawText(final[classesDone], {
                    x: ((54.72 - productSansFont.widthOfTextAtSize(final[classesDone], 7)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                    y: y,
                    size: 7,
                    font: productSansFont
                })
                if (classesDone === 0) {
                    y -= 144
                }
                else if (classesDone === 1) {
                    y -= 162.72
                }
                else {
                    y -= 265
                }
            }

        }

        const pdfBytes = await pdfDoc.save()
        fs.writeFileSync('./out.pdf', pdfBytes, 'utf-8');
        var file = fs.createReadStream('./out.pdf');
        var stat = fs.statSync('./out.pdf');
        response.setHeader('Content-Length', stat.size);
        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader('Content-Disposition', 'attachment; filename=out.pdf');
        file.pipe(response);
    }
})

port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port)
console.log(`Listening at localhost:8000`)
//https://cpsschgendev.herokuapp.com:${port}
//https://blooming-tor-45007.herokuapp.com