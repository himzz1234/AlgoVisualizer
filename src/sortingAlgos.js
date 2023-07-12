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

export function HeapSort(arr) {
  const swaps = [];

  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, swaps);
  }

  // Extract elements from the heap one by one
  for (let i = n - 1; i >= 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    swaps.push({ indices: [0, i], type: "swap" });
    heapify(arr, i, 0, swaps);
  }

  return swaps;
}

export function ShellSort(array) {
  const swaps = [];

  // Generate the gaps sequence
  let gap = Math.floor(array.length / 2);
  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] > temp) {
        swaps.push({ indices: [j, j - gap], type: "comp" });
        array[j] = array[j - gap];
        swaps.push({ indices: [j, j - gap], type: "swap" });
        j -= gap;
      }

      array[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  return swaps;
}

// Helper function for quick sort
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

// Helper function for heap sort
function heapify(array, n, i, swaps) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    swaps.push({ indices: [left, largest], type: "comp" });
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    swaps.push({ indices: [right, largest], type: "comp" });
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    swaps.push({ indices: [i, largest], type: "swap" });
    heapify(array, n, largest, swaps);
  }
}
