export const generateRandomHexColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randomColor}`;
  };
  
  export const generateArrayWithNumbers = (numberOfItems: number) => {
    return Array.from(Array(numberOfItems), (undefined, i) => i);
  };
  