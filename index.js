// var fs = require('fs');
var fontkit = require('@pdf-lib/fontkit');
const pdfLib = require('pdf-lib');
const { degrees, PDFDocument, StandardFonts, rgb } = pdfLib;
var util = require('util');
var fs = require('fs');
const fetch = require("node-fetch");

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
        modifyPdf(data, fontData);          // Or put the next step in a function and invoke it
    });

    // console.log(data)
});




//create & load custom font
// console.log(font)
// const font = fontkit.create(fontData);


async function modifyPdf(data, font) {
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
    //M1
    x = 121.68;
    y = 1230;
    // console.log(productSansFont.widthOfTextAtSize('Asian Worlds', 20))
    for (classesDone = 0; classesDone < 8; classesDone++) {
        firstPage.drawText('English I', {
            x: ((169.92 - productSansFont.widthOfTextAtSize('English I', 20)) / 2) + x, //x & y measured in points; divide point value by 72 to get inches.
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

    const pdfBytes = await pdfDoc.save()
    fs.writeFileSync('./out.pdf', pdfBytes, 'utf-8');
}