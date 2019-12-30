// // // var http = require('http');

// // // var option = {
// // //     hostname: "localhost",
// // //     port: 8000,
// // //     method: "POST",
// // //     path: "/"
// // // }

// // // var request = http.request(option, function (resp) {
// // //     resp.on("data", function (chunck) {
// // //         console.log(chunck.toString());
// // //     })
// // // })
// // // request.end();

// // $('#classForm').on('submit', function (e) {
// //     e.preventDefault();
// //     $.ajax({
// //         type: "POST",
// //         url: "/classSubmit",
// //         data: $(this).serialize(),
// //         success: function () {
// //             alert('success');
// //         }
// //     });
// // });
// function submit() {
//     var xhr = new XMLHttpRequest();
//     xhr.open("POST", 'localhost:8000/', true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify({
//         value: "value"
//     }));
// }

// function post() {

// }

var form = document.getElementById('classForm');

form.onsubmit = function (e) {
    // stop the regular form submission
    e.preventDefault();

    // collect the form data while iterating over the inputs
    var data = {};
    for (var i = 0, ii = form.length; i < ii; ++i) {
        var input = form[i];
        if (input.name) {
            data[input.name] = input.value;
        }
    }

    // construct an HTTP request
    var xhr = new XMLHttpRequest();
    xhr.open(form.method, form.action, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onloadend = function () {
        // done
    };
};