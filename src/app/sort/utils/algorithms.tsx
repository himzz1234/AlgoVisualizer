import { Steps } from "@/app/types/types";

// Bubble Sort
export function BubbleSort(array: Array<Number>) {
  const steps: Steps[] = [];

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      steps.push({
        position: { j: j, "j + 1": j + 1 },
        type: "comp",
        detail: `Comparing ${array[j]} and ${array[j + 1]} (Checking if ${
          array[j]
        } is greater than ${array[j + 1]})`,
      });

      if (array[j] > array[j + 1]) {
        steps.push({
          position: { "j + 1": j, j: j + 1 },
          type: "swap",
          detail: `Swapping ${array[j]} and ${array[j + 1]} (Placing ${
            array[j]
          } in its correct position)`,
        });

        [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
  }

  steps.push({
    type: "sorting-finish",
    detail: "The sorting is complete!",
  });

  return steps;
}

// Divide and Conquer Algorithm (Quick Sort)
export function QuickSort(arr: Array<Number>) {
  const steps: Steps[] = [],
    stack: Array<number> = [];

  stack.push(0);
  stack.push(arr.length - 1);

  while (stack[stack.length - 1] >= 0) {
    let end: number | undefined = stack.pop();
    let start: number | undefined = stack.pop();

    if (typeof end == "number" && typeof start == "number") {
      let pivot = partition(arr, start, end, steps);

      if (pivot - 1 > start!) {
        stack.push(start);
        stack.push(pivot - 1);
      }

      if (pivot + 1 < end!) {
        stack.push(pivot + 1);
        stack.push(end);
      }
    }
  }

  steps.push({
    type: "sorting-finish",
    detail: "The sorting is complete!",
  });

  return steps;
}

// Insertion Sort
export function InsertionSort(arr: Array<Number>) {
  const steps: Steps[] = [];

  for (let i = 1; i < arr.length; i++) {
    let j = i;
    while (j > 0 && arr[j - 1] > arr[j]) {
      steps.push({
        position: { "j - 1": j - 1, j: j },
        type: "comp",
        detail: `Comparing ${arr[j - 1]} and ${arr[j]} (Checking if ${
          arr[j - 1]
        } is greater than ${arr[j]})`,
      });

      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      steps.push({
        position: { j: j - 1, "j - 1": j },
        type: "swap",
        detail: `Swapping ${arr[j - 1]} and ${arr[j]} (Moving ${
          arr[j]
        } to its correct position)`,
      });

      j--;
    }
  }

  steps.push({
    type: "sorting-finish",
    detail: "The sorting is complete!",
  });
  return steps;
}

// Selection Sort
export function SelectionSort(arr: Array<Number>) {
  const steps: Steps[] = [];
  let i, j, min;

  for (i = 0; i < arr.length - 1; i++) {
    min = i;
    for (j = i + 1; j < arr.length; j++) {
      steps.push({
        position: { min: min, j: j },
        type: "comp",
        detail: `Comparing ${arr[min]} with ${arr[j]} (Finding the minimum value in the remaining unsorted portion)`,
      });

      if (arr[j] < arr[min]) {
        min = j;
      }
    }

    steps.push({
      position: { i: min, min: i },
      type: "swap",
      detail: `Swapping ${arr[i]} with ${arr[min]} (Placing the minimum value in its correct position)`,
    });

    [arr[min], arr[i]] = [arr[i], arr[min]];
  }

  steps.push({
    type: "sorting-finish",
    detail: "The sorting is complete!",
  });
  return steps;
}

// Heap Sort
export function HeapSort(arr: Array<Number>) {
  const steps: Steps[] = [];

  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps);
  }

  // Extract elements from the heap one by one
  let root = 0;
  for (let i = n - 1; i >= root; i--) {
    [arr[root], arr[i]] = [arr[i], arr[root]];
    steps.push({
      position: { i: root, root: i },
      type: "swap",
      detail: `Swapping ${arr[i]} and ${arr[root]} (Moving the maximum value to its correct position)`,
    });
    heapify(arr, i, root, steps);
  }

  steps.push({
    type: "sorting-finish",
    detail: "The sorting is complete!",
  });
  return steps;
}

// Shell Sort
export function ShellSort(array: Array<Number>) {
  const steps: Steps[] = [];

  // Generate the gaps sequence
  let gap = Math.floor(array.length / 2);
  while (gap > 0) {
    for (let i = gap; i < array.length; i++) {
      let temp = array[i];
      let j = i;

      while (j >= gap && array[j - gap] > temp) {
        steps.push({
          position: { j: j, "j - gap": j - gap },
          type: "comp",
          detail: `Comparing ${array[j - gap]} and ${array[j]} (Checking if ${
            array[j - gap]
          } is greater than ${array[j]})`,
        });

        array[j] = array[j - gap];

        steps.push({
          position: { "j - gap": j, j: j - gap },
          type: "swap",
          detail: `Comparing ${array[j - gap]} and ${array[j]} (Checking if ${
            array[j - gap]
          } is greater than ${array[j]})`,
        });
        j -= gap;
      }

      array[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }

  steps.push({
    type: "sorting-finish",
    detail: "The sorting is complete!",
  });
  return steps;
}

// Helper function for quick sort
function partition(
  array: Array<Number>,
  left: number,
  right: number,
  steps: Steps[] = []
) {
  const pivotValue = array[right];
  let pivot = left;

  for (let i = left; i < right; i++) {
    steps.push({
      position: { i: i, right: right },
      type: "comp",
      detail: `Comparing ${array[i]} with ${array[right]} (Pivot: ${pivotValue}) at position ${i} and ${right}.`,
    });

    if (array[i] < pivotValue) {
      if (pivot != i)
        steps.push({
          position: { i: pivot, pivot: i },
          type: "swap",
          detail: `Swapping ${array[i]} and ${array[pivot]} at positions ${i} and ${pivot} because ${array[i]} < ${pivotValue}.`,
        });

      [array[pivot], array[i]] = [array[i], array[pivot]];

      pivot++;
    }
  }

  steps.push({
    position: { right: pivot, pivot: right },
    type: "swap",
    detail: `Swapping ${array[pivot]} and ${array[right]} at positions ${pivot} and ${right} so that pivot ${pivotValue} is correctly placed.`,
  });
  [array[pivot], array[right]] = [array[right], array[pivot]];

  return pivot;
}

// Helper function for heap sort
function heapify(array: Array<Number>, n: number, i: number, steps: Steps[]) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && array[left] > array[largest]) {
    steps.push({
      position: { left: left, largest: largest },
      type: "comp",
      detail: `Comparing ${array[left]} and ${array[largest]} (Left child is larger)`,
    });
    largest = left;
  }

  if (right < n && array[right] > array[largest]) {
    steps.push({
      position: { right: right, largest: largest },
      type: "comp",
      detail: `Comparing ${array[right]} and ${array[largest]} (Right child is larger)`,
    });
    largest = right;
  }

  if (largest !== i) {
    [array[i], array[largest]] = [array[largest], array[i]];
    steps.push({
      position: { largest: i, i: largest },
      type: "swap",
      detail: `Swapping ${array[i]} and ${array[largest]} (Adjusting the heap structure)`,
    });
    heapify(array, n, largest, steps);
  }
}
