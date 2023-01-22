export const wait = async (milliseconds: number) => {
  await new Promise((resolve) => {
    return setTimeout(resolve, milliseconds);
  });
};

export const resetGame = () => window.location.reload();
