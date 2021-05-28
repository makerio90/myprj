/**
 * make a table of content
 * @param {element} ins - the thing you want to outline
 * @return {string} - a html string
 * @example
 * var a = document.getElementById('aReallyLongDoc')
 * document.getElementById('aSmallOutline').innerHTML = toc(a)
 */
function toc(ins) {
    var ell = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'];
    var lst = ins.querySelectorAll(ell);
    var html = '<ul>';
    var IndentLevel = '';
    lst.forEach((element) => {
        var Indent = ell.indexOf(element.tagName);
        var toIndent = Indent - IndentLevel;
        while (toIndent != 0) {
            if (toIndent > 0) {
                html += '<ul>';
                toIndent--;
                IndentLevel++;
            }
            if (toIndent < 0) {
                html += '</ul>';
                toIndent++;
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
            element.innerText.replace('<', '').replace('>', '') +
            '</li>';
    });
    html += '</ul>';
    return html;
}
