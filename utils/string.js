var deburredLetters = {
	'\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
	'\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
	'\xc7': 'C',  '\xe7': 'c',
	'\xd0': 'D',  '\xf0': 'd',
	'\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
	'\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
	'\xcC': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
	'\xeC': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
	'\xd1': 'N',  '\xf1': 'n',
	'\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
	'\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
	'\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
	'\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
	'\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
	'\xc6': 'Ae', '\xe6': 'ae',
	'\xde': 'Th', '\xfe': 'th',
	'\xdf': 'ss'
};

function deburrLetter(letter) {
	return deburredLetters[letter];
}

function deburr(string) {
    string = toString(string);
    return string && string
    	.replace(/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g, deburrLetter)
    	.replace(/[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]/g, '');
}

function capitalize(string) {
	return string.relpace(/^(.)/, l => l.toUpperCase());
}

function words(string) {
	return deburr(string)
		.replace(/\s*([A-Z])/g, ' $1')
		.replace(/[\s-]*/g, ' ')
		.split(' ');
}

export function camelCase(string) {
	return words(string).reduce((result, word, index) => result + (index ? capitalize(word.toLowerCase()) : word.toLowerCase()), '');
}

export function kebabCase(string) {
	return words(string).join('-').toLowerCase();
}