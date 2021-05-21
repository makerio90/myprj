function go() {
    var fileupload = document.getElementById('prj-input-1').files[0];
    new JSZip()
    .loadAsync(fileupload, {checkCRC32: true, createFolders: true})
    .then(
        function (zip) {
            zip.file('INSTRUCTIONS.md')
            .async('string')
            .then(
                function (content) {
                    document.getElementById('_instructions').innerHTML =
                    DOMPurify.sanitize(marked(content));
                    toc()
                    var _img = document.getElementById('_instructions').querySelectorAll("img")
                    for (let i = 0; i < _img.length; i++) {
                        const element = _img[i];
                        element.id = i
                    }
                    _img.forEach(element => {
                        var filename = element.src.substring(element.src.lastIndexOf('/')+1);
                        if(zip.file('images/' + filename) != null){
                        zip.file('images/' + filename)
                        .async('base64')
                        .then(
                            function (img) {
                                document.getElementById(element.id).src = 'data:image/png;base64,' + img
                            },
                            function (e) {
                                halfmoon.initStickyAlert({
                                    content: e,
                                    title: 'error getting instructions',
                                    alertType: 'alert-danger',
                                });
                            }
                            );} else{
                                element.src = 'alt.png'
                            }
                        });
                    },
                function (e) {
                    halfmoon.initStickyAlert({
                        content: e,
                        title: 'error getting instructions',
                        alertType: 'alert-danger',
                    });
                }
                );
                zip.file('OBJECT.json')
                .async('string')
                .then(
                    function (content) {
                        var obj = JSON.parse(content);
                        document.getElementById('info-title').innerHTML =
                        obj.title;
                        document.getElementById(
                            'info-description'
                            ).innerHTML = obj.description;
                            obj.price =
                            obj.priceformat +
                            obj.price[0] +
                            ' - ' +
                            obj.priceformat +
                            obj.price[1];
                            document.getElementById('info-price').innerHTML =
                            obj.price;
                            document.getElementById('info-date').innerHTML =
                            obj.date;
                        },
                        function (e) {
                            halfmoon.initStickyAlert({
                                content: e,
                                title: 'error getting info',
                                alertType: 'alert-danger',
                            });
                        }
                        );
                        zip.folder('images').forEach(function (relativePath, file) {
                            zip.file('images/' + relativePath)
                            .async('base64')
                            .then(
                                function (img) {
                                    var html =
                                    '<img src="data:image/png;base64,' +
                                    img +
                                    '"></img><br>';
                                    document.getElementById('_images').innerHTML +=
                                    html;
                                },
                                function (e) {
                                    halfmoon.initStickyAlert({
                                        content: e,
                                        title: 'error getting images',
                                        alertType: 'alert-danger',
                                    });
                                }
                                );
                            });
                        },
                        function (e) {
                            halfmoon.initStickyAlert({
                                content: e,
                                title: 'error reading file',
                                alertType: 'alert-danger',
                            });
                        }
                        );
                    }
                    