window.onload = function () {
	document.getElementsByClassName('file-names')[0].style.display = 'none';

	var fileUpload = document.getElementById('prj-input-1');
	console.log(fileUpload);
	
	fileUpload.onchange = function () {
		try {
			new JSZip()
				.loadAsync(fileUpload.files[0], {
					checkCRC32: true,
					createFolders: true,
				})
				.then(
					function (zip) {
						zip.file('INSTRUCTIONS')
							.async('string')
							.then(
								function (markdown) {
									markdown = markdown.replace('<', '<');
									//removed - doesn't work, dont know why, dont care enough to fix or optimise.
									/*if (getCookie("allowProfanity") = "true"){
							content = removeProfanity(content)
						}*/
									var ins =
										document.getElementById(
											'_instructions'
										);
									// parse and purify the markdown file, and write it to the page.
									ins.innerHTML = DOMPurify.sanitize(
										marked(markdown)
									);
									// make a outline
									document.getElementById(
										'_sidebar'
									).innerHTML = toc(ins);
									// fix the images
									var _img = document
										.getElementById('_instructions')
										.querySelectorAll('img');
									imageFixer(_img, zip);
								},
								function (e) {
									halfmoon.initStickyAlert({
										content: e,
										title: 'error getting instructions',
										alertType: 'alert-danger',
									});
								}
							);
						zip.file('OBJECT')
							.async('string')
							.then(
								function (content) {
									// parse the object
									var obj = JSON.parse(content);
									// fill the info page
									document.getElementById(
										'info-title'
									).innerHTML = obj.title;
									document.getElementById(
										'info-description'
									).innerHTML = obj.description;
									obj.price = `${obj.priceformat}${obj.price[0]} - ${obj.priceformat}${obj.price[1]}`;
									document.getElementById(
										'info-price'
									).innerHTML = obj.price;
									document.getElementById(
										'info-date'
									).innerHTML = obj.date;
								},
								function (e) {
									halfmoon.initStickyAlert({
										content: e,
										title: 'error getting info',
										alertType: 'alert-danger',
									});
								}
							);
						images(zip);
					},
					function (e) {
						halfmoon.initStickyAlert({
							content: e,
							title: 'error reading file',
							alertType: 'alert-danger',
						});
					}
				);
			_switch('images');
		} catch (e) {
			halfmoon.initStickyAlert({
				content: e,
				title: 'error!',
				alertType: 'alert-danger',
			});
		}
	};
};
/**
 * fixes images
 * @param {element array} img - an array of the images that you want fixing
 * @param {object} zip - a jszip object to source the files from
 */
function imageFixer(img, zip) {
	// give the images an id
	for (let i = 0; i < img.length; i++) {
		const element = img[i];
		element.id = i;
	}
	img.forEach((element) => {
		// the src of the images is a full path, so we change that to just the filename
		var filename = element.src.substring(element.src.lastIndexOf('/') + 1);
		// if you get a file that doesn't exist, its value is null
		if (zip.file('images/' + filename) != null) {
			// get the file
			zip.file('images/' + filename)
				.async('base64')
				.then(
					function (img) {
						// render the image
						document.getElementById(element.id).src =
							'data:image/png;base64,' + img;
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
			const randIndex = Math.floor(Math.random() * alt_images.length);
			element.src = alt_images[randIndex];
		}
	});
	_switch('instructions');
}
/**
 * extracts images from a zip file
 * @param {jszip object} zip - the zip files you want extracting
 */
function images(zip) {
	zip.folder('images').forEach(function (relativePath, file) {
		zip.file('images/' + relativePath)
			.async('base64')
			.then(
				function (img) {
					// fill the img page
					var html =
						'<div class="w-400"><div class="card p-0"><img src="data:image/png;base64,' +
						img +
						'"></img><div class="content"><h2 class="content-title">' +
						file.name.replace('images/', '') +
						'</h2></div></div></div>';
					document.getElementById('_images_grid').innerHTML += html;
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
}
