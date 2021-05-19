function toc() {
    var ins = document.getElementById('_instructions')
    var ell = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    var lst = ins.querySelectorAll(ell);
    var html = '<ul>';
    var indent = '';
    lst.forEach((element) => {
        indent = ell.indexOf(element.tagName);
        for (let index = 0; index < indent; index++) {
            html += "<ul>"
        }
        html += 
        '<li><a class="hyperlink text-muted" href="#' +
        element.innerText.toLowerCase().replace(/\s/g, '-').replace("/", '').replace(")", '')
        + 
        '">' +
        element.innerText +
        '</li>';
        for (let index = 0; index < indent; index++) {
            html += "</ul>"
        }
    });
    html += '</ul>';
    document.getElementById('toc').innerHTML = html
}
