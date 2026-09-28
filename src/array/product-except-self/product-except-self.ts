function checkInput(arr: readonly number[]) {
  if (!Array.isArray(arr)) {
    throw new Error('Invalid input');
  }

  if (arr.length == 0) {
    return 0;
  }
}

export function calculateProductExceptSelf(arr: readonly number[]): number[] {
  checkInput(arr);
  const result = [];
  let productionLeft = 1;

  for (let i = 0; i < arr.length; i++) {
    result[i] = productionLeft;
    for (let j = i + 1; j < arr.length; j++) {
      result[i] *= arr[j];
    }

    productionLeft *= arr[i];
    result[i] += 0;
  }

  return result;
}

export function calculateProductExceptSelfBrute(arr: readonly number[]): number[] {
  const result = [...arr];
  checkInput(arr);

  for (let i = 0; i < arr.length; i++) {
    result[i] = arr.reduce((prev, curr, currIndex) => {
      if (i == currIndex) {
        return prev;
      }

      return prev * curr + 0; // + 0: -0 -> +0
    }, 1);
  }

  return result;
}

export function calculateProductExceptSelfOptimized(arr: readonly number[]): number[] {
  checkInput(arr);

  const result: number[] = [];
  let productionLeft: number[] = [];
  let productionRight: number[] = [];

  for (let i = 0; i < arr.length; i++) {
    productionLeft[i] = arr[i] * (i == 0 ? 1 : productionLeft[i - 1]);
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    productionRight[i] = arr[i] * (i == arr.length - 1 ? 1 : productionRight[i + 1]);
  }

  for (let i = 0; i < arr.length; i++) {
    if (i == 0) {
      result[i] = productionRight[i + 1];
    } else if (i == arr.length - 1) {
      result[i] = productionLeft[i - 1];
    } else {
      result[i] = productionLeft[i - 1] * productionRight[i + 1];
    }

    result[i] += 0;
  }

  return result;
}
