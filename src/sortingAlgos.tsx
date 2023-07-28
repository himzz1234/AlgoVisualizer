// Bubble Sort
export function BubbleSort(array: Array<Number>) {
  const swaps = [];

  let i, j;
  for (i = 0; i < array.length; i++) {
    for (j = 0; j < array.length - i - 1; j++) {
      swaps.push({ indices: { j: j, "j + 1": j + 1 }, type: "comp" });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swaps.push({ indices: { "j + 1": j, j: j + 1 }, type: "swap" });
      }
    }
  }

  return swaps;
}

// Divide and Conquer Algorithm (Quick Sort)
export function QuickSort(arr: Array<Number>) {
  const swaps: { indices: object; type: string }[] = [],
    stack: Array<any> = [];

  stack.push(0);
  stack.push(arr.length - 1);

  while (stack[stack.length - 1] >= 0) {
    let end = stack.pop();
    let start = stack.pop();

    let pivot = partition(arr, start, end, swaps);

    if (pivot - 1 > start!) {
      stack.push(start);
      stack.push(pivot - 1);
    }

    if (pivot + 1 < end!) {
      stack.push(pivot + 1);
      stack.push(end);
    }
  }

  return swaps;
}

// Insertion Sort
export function InsertionSort(arr: Array<Number>) {
  const swaps = [];

  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      swaps.push({ indices: { "j - 1": j - 1, j: j }, type: "comp" });
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      swaps.push({ indices: { j: j - 1, "j - 1": j }, type: "swap" });
      j--;
    }
  }
  return swaps;
}

// Selection Sort
export function SelectionSort(arr: Array<Number>) {
  const swaps = [];
  let i, j, min;

  for (i = 0; i < arr.length - 1; i++) {
    min = i;
    for (j = i + 1; j < arr.length; j++) {
      swaps.push({ indices: { min: min, j: j }, type: "comp" });

      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    [arr[min], arr[i]] = [arr[i], arr[min]];
    swaps.push({ indices: { i: min, min: i }, type: "swap" });
  }

  return swaps;
}

// Heap Sort
export function HeapSort(arr: Array<Number>) {
  const swaps: { indices: object; type: string }[] = [];

  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, swaps);
  }

  // Extract elements from the heap one by one
  let root = 0;
  for (let i = n - 1; i >= root; i--) {
    [arr[root], arr[i]] = [arr[i], arr[root]];
    swaps.push({ indices: { i: root, root: i }, type: "swap" });
    heapify(arr, i, root, swaps);
  }

  return swaps;
}

// Shell Sort
export function ShellSort(array: Array<Number>) {
  const swaps: { indices: object; type: string }[] = [];

  // Generate the gaps sequence
  let gap = Math.floor(array.length / 2);
  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] > temp) {
        swaps.push({ indices: { j: j, "j - gap": j - gap }, type: "comp" });
        array[j] = array[j - gap];
        swaps.push({ indices: { "j - gap": j, j: j - gap }, type: "swap" });
        j -= gap;
      }

      array[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  return swaps;
}

// Helper function for quick sort
function partition(
  array: Array<Number>,
  left: number,
  right: number,
  swaps: { indices: object; type: string }[]
) {
  const pivotValue = array[right];
  let pivot = left;

  for (let i = left; i < right; i++) {
    swaps.push({ indices: { i: i, right: right }, type: "comp" });

    if (array[i] < pivotValue) {
      [array[pivot], array[i]] = [array[i], array[pivot]];

      if (pivot != i)
        swaps.push({ indices: { i: pivot, pivot: i }, type: "swap" });

      pivot++;
    }
  }

  [array[pivot], array[right]] = [array[right], array[pivot]];
  if (pivot != right)
    swaps.push({
      indices: { right: pivot, pivot: right },
      type: "swap",
    });

  return pivot;
}

// Helper function for heap sort
function heapify(
  array: Array<Number>,
  n: number,
  i: number,
  swaps: { indices: object; type: string }[]
) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    swaps.push({ indices: { left: left, larget: largest }, type: "comp" });
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    swaps.push({
      indices: { right: right, larget: largest },
      type: "comp",
    });
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    swaps.push({ indices: { largest: i, i: largest }, type: "swap" });
    heapify(array, n, largest, swaps);
  }
}
