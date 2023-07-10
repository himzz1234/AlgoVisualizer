export function BubbleSort(array) {
  const swaps = [];

  let i, j;
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      swaps.push({ indices: [j, j + 1], type: "comp" });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps.push({ indices: [j, j + 1], type: "swap" });
      }
    }
  }

  return swaps;
}

// Divide and Conquer Algorithm
export function QuickSort(arr) {
  const swaps = [],
    stack = [];

  stack.push(0);
  stack.push(arr.length - 1);

  while (stack[stack.length - 1] >= 0) {
    let end = stack.pop();
    let start = stack.pop();

    let pivotIndex = partition(arr, start, end, swaps);

    if (pivotIndex - 1 > start) {
      stack.push(start);
      stack.push(pivotIndex - 1);
    }

    if (pivotIndex + 1 < end) {
      stack.push(pivotIndex + 1);
      stack.push(end);
    }
  }

  return swaps;
}

export function InsertionSort(arr) {
  const swaps = [];

  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      swaps.push({ indices: [j - 1, j], type: "comp" });
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      swaps.push({ indices: [j - 1, j], type: "swap" });
      j--;
    }
  }
  return swaps;
}

export function SelectionSort(arr) {
  const swaps = [];
  let i, j, minIndx;

  for (i = 0; i < arr.length - 1; i++) {
    minIndx = i;
    for (j = i + 1; j < arr.length; j++) {
      swaps.push({ indices: [minIndx, j], type: "comp" });

      if (arr[j] < arr[minIndx]) {
        minIndx = j;
      }
    }

    [arr[minIndx], arr[i]] = [arr[i], arr[minIndx]];
    swaps.push({ indices: [minIndx, i], type: "swap" });
  }

  return swaps;
}

// Helper functions
function partition(array, left, right, swaps) {
  const pivotValue = array[right];
  let pivotIndex = left;

  for (let i = left; i < right; i++) {
    swaps.push({ indices: [i, right], type: "comp" });

    if (array[i] < pivotValue) {
      [array[pivotIndex], array[i]] = [array[i], array[pivotIndex]];

      if (pivotIndex != i)
        swaps.push({ indices: [pivotIndex, i], type: "swap" });

      pivotIndex++;
    }
  }

  [array[pivotIndex], array[right]] = [array[right], array[pivotIndex]];
  if (pivotIndex != right)
    swaps.push({ indices: [pivotIndex, right], type: "swap" });

  return pivotIndex;
}
