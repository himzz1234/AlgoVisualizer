export const options = [
  {
    value: "BubbleSort",
    label: "Bubble Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Bubble sort is a simple sorting algorithm that repeatedly compares and swaps adjacent elements until the list is sorted.",
    code: '\n let i, j, minIndx;\n  for (i = 0; i < arr.length - 1; i++) {\n    minIndx = i;\n    for (j = i + 1; j < arr.length; j++) {\n      swaps.push({ indices: [minIndx, j], type: "comp" });\n\n      if (arr[j] < arr[minIndx]) {\n        minIndx = j;\n      }\n    }\n\n    [arr[minIndx], arr[i]] = [arr[i], arr[minIndx]];\n    swaps.push({ indices: [minIndx, i], type: "swap" });\n  }',
    method: "Exchanging",
    stable: "Yes",
  },
  {
    value: "QuickSort",
    label: "Quick Sort",
    complexity: { time: "O(N*logN)", space: "O(1)" },
    desc: "Quick sort is a fast and efficient sorting algorithm that divides the list into two sublists, recursively sorts them, and combines them based on a chosen pivot element.",
    code: '\n let i, j, minIndx;\n  for (i = 0; i < arr.length - 1; i++) {\n    minIndx = i;\n    for (j = i + 1; j < arr.length; j++) {\n      swaps.push({ indices: [minIndx, j], type: "comp" });\n\n      if (arr[j] < arr[minIndx]) {\n        minIndx = j;\n      }\n    }\n\n    [arr[minIndx], arr[i]] = [arr[i], arr[minIndx]];\n    swaps.push({ indices: [minIndx, i], type: "swap" });\n  }',
    method: "Exchanging",
    stable: "Yes",
  },
  {
    value: "InsertionSort",
    label: "Insertion Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Insertion sort is a simple sorting algorithm that iteratively places each element in its correct position by comparing and shifting elements as needed.",
    code: '\n let i, j, minIndx;\n  for (i = 0; i < arr.length - 1; i++) {\n    minIndx = i;\n    for (j = i + 1; j < arr.length; j++) {\n      swaps.push({ indices: [minIndx, j], type: "comp" });\n\n      if (arr[j] < arr[minIndx]) {\n        minIndx = j;\n      }\n    }\n\n    [arr[minIndx], arr[i]] = [arr[i], arr[minIndx]];\n    swaps.push({ indices: [minIndx, i], type: "swap" });\n  }',

    method: "Exchanging",
    stable: "Yes",
  },
  {
    value: "SelectionSort",
    label: "Selection Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Selection sort is a simple sorting algorithm that repeatedly selects the smallest element from the unsorted portion of the list and swaps it with the current position.",
    code: 'let i, j, minIndx;\n\tfor (i = 0; i < arr.length - 1; i++) {\n    minIndx = i;\n    for (j = i + 1; j < arr.length; j++) {\n      swaps.push({ indices: [minIndx, j], type: "comp" });\n\n      if (arr[j] < arr[minIndx]) {\n        minIndx = j;\n      }\n    }\n\n    [arr[minIndx], arr[i]] = [arr[i], arr[minIndx]];\n    swaps.push({ indices: [minIndx, i], type: "swap" });\n  }',

    method: "Exchanging",
    stable: "Yes",
  },
  {
    value: "HeapSort",
    label: "Heap Sort",
    complexity: { time: "O(N*logN)", space: "O(1)" },
    desc: "Heap sort is a sorting algorithm that first constructs a max heap from the list, then repeatedly removes the maximum element and adjusts the heap until the list is sorted.",
    code: '\n let i, j, minIndx;\n  for (i = 0; i < arr.length - 1; i++) {\n    minIndx = i;\n    for (j = i + 1; j < arr.length; j++) {\n      swaps.push({ indices: [minIndx, j], type: "comp" });\n\n      if (arr[j] < arr[minIndx]) {\n        minIndx = j;\n      }\n    }\n\n    [arr[minIndx], arr[i]] = [arr[i], arr[minIndx]];\n    swaps.push({ indices: [minIndx, i], type: "swap" });\n  }',

    method: "Exchanging",
    stable: "No",
  },
  {
    value: "ShellSort",
    label: "Shell Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Shell sort is a sorting algorithm that starts by sorting elements far apart from each other and gradually reduces the gap between elements until the list is sorted.",
    code: '\n let i, j, minIndx;\n  for (i = 0; i < arr.length - 1; i++) {\n    minIndx = i;\n    for (j = i + 1; j < arr.length; j++) {\n      swaps.push({ indices: [minIndx, j], type: "comp" });\n\n      if (arr[j] < arr[minIndx]) {\n        minIndx = j;\n      }\n    }\n\n    [arr[minIndx], arr[i]] = [arr[i], arr[minIndx]];\n    swaps.push({ indices: [minIndx, i], type: "swap" });\n  }',
    method: "Exchanging",
    stable: "No",
  },
];
