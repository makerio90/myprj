/**
 * switch to a page
 * @param {string} i - the page yoy want to switch to
 * @example
 * _switch('code')
 */
function _switch(i) {
    // all the pages
    var pages = [
        '_index_',
        '_instructions',
        '_images',
        '_code',
        '_3d',
        '_pcbs',
        '_sch',
        '_bom',
        '_info',
    ];
    // loop through and hide everything
    for (let index = 0; index < pages.length; index++) {
        const element = pages[index];
        switch_visibility(element, false);
    }
    // enable the page
    switch_visibility('_' + i, true);
}
/**
 *  switch the visibility of an element
 * @param {string} i -tle element you want to switch
 * @param {boolean} s - tun it on or off
 */
function switch_visibility(i, s) {
    document.getElementById(i).style.display,
        (document.getElementById(i).style.display = 1 == s ? 'block' : 'none');
}
