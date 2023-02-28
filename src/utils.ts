/**
 * Waits a specificied number of milliseconds before executing an action.
 * @param milliseconds number of milliseconds to wait for
 */
export const wait = async (milliseconds: number) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};

/**
 *
 * @returns reloads the page
 */
export const resetGame = () => window.location.reload();

/**
 *
 * @param max upper range inclusive e.g. 6 generates numbers from 1 - 6
 * @returns
 */
const generateRandomNumber = (max: number) =>
  Math.floor(Math.random() * max) + 1;

/**
 * Generates a random 3 x 4 memory board game board with pairs of numbers 1 to 6 inclusive.
 */

export const generateBoard = () => {
  // Array where values represent how many numbers exist at their index - 1
  // e.g. the number of 1's currently on the board are represented at numberAdded[X - 1]
  let numbersAdded: number[] = [0, 0, 0, 0, 0, 0];
  let board: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      while (true) {
        const value = generateRandomNumber(6);
        if (numbersAdded[value - 1] < 2) {
          board[i][j] = value;
          numbersAdded[value - 1] += 1;
          break;
        }
      }
    }
  }
  return board;
};
