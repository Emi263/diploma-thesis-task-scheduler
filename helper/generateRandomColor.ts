export const generateRandomColor = () => {
  const H = getRandomInt(1, 358);
  const S = 100;
  const bgL = 90;
  const cL = 40;

  return {
    background: `hsl(${H}, ${S}%,${bgL}% )`,
    color: `hsl(${H}, ${S}%,${cL}% )`,
  };
};

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
