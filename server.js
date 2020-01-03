// HOSTED ON HEROKU
var fs = require('fs');
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());       // to support JSON-encoded bodies
// app.use(express.urlencoded()); // to support URL-encoded bodies
// var connect = require('connect');
// var serveStatic = require('serve-static');
// connect().use(serveStatic(__dirname)).listen(8080, function () {
//     console.log('Server running on 8080...');
// });

// function starting() {
var fontkit = require('@pdf-lib/fontkit');
const pdfLib = require('pdf-lib');
const { degrees, PDFDocument, StandardFonts, rgb } = pdfLib;
var util = require('util');
var fs = require('fs');
const fetch = require("node-fetch");


var classes = ["", "", "", "", "", "", ""];

app.post('/', function (request, response) {
    console.log('POST /')
    console.log(request.body.first)
    // console.log(request.body.username)
    // console.log(request.body.password)
    // console.log(request.body.email)
    // console.log(request.body.url)
    console.log(request.body)
    // response.writeHead(200, { 'Content-Type': 'text/html' })
    // response.send("Reveiced!!!")
    // response.end('thanks POST req received')


    classes[0] = request.body.first;
    classes[1] = request.body.second;
    classes[2] = request.body.third;
    classes[3] = request.body.fourth;
    classes[4] = request.body.fifth;
    classes[5] = request.body.sixth;
    classes[6] = request.body.seventh;

    var fontData;
    fs.readFile('Roboto-Regular.ttf', function read(err, data1) {
        if (err) {
            throw err;
        }
        fontData = data1;
        // var font = fontkit.create(fontData)
        fs.readFile('./colPreSch.pdf', function read(err, data) {
            if (err) {
                throw err;
            }
            content = data;

            // Invoke the next step here however you like
            console.log(data);   // Put all of the code here (not the best solution)
            // console.log(font.stream.buffer)
            // console.log(font)
            modifyPdf(data, fontData, classes);          // Or put the next step in a function and invoke it
        });

        // console.log(data)
    });




    //create & load custom font
    // console.log(font)
    // const font = fontkit.create(fontData);


    async function modifyPdf(data, font, classes) {
        // Load exsisting PDF

        // const url = './colPreSch.pdf'
        const existingPdfBytes = data

        // const url = './colPreSch.pdf'
        // const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        //-----

        //register Font
        await pdfDoc.registerFontkit(fontkit);

        //embed font
        console.log("dlJASLKDFJASLKFDJLKSADJFDSjzLFKJDSALKFJSDALK;FJSDALFSDAJFL;KASDJFLK;SADJFL;KDSAJFL/K")
        console.log(font)
        console.log(classes)
        const productSansFont = await pdfDoc.embedFont(font);
        // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

        // //Get how much room text will take
        // const getProductCodePointWidth = (codePoint) =>
        //     productSansFontObj.font.glyphForCodePoint(codePoint).advanceWidth;

        // /* Returns the width of a string in the Ubuntu font with a given font size. */
        // const getProductStringWidth = (string, fontSize) =>
        //     string
        //         .split('')
        //         .map((c) => c.charCodeAt(0))
        //         .map((c) => getProductCodePointWidth(c) * (fontSize / 1000))
        //         .reduce((total, width) => total + width, 0);
        // //----


        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        console.log(`width: ${width}`)
        console.log(`height: ${height}`)
        var x = 0;
        var y = 0;
        var classesDone = 0;


        // function fillArray(classes, day) {
        //     var order = [0,0,0,0,0,0,0]
        //     var returnArray = ["","","","","","",""]
        //     if (day === "m1") {

        //     } else if(day === "t1") {
        //         order[0] = 2;
        //     }
        // }
        // I am sorry :( IK this is stupidly inefficient; but dont kill me pls thx <3
        // for (var i = 0; i < 10; i++) {
        var final = ["", "", "", "", "", "", ""]
        // var m1 = ["", "", "", "", "", "", ""]
        // if (i === 1) {  

        //M1
        for (var i = 0; i < 7; i++) {
            final[i] = classes[i]

        }
        console.log(final)
        x = 121.68;
        y = 1230;
        // console.log(productSansFont.widthOfTextAtSize('Asian Worlds', 20))
        for (classesDone = 0; classesDone < 7; classesDone++) {
            firstPage.drawText(final[classesDone], {
                x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                y: y,
                size: 20,
                font: productSansFont
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
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
        // }

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
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
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
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
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
        console.log(final)
        for (classesDone = 0; classesDone < 3; classesDone++) {
            firstPage.drawText(final[classesDone], {
                x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                y: y,
                size: 20,
                font: productSansFont
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
            })
            if (classesDone === 0) {
                y -= 315
            }
            else if (classesDone === 1) {
                y -= 542
            }
            // else if (classesDone === 2) {
            //     y -= 290
            // }
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
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
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
        // console.log(productSansFont.widthOfTextAtSize('Asian Worlds', 20))
        for (classesDone = 0; classesDone < 7; classesDone++) {
            firstPage.drawText(final[classesDone], {
                x: ((169.92 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                y: y,
                size: 20,
                font: productSansFont
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
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
            console.log(i)
        }
        console.log(final)
        for (classesDone = 0; classesDone < 3; classesDone++) {
            firstPage.drawText(final[classesDone], {
                x: ((171.36 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                y: y,
                size: 20,
                font: productSansFont
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
            })
            if (classesDone === 0) {
                y -= 386
            }
            else if (classesDone === 1) {
                y -= 450
            }
            // else if (classesDone === 2) {
            //     y -= 290
            // }
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
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
            })
            if (classesDone === 0) {
                y -= 386
            }
            else if (classesDone === 1) {
                y -= 375
            }
            // else if (classesDone === 2) {
            //     y -= 290
            // }
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
            console.log(i)
        }
        console.log(final)
        for (classesDone = 0; classesDone < 4; classesDone++) {
            firstPage.drawText(final[classesDone], {
                x: ((171.36 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                y: y,
                size: 20,
                font: productSansFont
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
            })
            if (classesDone === 0) {
                y -= 386
            }
            else if (classesDone === 1) {
                y -= 375
            }
            // else if (classesDone === 2) {
            //     y -= 290
            // }
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
            console.log(i)
        }
        console.log(final)
        for (classesDone = 0; classesDone < 3; classesDone++) {
            firstPage.drawText(final[classesDone], {
                x: ((171.36 - productSansFont.widthOfTextAtSize(final[classesDone], 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
                y: y,
                size: 20,
                font: productSansFont
                // color: rgb(0.95, 0.1, 0.1),
                // rotate: degrees(-45),
            })
            if (classesDone === 0) {
                y -= 445
            }
            else if (classesDone === 1) {
                y -= 515
            }
            // else if (classesDone === 2) {
            //     y -= 290
            // }
            else {
                y -= 265
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
    // }
})

port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}
app.listen(port)
console.log(`Listening at https://blooming-tor-45007.herokuapp.com:${port}`) 
