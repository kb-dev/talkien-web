const COLOR_BASE = 16;
const R_MASK = 0xff0000;
const R_OFFSET = 16;
const G_MASK = 0x00ff00;
const G_OFFSET = 8;
const B_MASK = 0x0000ff;

type ColorObject = {
	r: number;
	g: number;
	b: number;
};

function stringColorToColorObject(color: string): ColorObject {
	const colorValue = parseInt(color.substring(1), COLOR_BASE);

	return {
		b: colorValue & B_MASK,
		g: (colorValue & G_MASK) >> G_OFFSET,
		r: (colorValue & R_MASK) >> R_OFFSET,
	};
}

function colorObjectToStringColor(color: ColorObject): string {
	return `#${color.r.toString(COLOR_BASE)}${color.g.toString(COLOR_BASE)}${color.g.toString(
		COLOR_BASE,
	)}`;
}

export const computeIntermediateColor = (color1: string, color2: string) => {
	const hexColor1 = stringColorToColorObject(color1);
	const hexColor2 = stringColorToColorObject(color2);

	/* eslint-disable no-magic-numbers */
	hexColor1.r = Math.round((hexColor1.r + hexColor2.r) / 2);
	hexColor1.g = Math.round((hexColor1.g + hexColor2.g) / 2);
	hexColor1.b = Math.round((hexColor1.b + hexColor2.b) / 2);
	/* eslint-enable no-magic-numbers */

	return colorObjectToStringColor(hexColor1);
};

type Color = Array<number>;
const rainbowColors: Array<Color> = [
	[0xf4, 0x43, 0x36],
	[0xff, 0x98, 0x00],
	[0xff, 0xeb, 0x3b],
	[0x4c, 0xaf, 0x50],
	[0x21, 0x96, 0xf3],
	[0x3f, 0x51, 0xb5],
	[0x9b, 0x27, 0xb0],
];

function colorValueToString(value: Color) {
	let result = '#';

	const r = value[0].toString(16);
	const g = value[1].toString(16);
	const b = value[2].toString(16);
	
	if (r.length === 1) {
		result += '0';
	}

	result += r;

	if (g.length === 1) {
		result += '0';
	}

	result += g;

	if (b.length === 1) {
		result += '0';
	}

	result += b;

	return result;
}

function getColorPositionOf(currentIndex: number, nbTotalColors: number, colors: Array<Color>) {
	const colorsBySlice = Math.round(nbTotalColors / colors.length);
	const baseColorIndex = Math.trunc(currentIndex / colorsBySlice);
	let nextColorIndex = baseColorIndex + 1;

	if (nextColorIndex === rainbowColors.length) {
		nextColorIndex = 0;
	}

	const colorRatio = (currentIndex - baseColorIndex * colorsBySlice) / colorsBySlice;
	const baseColor = colors[baseColorIndex];
	const nextColor = colors[nextColorIndex];

	const resultColor = [
		Math.round(baseColor[0] * (1 - colorRatio) + nextColor[0] * colorRatio),
		Math.round(baseColor[1] * (1 - colorRatio) + nextColor[1] * colorRatio),
		Math.round(baseColor[2] * (1 - colorRatio) + nextColor[2] * colorRatio),
	];

	return colorValueToString(resultColor);
}

export function randomColor(str: string) {
	const seed =
		str.split('').reduce((acc, e) => acc + e.charCodeAt(0), 0) % (rainbowColors.length * 20);

	return getColorPositionOf(seed, rainbowColors.length * 20, rainbowColors);
}