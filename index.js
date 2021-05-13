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
                        },
                        function (e) {
                            halfmoon.initStickyAlert({
                                content: e,
                                title: 'error getting instructions',
                                alertType: 'alert-danger',
                            });
                        }
                    );
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
