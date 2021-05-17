function _switch(i) {
    var pages = ["_instructions", "_images", "_code", "_3d", "_pcbs", "_sch", "_bom", "_info"]
    for (let index = 0; index < pages.length; index++) {
        const element = pages[index];
        switch_visibility(element, false)
    }
    switch_visibility("_" + i, true)
}
function switch_visibility(i, s) {
    document.getElementById(i).style.display,
    (document.getElementById(i).style.display = 1 == s ? 'block' : 'none');
}
