/**
 * Shuffles the array using the Fisher-Yates algorithm.
 * @param array - Source array.
 * @returns a new array with shuffled elements.
 */
export const shuffleArray = (array: string[]): string[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };