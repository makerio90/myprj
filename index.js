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
                    marked(content);
                    toc()
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
                            console
                            .log('images/' + relativePath)
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
                    