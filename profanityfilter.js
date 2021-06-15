function removeProfanity(badString, arr) {
	arr.forEach((word) => {
		const re = new RegExp(`\\b${word}\\b`);
		badString = badString.replace(
			re,
			`${word.charAt(0)}${'*'.repeat(word.length - 1)}`
		);
	});
	return badString;
}
