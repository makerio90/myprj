function go(fileUpload) {
    new JSZip()
        .loadAsync(fileUpload, {checkCRC32: true, createFolders: true})
        .then(
            function (zip) {
                zip.file('INSTRUCTIONS.md')
                    .async('string')
                    .then(
                        function (content) {
                            content.replace('<', '\<');
                            var ins = document.getElementById('_instructions')
                            // parse and purify the markdown file, and write it to the page.
                            ins.innerHTML = DOMPurify.sanitize(marked(content));
                            // make a outline
                            document.getElementById('_sidebar').innerHTML = toc(ins);
                            // fix the images
                            var _img = document
                                .getElementById('_instructions')
                                .querySelectorAll('img');
                            // give the images an id
                            for (let i = 0; i < _img.length; i++) {
                                const element = _img[i];
                                element.id = i;
                            }
                            //fix the images
                            _img.forEach((element) => {
                                // the src of the images is a full path, so we change that to just the filename
                                var filename = element.src.substring(
                                    element.src.lastIndexOf('/') + 1
                                );
                                // if you get a file that doesn't exist, its value is null
                                if (zip.file('images/' + filename) != null) {
                                    // get the file
                                    zip.file('images/' + filename)
                                        .async('base64')
                                        .then(
                                            function (img) {
                                                // render the image
                                                document.getElementById(
                                                    element.id
                                                ).src =
                                                    'data:image/png;base64,' +
                                                    img;
                                            },
                                            function (e) {
                                                halfmoon.initStickyAlert({
                                                    content: e,
                                                    title: 'error getting instructions',
                                                    alertType: 'alert-danger',
                                                });
                                            }
                                        );
                                } else {
                                    // if the image doesn't exist, set it to alt.png
                                    // this is to prevent people from using external sources like imgur ang github
                                    var alt_images = [
										'images/alt-green.png',
										'images/alt-blue.png',
										'images/alt-red.png',
										'images/alt-yellow.png',
									];
                                    const randIndex = Math.floor(
										Math.random() * alt_images.length
									);
                                    element.src = alt_images[randIndex];
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
                            // parse the object
                            var obj = JSON.parse(content);
                            // fill the info page
                            document.getElementById('info-title').innerHTML =
                                obj.title;
                            document.getElementById(
                                'info-description'
                            ).innerHTML = obj.description;
                            obj.price =
                                `${obj.priceformat}${obj.price[0]} - ${obj.priceformat}${obj.price[1]}`;
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
                                // fill the img page
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
