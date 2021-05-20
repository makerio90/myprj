function toc() {
    var ins = document.getElementById('_instructions');
    var ell = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    var lst = ins.querySelectorAll(ell);
    var html = '<ul>';
    var IndentLevel = '';
    lst.forEach((element) => {
        var Indent = ell.indexOf(element.tagName);
        var toindent = Indent - IndentLevel;
        while (toindent != 0) {
            if (toindent > 0) {
                html += '<ul>';
                toindent--
                IndentLevel++;
            }
            if (toindent < 0) {
                html += '</ul>';
                toindent++;
                IndentLevel--;
            }
        }
        
        html +=
        '<li><a class="hyperlink text-muted" href="#' +
        element.innerText
        .toLowerCase()
        .replace(/\s/g, '-')
        .replace('/', '')
        .replace(')', '') +
        '">' +
        element.innerText +
        '</li>';
    });
    html += '</ul>';
    document.getElementById('_sidebar').innerHTML = html;
}
