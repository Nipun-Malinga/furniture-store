const rgbaStringToHex = (rgbaStr) => {
  console.log(rgbaStr);
  const rgba = rgbaStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d\.]+)?\)/);

  if (!rgba) return null;

  const r = parseInt(rgba[1]);
  const g = parseInt(rgba[2]);
  const b = parseInt(rgba[3]);
  const a = rgba[4] !== undefined ? Math.round(parseFloat(rgba[4]) * 255) : 255;

  const toHex = (n) => n.toString(16).padStart(2, '0').toUpperCase();

  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  console.log(`Hex Color: ${hexColor}`);
  return hexColor;
};

export default rgbaStringToHex;
