export const sortOptions = [
  {
    value: "BubbleSort",
    label: "Bubble Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Bubble sort is a simple sorting algorithm that repeatedly compares and swaps adjacent elements until the list is sorted.",
    code: "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfor (let i = 0; i < array.length; i++) {\n\tfor (let j = 0; j < array.length - i - 1; j++) {\n\t\tif (array[j] > array[j + 1]) {\n\t\t\t swap(array, j, j + 1); \n\t\t} \n\t} \n}",
    method: "Exchanging",
    stable: "Yes",
    data: [0, 0.022, 0.0768, 1.448, 5.192, 128.54, 513.34],
  },
  {
    value: "QuickSort",
    label: "Quick Sort",
    complexity: { time: "O(N*logN)", space: "O(1)" },
    desc: "Quick sort is a fast and efficient sorting algorithm that divides the list into two sublists, recursively sorts them, and combines them based on a chosen pivot element.",
    code: "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfunction partition(array, left, right) {\n\tconst pivotValue = array[right];\n\tlet pivot = left;\n\tfor (let i = left; i < right; i++) {\n\t\tif (array[i] < pivotValue) {\n\t\t\tswap(array, pivot, i);\n\t\t\tpivot++; \n\t\t} \n\t}\n\n\tswap(array, right, pivot);\n\treturn pivot; \n}\n\nconst stack = [];\nstack.push(0);\nstack.push(array.length - 1);\nwhile (stack[stack.length - 1] >= 0) {\n\tlet end = stack.pop(),\n\tlet start = stack.pop();\n\tlet pivot = partition(array, start, end);\n\n\tif (pivot - 1 > start) {\n\t\tstack.push(start);\n\t\tstack.push(pivot - 1);\n\t}\n\tif (pivot + 1 < end) {\n\t\tstack.push(pivot + 1);\n\t\tstack.push(end);\n\t}\n}",
    method: "Exchanging",
    stable: "No",
    data: [0, 0.002, 0.005, 0.01, 0.0202, 0.0875, 0.175],
  },
  {
    value: "InsertionSort",
    label: "Insertion Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Insertion sort is a simple sorting algorithm that iteratively places each element in its correct position by comparing and shifting elements as needed.",
    code: "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfor (let i = 1; i < array.length; i++) {\n\tlet j = i;\n\twhile (j > 0 && array[j - 1] > array[j]) {\n\t\tswap(array, j, j - 1);\n\t\tj--;\n\t} \n}",
    method: "Insertion",
    stable: "Yes",
    data: [0, 0.0115, 0.0315, 0.608, 2.386, 55.53, 218.95],
  },
  {
    value: "SelectionSort",
    label: "Selection Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Selection sort is a simple sorting algorithm that repeatedly selects the smallest element from the unsorted portion of the list and swaps it with the current position.",
    code: "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nlet min;\nfor (let i = 0; i < array.length - 1; i++) {\n\tmin = i;\n\tfor (let j = i + 1; j < array.length; j++) {\n\t\tif (array[j] < array[min]) {\n\t\t\tmin = j;\n\t\t}\n\t}\n\n\tswap(array, min, i);\n}",
    method: "Selection",
    stable: "No",
    data: [0, 0.0082, 0.0375, 0.5813, 2.4167, 57.29, 192.44],
  },
  {
    value: "HeapSort",
    label: "Heap Sort",
    complexity: { time: "O(N*logN)", space: "O(1)" },
    desc: "Heap sort is a sorting algorithm that first constructs a max heap from the list, then repeatedly removes the maximum element and adjusts the heap until the list is sorted.",
    code: "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfunction heapify(array, n, i) {\n\tlet largest = i;\n\tconst left = 2 * i + 1;\n\tconst right = 2 * i + 2;\n\tif (left < n && array[left] > array[largest]) {\n\t\tlargest = left;\n\t}\n\tif (right < n && array[right] > array[largest]) {\n\t\tlargest = right;\n\t}\n\tif (largest !== i) {\n\t\tswap(array, largest, i);\n\t\theapify(array, n, largest);\n\t}\n}\n\nconst n = array.length;\nfor (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n\theapify(array, n, i);\n}\n\nlet root = 0;\nfor (let i = n - 1; i >= root; i--) {\n\t[array[root], array[i]] = [array[i], array[root]];\n\theapify(array, i, root);\n}",
    method: "Selection",
    stable: "No",
    data: [0, 0.001, 0.0025, 0.0195, 0.0474, 0.2589, 0.6772],
  },
  {
    value: "ShellSort",
    label: "Shell Sort",
    complexity: { time: "O(N^2)", space: "O(1)" },
    desc: "Shell sort is a sorting algorithm that starts by sorting elements far apart from each other and gradually reduces the gap between elements until the list is sorted.",
    code: "let gap = Math.floor(array.length / 2);\nwhile (gap > 0) {\n\tfor (let i = gap; i < array.length; i++) {\n\t\tlet temp = array[i];\n\t\tlet j = i;\n\t\twhile (j >= gap && array[j - gap] > temp) {\n\t\t\tarray[j] = array[j - gap];\n\t\t\tj -= gap;\n\t\t}\n\t\tarray[j] = temp;\n\t}\n\tgap = Math.floor(gap / 2);\n}",
    method: "Insertion",
    stable: "No",
    data: [0, 0.001, 0.0015, 0.011, 0.0263, 0.2104, 0.4524],
  },
];

export const speedOptions = [
  {
    value: 0.25,
    label: "0.25x",
  },
  {
    value: 0.5,
    label: "0.5x",
  },
  {
    value: 0.75,
    label: "0.75x",
  },
  {
    value: 1,
    label: "Normal",
  },
  {
    value: 2,
    label: "2x",
  },
  {
    value: 3,
    label: "3x",
  },
  {
    value: 4,
    label: "4x",
  },
];
