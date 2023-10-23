import { AlgorithmOption } from "@/types/types";
export const algoOptions: AlgorithmOption[] = [
  {
    category: "Sort",
    icon: "TiSortNumericallyOutline",
    algorithms: {
      BubbleSort: "Bubble Sort",
      QuickSort: "Quick Sort",
      SelectionSort: "Selection Sort",
      InsertionSort: "Insertion Sort",
      HeapSort: "Heap Sort",
      ShellSort: "Shell Sort",
    },
  },
  {
    category: "Search",
    icon: "BiSolidSearch",
    algorithms: {
      LinearSearch: "Linear Search",
      BinarySearch: "Binary Search",
    },
  },
];

export const sortOptions = [
  {
    value: "BubbleSort",
    label: "Bubble Sort",
    complexity: {
      time: { best: "O(N)", average: "O(N^2)", worst: "O(N^2)" },
      space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    },
    desc: "Bubble sort is a simple sorting algorithm that repeatedly compares and swaps adjacent elements until the list is sorted",
    ccode:
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tstd::swap(array[a], array[b]);\n}\n\nvoid BubbleSort(std::vector<int>& array) {\n\tint n = array.size();\n\tfor (int i = 0; i < n; i++) {\n\t\tfor (int j = 0; j < n - i - 1; j++) {\n\t\t\tif (array[j] > array[j + 1]) {\n\t\t\t\tswap(array, j, j + 1);\n\t\t\t}\n\t\t}\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\ndef BubbleSort(array):\n\tfor i in range(len(array)):\n\t\tfor j in range(len(array) - i - 1):\n\t\t\tif array[j] > array[j + 1]:\n\t\t\t\tswap(array, j, j + 1)",
    jscode:
      "function swap(array, a, b) {\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfunction BubbleSort(array) {\n\tfor (let i = 0; i < array.length; i++) {\n\t\tfor (let j = 0; j < array.length - i - 1; j++) {\n\t\t\tif (array[j] > array[j + 1]) {\n\t\t\t\t swap(array, j, j + 1); \n\t\t\t} \n\t\t} \n\t} \n}",
    method: "Comparison-based, iterative",
    stable: "Yes",
    data: [0, 0.022, 0.0768, 1.448, 5.192, 128.54, 513.34],
    test_cases: {
      best: {
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      worst: {
        elements: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    },
  },
  {
    value: "QuickSort",
    label: "Quick Sort",
    complexity: {
      time: { best: "O(NlogN)", average: "O(NlogN)", worst: "O(N^2)" },
      space: { best: "O(NlogN)", average: "O(NlogN), O(N)", worst: "O(N)" },
    },
    desc: "Quick sort is a fast and efficient sorting algorithm that divides the list into two sublists, recursively sorts them, and combines them based on a chosen pivot element.",
    ccode:
      "#include <iostream>\n#include <vector>\n#include <stack>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tstd::swap(array[a], array[b]);\n}\n\nint partition(std::vector<int>& array, int left, int right) {\n\tint pivotValue = array[right];\n\tint pivot = left;\n\tfor (int i = left; i < right; i++) {\n\t\tif (array[i] < pivotValue) {\n\t\t\tswap(array, pivot, i);\n\t\t\tpivot++;\n\t\t}\n\t}\n\tswap(array, right, pivot);\n\treturn pivot;\n}\n\nvoid QuickSort(std::vector<int>& array) {\n\tstd::stack<int> stack;\n\tint n = array.size();\n\tstack.push(0);\n\tstack.push(n - 1);\n\twhile (!stack.empty()) {\n\t\tint end = stack.top();\n\t\tstack.pop();\n\t\tint start = stack.top();\n\t\tstack.pop();\n\t\tint pivot = partition(array, start, end);\n\t\tif (pivot - 1 > start) {\n\t\t\tstack.push(start);\n\t\t\tstack.push(pivot - 1);\n\t\t}\n\t\tif (pivot + 1 < end) {\n\t\t\tstack.push(pivot + 1);\n\t\t\tstack.push(end);\n\t\t}\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\ndef partition(array, left, right):\n\tpivotValue = array[right]\n\tpivot = left\n\tfor i in range(left, right):\n\t\tif array[i] < pivotValue:\n\t\t\tswap(array, pivot, i)\n\t\t\tpivot += 1\n\tswap(array, right, pivot)\n\treturn pivot\n\ndef QuickSort(array):\n\tstack = []\n\tstack.append(0)\n\tstack.append(len(array) - 1)\n\twhile stack:\n\t\tend = stack.pop()\n\t\tstart = stack.pop()\n\t\tpivot = partition(array, start, end)\n\t\tif pivot - 1 > start:\n\t\t\tstack.append(start)\n\t\t\tstack.append(pivot - 1)\n\t\tif pivot + 1 < end:\n\t\t\tstack.append(pivot + 1)\n\t\t\tstack.append(end)",
    jscode:
      "function swap(array, a, b) {\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfunction partition(array, left, right) {\n\tconst pivotValue = array[right];\n\tlet pivot = left;\n\tfor (let i = left; i < right; i++) {\n\t\tif (array[i] < pivotValue) {\n\t\t\tswap(array, pivot, i);\n\t\t\tpivot++;\n\t\t}\n\t}\n\n\tswap(array, right, pivot);\n\treturn pivot;\n}\n\nfunction QuickSort(array) {\n\tconst stack = [];\n\tstack.push(0);\n\tstack.push(array.length - 1);\n\twhile (stack.length >= 2) {\n\t\tlet end = stack.pop();\n\t\tlet start = stack.pop();\n\t\tlet pivot = partition(array, start, end);\n\n\t\tif (pivot - 1 > start) {\n\t\t\tstack.push(start);\n\t\t\tstack.push(pivot - 1);\n\t\t}\n\t\tif (pivot + 1 < end) {\n\t\t\tstack.push(pivot + 1);\n\t\t\tstack.push(end);\n\t\t}\n\t}\n}",
    method: "Comparison-based, divide and conquer",
    stable: "No",
    data: [0, 0.002, 0.005, 0.01, 0.0202, 0.0875, 0.175],
    test_cases: {
      best: {
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      worst: {
        elements: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    },
  },
  {
    value: "InsertionSort",
    label: "Insertion Sort",
    complexity: {
      time: { best: "O(N)", average: "O(N^2)", worst: "O(N^2)" },
      space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    },
    desc: "Insertion sort is a simple sorting algorithm that iteratively places each element in its correct position by comparing and shifting elements as needed.",
    ccode:
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tstd::swap(array[a], array[b]);\n}\n\nvoid InsertionSort(std::vector<int>& array) {\n\tint n = array.size();\n\tfor (int i = 1; i < n; i++) {\n\t\tint j = i;\n\t\twhile (j > 0 && array[j - 1] > array[j]) {\n\t\t\tswap(array, j, j - 1);\n\t\t\tj--;\n\t\t}\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\ndef InsertionSort(array):\n\tfor i in range(1, len(array)):\n\t\tj = i\n\t\twhile j > 0 and array[j - 1] > array[j]:\n\t\t\tswap(array, j, j - 1)\n",
    jscode:
      "function swap(array, a, b) {\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfunction InsertionSort(array) {\n\tfor (let i = 1; i < array.length; i++) {\n\t\tlet j = i;\n\t\twhile (j > 0 && array[j - 1] > array[j]) {\n\t\t\tswap(array, j, j - 1);\n\t\t\tj--;\n\t\t}\n\t}\n}",
    method: "Comparison-based, iterative",
    stable: "Yes",
    data: [0, 0.0115, 0.0315, 0.608, 2.386, 55.53, 218.95],
    test_cases: {
      best: {
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      worst: {
        elements: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    },
  },
  {
    value: "SelectionSort",
    label: "Selection Sort",
    complexity: {
      time: { best: "O(N^2)", average: "O(N^2)", worst: "O(N^2)" },
      space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    },
    desc: "Selection sort is a simple sorting algorithm that repeatedly selects the smallest element from the unsorted portion of the list and swaps it with the current position.",
    ccode:
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tstd::swap(array[a], array[b]);\n}\n\nvoid SelectionSort(std::vector<int>& array) {\n\tint n = array.size();\n\tfor (int i = 0; i < n - 1; i++) {\n\t\tint min = i;\n\t\tfor (int j = i + 1; j < n; j++) {\n\t\t\tif (array[j] < array[min]) {\n\t\t\t\tmin = j;\n\t\t\t}\n\t\t}\n\t\tswap(array, min, i);\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\ndef SelectionSort(array):\n\tfor i in range(len(array) - 1):\n\t\tmin = i\n\t\tfor j in range(i + 1, len(array)):\n\t\t\tif array[j] < array[min]:\n\t\t\t\tmin = j\n\t\tswap(array, min, i)\n",
    jscode:
      "function swap(array, a, b) {\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfunction SelectionSort(array) {\n\tlet min;\n\tfor (let i = 0; i < array.length - 1; i++) {\n\t\tmin = i;\n\t\tfor (let j = i + 1; j < array.length; j++) {\n\t\t\tif (array[j] < array[min]) {\n\t\t\t\tmin = j;\n\t\t\t}\n\t\t}\n\n\t\tswap(array, min, i);\n\t}\n}",
    method: "Comparison-based, iterative",
    stable: "No",
    data: [0, 0.0082, 0.0375, 0.5813, 2.4167, 57.29, 192.44],
    test_cases: {
      best: {
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      worst: {
        elements: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    },
  },
  {
    value: "HeapSort",
    label: "Heap Sort",
    complexity: {
      time: { best: "O(NlogN)", average: "O(NlogN)", worst: "O(NlogN)" },
      space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    },
    desc: "Heap sort is a sorting algorithm that first constructs a max heap from the list, then repeatedly removes the maximum element and adjusts the heap until the list is sorted.",
    ccode:
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tstd::swap(array[a], array[b]);\n}\n\nvoid heapify(std::vector<int>& array, int n, int i) {\n\tint largest = i;\n\tint left = 2 * i + 1;\n\tint right = 2 * i + 2;\n\tif (left < n && array[left] > array[largest]) {\n\t\tlargest = left;\n\t}\n\tif (right < n && array[right] > array[largest]) {\n\t\tlargest = right;\n\t}\n\tif (largest != i) {\n\t\tswap(array, largest, i);\n\t\theapify(array, n, largest);\n\t}\n}\n\nvoid HeapSort(std::vector<int>& array) {\n\tint n = array.size();\n\tfor (int i = n / 2 - 1; i >= 0; i--) {\n\t\theapify(array, n, i);\n\t}\n\n\tint root = 0;\n\tfor (int i = n - 1; i >= root; i--) {\n\t\tswap(array, root, i);\n\t\theapify(array, i, root);\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\t[array[a], array[b]] = [array[b], array[a]];\n\ndef heapify(array, n, i):\n\tlargest = i;\n\tleft = 2 * i + 1;\n\tright = 2 * i + 2;\n\tif left < n and array[left] > array[largest]:\n\t\tlargest = left;\n\tif right < n and array[right] > array[largest]:\n\t\tlargest = right;\n\tif largest != i:\n\t\tswap(array, largest, i);\n\t\theapify(array, n, largest);\n\ndef HeapSort(array):\n\tn = len(array);\n\tfor i in range(n // 2 - 1, -1, -1):\n\t\theapify(array, n, i);\n\n\troot = 0;\n\tfor i in range(n - 1, root, -1):\n\t\tswap(array, root, i);\n\t\theapify(array, i, root);",
    jscode:
      "function swap(array, a, b) {\n\t[array[a], array[b]] = [array[b], array[a]];\n}\n\nfunction heapify(array, n, i) {\n\tlet largest = i;\n\tconst left = 2 * i + 1;\n\tconst right = 2 * i + 2;\n\tif (left < n && array[left] > array[largest]) {\n\t\tlargest = left;\n\t}\n\tif (right < n && array[right] > array[largest]) {\n\t\tlargest = right;\n\t}\n\tif (largest !== i) {\n\t\tswap(array, largest, i);\n\t\theapify(array, n, largest);\n\t}\n}\n\nfunction HeapSort(array) {\n\tconst n = array.length;\n\tfor (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n\t\theapify(array, n, i);\n\t}\n\n\tlet root = 0;\n\tfor (let i = n - 1; i >= root; i--) {\n\t\tswap(array, root, i);\n\t\theapify(array, i, root);\n\t}\n}",
    method: "Comparison-based, in-place",
    stable: "No",
    data: [0, 0.001, 0.0025, 0.0195, 0.0474, 0.2589, 0.6772],
    test_cases: {
      best: {
        elements: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
      worst: {
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    },
  },
  {
    value: "ShellSort",
    label: "Shell Sort",
    complexity: {
      time: { best: "O(NlogN)", average: "O(N^2)", worst: "O(N^2)" },
      space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    },
    desc: "Shell sort is a sorting algorithm that starts by sorting elements far apart from each other and gradually reduces the gap between elements until the list is sorted.",
    ccode:
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tstd::swap(array[a], array[b]);\n}\n\nvoid ShellSort(std::vector<int>& array) {\n\tint gap = array.size() / 2;\n\twhile (gap > 0) {\n\t\tfor (int i = gap; i < array.size(); i++) {\n\t\t\tint temp = array[i];\n\t\t\tint j = i;\n\t\t\twhile (j >= gap && array[j - gap] > temp) {\n\t\t\t\tswap(array, j, j - gap);\n\t\t\t\tj -= gap;\n\t\t\t}\n\t\t\tarray[j] = temp;\n\t\t}\n\t\tgap /= 2;\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\ndef ShellSort(array):\n\tgap = len(array) / 2\n\twhile gap > 0:\n\t\tfor i in range(gap, len(array)):\n\t\t\ttemp = array[i]\n\t\t\tj = i\n\t\t\twhile j >= gap and array[j - gap] > temp:\n\t\t\t\tarray[j] = array[j - gap]\n\t\t\t\tj -= gap\n\t\t\tarray[j] = temp\n\t\tgap = gap / 2",
    jscode:
      "function ShellSort(array) {\n\tlet gap = Math.floor(array.length / 2);\n\twhile (gap > 0) {\n\t\tfor (let i = gap; i < array.length; i++) {\n\t\t\tlet temp = array[i];\n\t\t\tlet j = i;\n\t\t\twhile (j >= gap && array[j - gap] > temp) {\n\t\t\t\tarray[j] = array[j - gap];\n\t\t\t\tj -= gap;\n\t\t\t}\n\t\t\tarray[j] = temp;\n\t\t}\n\t\tgap = Math.floor(gap / 2);\n\t}\n}",
    method: "Comparison-based, variation of insertion sort",
    stable: "No",
    data: [0, 0.001, 0.0015, 0.011, 0.0263, 0.2104, 0.4524],
    test_cases: {
      best: {
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      worst: {
        elements: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
      },
    },
  },
];

export const searchOptions = [
  {
    value: "LinearSearch",
    label: "Linear Search",
    complexity: {
      time: { best: "O(1)", average: "O(N)", worst: "O(N)" },
      space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    },
    desc: "Linear search, also known as sequential search, scans each element in a list one by one until it finds the target element or reaches the end",
    ccode:
      "#include <iostream>\n#include <vector>\n\nint linearSearch(std::vector<int>& arr, int target) {\n\tfor (int i = 0; i < arr.size(); i++) {\n\t\tif (arr[i] == target) return i;\n\t}\n\treturn -1;\n}",
    pycode:
      "def linear_search(arr, target):\n\tfor i, val in enumerate(arr):\n\t\tif val == target:\n\t\t\treturn i\n\treturn -1",
    jscode:
      "function linearSearch(arr, target) {\n\tfor (let i = 0; i < arr.length; i++) {\n\t\tif (arr[i] === target) return i;\n\t}\n\treturn -1;\n}",
    method: "Sequential search method",
    stable: "Not Applicable",
    data: [0, 0.001, 0.0015, 0.011, 0.0263, 0.2104, 0.4524],

    test_cases: {
      best: {
        target: 5,
        elements: [5, 3, 6, 7, 8, 9, 10, 7, 3, 1],
      },
      worst: {
        target: 5,
        elements: [10, 3, 6, 7, 8, 9, 7, 3, 1, 5],
      },
    },
  },
  {
    value: "BinarySearch",
    label: "Binary Search",
    complexity: {
      time: { best: "O(1)", average: "O(logN)", worst: "O(N)" },
      space: { best: "O(1)", average: "O(1)", worst: "O(1)" },
    },
    desc: "Binary Search is a fast algorithm for finding a specific value in a sorted array. It repeatedly halves the search space, achieving efficiency in O(log n) time.",
    ccode:
      "#include <iostream>\n#include <vector>\n\nint binarySearch(std::vector<int>& arr, int target){\n\tint low = 0, high = arr.size() - 1;\n\n\twhile (low <= high){\n\t\tint mid = (low + high) / 2;\n\n\t\tif (arr[mid] == target)\n\t\t\treturn mid;\n\n\t\tif (arr[mid] > target)\n\t\t\tlow = mid + 1;\n\t\telse\n\t\t\thigh = mid - 1;\n\t}\n\n\treturn -1;\n}",
    pycode:
      "def binary_search(arr, target):\n\tlow, high = 0, len(arr) - 1\n\twhile low <= high:\n\t\tmid = (low + high) / 2\n\t\tif arr[mid] == target:\n\t\t\treturn mid\n\t\tif arr[mid] < target:\n\t\t\tlow = mid + 1\n\t\telse:\n\t\t\thigh = mid - 1\n\treturn -1",
    jscode:
      "function binarySearch(arr, target) {\n\tlet low = 0;\n\tlet high = arr.length - 1;\n\twhile (low <= high) {\n\t\tconst mid = Math.floor((low + high) / 2);\n\t\tif (arr[mid] === target) return mid;\n\t\tif (arr[mid] < target) low = mid + 1;\n\t\telse high = mid - 1;\n\t}\n\treturn -1;\n}",
    method: "Divide and Conquer",
    stable: "Not Applicable",
    data: [0, 0.001, 0.0015, 0.011, 0.0263, 0.2104, 0.4524],
    test_cases: {
      best: {
        target: 5,
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
      worst: {
        target: 11,
        elements: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      },
    },
  },
];

export const speedOptions: { value: number; label: string }[] = [
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

export const languageOptions = [
  {
    value: "jscode",
    label: "Javascript",
  },
  {
    value: "pycode",
    label: "Python",
  },
  {
    value: "ccode",
    label: "C++",
  },
];
