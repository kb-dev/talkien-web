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
	)}}`;
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
