export const algoOptions: any = [
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
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tint temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nint main() {\n\tstd::vector<int> array;\n\n\tfor (int i = 0; i < array.size(); i++) {\n\t\tfor (int j = 0; j < array.size() - i - 1; j++) {\n\t\t\tif (array[j] > array[j + 1]) {\n\t\t\t\tswap(array, j, j + 1);\n\t\t\t}\n\t\t}\n\t}\n\n\treturn 0;\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\nfor i in range(len(array)):\n\tfor j in range(len(array) - i - 1):\n\t\tif array[j] > array[j + 1]:\n\t\t\tswap(array, j, j + 1)",
    jscode:
      "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfor (let i = 0; i < array.length; i++) {\n\tfor (let j = 0; j < array.length - i - 1; j++) {\n\t\tif (array[j] > array[j + 1]) {\n\t\t\t swap(array, j, j + 1); \n\t\t} \n\t} \n}",
    method: "Comparison-based, iterative",
    stable: "Yes",
    data: [0, 0.022, 0.0768, 1.448, 5.192, 128.54, 513.34],
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
      "#include <iostream>\n#include <vector>\n#include <stack>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tint temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nint partition(std::vector<int>& array, int left, int right) {\n\tint pivotValue = array[right];\n\tint pivot = left;\n\tfor (int i = left; i < right; i++) {\n\t\tif (array[i] < pivotValue) {\n\t\t\tswap(array, pivot, i);\n\t\t\tpivot++;\n\t\t}\n\t}\n\tswap(array, right, pivot);\n\treturn pivot;\n}\n\nvoid quickSort(std::vector<int>& array) {\n\tstd::stack<int> stack;\n\tstack.push(0);\n\tstack.push(array.size() - 1);\n\twhile (!stack.empty()) {\n\t\tint end = stack.top();\n\t\tstack.pop();\n\t\tint start = stack.top();\n\t\tstack.pop();\n\t\tint pivot = partition(array, start, end);\n\t\tif (pivot - 1 > start) {\n\t\t\tstack.push(start);\n\t\t\tstack.push(pivot - 1);\n\t\t}\n\t\tif (pivot + 1 < end) {\n\t\t\tstack.push(pivot + 1);\n\t\t\tstack.push(end);\n\t\t}\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\ndef partition(array, left, right):\n\tpivotValue = array[right]\n\tpivot = left\n\tfor i in range(left, right):\n\t\tif array[i] < pivotValue:\n\t\t\tswap(array, pivot, i)\n\t\t\tpivot += 1\n\tswap(array, right, pivot)\n\treturn pivot\n\ndef quickSort(array):\n\tstack = []\n\tstack.append(0)\n\tstack.append(len(array) - 1)\n\twhile stack:\n\t\tend = stack.pop()\n\t\tstart = stack.pop()\n\t\tpivot = partition(array, start, end)\n\t\tif pivot - 1 > start:\n\t\t\tstack.append(start)\n\t\t\tstack.append(pivot - 1)\n\t\tif pivot + 1 < end:\n\t\t\tstack.append(pivot + 1)\n\t\t\tstack.append(end)",
    jscode:
      "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfunction partition(array, left, right) {\n\tconst pivotValue = array[right];\n\tlet pivot = left;\n\tfor (let i = left; i < right; i++) {\n\t\tif (array[i] < pivotValue) {\n\t\t\tswap(array, pivot, i);\n\t\t\tpivot++; \n\t\t} \n\t}\n\n\tswap(array, right, pivot);\n\treturn pivot; \n}\n\nconst stack = [];\nstack.push(0);\nstack.push(array.length - 1);\nwhile (stack[stack.length - 1] >= 0) {\n\tlet end = stack.pop(),\n\tlet start = stack.pop();\n\tlet pivot = partition(array, start, end);\n\n\tif (pivot - 1 > start) {\n\t\tstack.push(start);\n\t\tstack.push(pivot - 1);\n\t}\n\tif (pivot + 1 < end) {\n\t\tstack.push(pivot + 1);\n\t\tstack.push(end);\n\t}\n}",
    method: "Comparison-based, divide and conquer",
    stable: "No",
    data: [0, 0.002, 0.005, 0.01, 0.0202, 0.0875, 0.175],
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
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tint temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfor (int i = 1; i < array.size(); i++) {\n\tint j = i;\n\twhile (j > 0 && array[j - 1] > array[j]) {\n\t\tswap(array, j, j - 1);\n\t\tj--;\n\t}\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\nfor i in range(1, len(array)):\n\tj = i\n\twhile j > 0 and array[j - 1] > array[j]:\n\t\tswap(array, j, j - 1)\n\t\tj -= 1",
    jscode:
      "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfor (let i = 1; i < array.length; i++) {\n\tlet j = i;\n\twhile (j > 0 && array[j - 1] > array[j]) {\n\t\tswap(array, j, j - 1);\n\t\tj--;\n\t} \n}",
    method: "Comparison-based, iterative",
    stable: "Yes",
    data: [0, 0.0115, 0.0315, 0.608, 2.386, 55.53, 218.95],
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
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\tint temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nfor (int i = 0; i < array.size() - 1; i++) {\n\tint min = i;\n\tfor (int j = i + 1; j < array.size(); j++) {\n\t\tif (array[j] < array[min]) {\n\t\t\tmin = j;\n\t\t}\n\t}\n\tswap(array, min, i);\n}",
    pycode:
      "def swap(array, a, b):\n\tarray[a], array[b] = array[b], array[a]\n\nfor i in range(len(array) - 1):\n\tmin = i\n\tfor j in range(i + 1, len(array)):\n\t\tif array[j] < array[min]:\n\t\t\tmin = j\n\tswap(array, min, i)",
    jscode:
      "function swap(array, a, b){\n\tconst temp = array[a];\n\tarray[a] = array[b];\n\tarray[b] = temp;\n}\n\nlet min;\nfor (let i = 0; i < array.length - 1; i++) {\n\tmin = i;\n\tfor (let j = i + 1; j < array.length; j++) {\n\t\tif (array[j] < array[min]) {\n\t\t\tmin = j;\n\t\t}\n\t}\n\n\tswap(array, min, i);\n}",
    method: "Comparison-based, iterative",
    stable: "No",
    data: [0, 0.0082, 0.0375, 0.5813, 2.4167, 57.29, 192.44],
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
      "#include <iostream>\n#include <vector>\n\nvoid swap(std::vector<int>& array, int a, int b) {\n\t[array[a], array[b]] = [array[b], array[a]];\n}\n\nvoid heapify(std::vector<int>& array, int n, int i) {\n\tint largest = i;\n\tint left = 2 * i + 1;\n\tint right = 2 * i + 2;\n\tif (left < n && array[left] > array[largest]) {\n\t\tlargest = left;\n\t}\n\tif (right < n && array[right] > array[largest]) {\n\t\tlargest = right;\n\t}\n\tif (largest != i) {\n\t\tswap(array, largest, i);\n\t\theapify(array, n, largest);\n\t}\n}\n\nint n = array.size();\nfor (int i = n / 2 - 1; i >= 0; i--) {\n\theapify(array, n, i);\n}\n\nint root = 0;\nfor (int i = n - 1; i >= root; i--) {\n\tswap(array, root, i);\n\theapify(array, i, root);\n}",
    pycode:
      "def swap(array, a, b):\n\t[array[a], array[b]] = [array[b], array[a]];\n\ndef heapify(array, n, i):\n\tlargest = i;\n\tleft = 2 * i + 1;\n\tright = 2 * i + 2;\n\tif left < n and array[left] > array[largest]:\n\t\tlargest = left;\n\tif right < n and array[right] > array[largest]:\n\t\tlargest = right;\n\tif largest != i:\n\t\tswap(array, largest, i);\n\t\theapify(array, n, largest);\n\nn = len(array);\nfor i in range(n):\n\theapify(array, n, i);\n\nroot = 0;\nfor i in range(n - 1, root, -1):\n\tswap(array, root, i);\n\theapify(array, i, root);",
    jscode:
      "function swap(array, a, b){\n\t[array[a], array[b]] = [array[b], array[a]];\n}\n\nfunction heapify(array, n, i) {\n\tlet largest = i;\n\tconst left = 2 * i + 1;\n\tconst right = 2 * i + 2;\n\tif (left < n && array[left] > array[largest]) {\n\t\tlargest = left;\n\t};\n\tif (right < n && array[right] > array[largest]) {\n\t\tlargest = right;\n\t}\n\tif (largest !== i) {\n\t\tswap(array, largest, i);\n\t\theapify(array, n, largest);\n\t}\n}\n\nconst n = array.length;\nfor (let i = Math.floor(n / 2) - 1; i >= 0; i--) {\n\theapify(array, n, i);\n}\n\nlet root = 0;\nfor (let i = n - 1; i >= root; i--) {\n\tswap(array, root, i);\n\theapify(array, i, root);\n}",
    method: "Comparison-based, in-place",
    stable: "No",
    data: [0, 0.001, 0.0025, 0.0195, 0.0474, 0.2589, 0.6772],
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
      "#include <iostream>\n#include <vector>\n\nint gap = array.size() / 2;\nwhile (gap > 0) {\n\tfor (int i = gap; i < array.size(); i++) {\n\t\tint temp = array[i];\n\t\tint j = i;\n\t\twhile (j >= gap && array[j - gap] > temp) {\n\t\t\tarray[j] = array[j - gap];\n\t\t\tj -= gap;\n\t\t}\n\t\tarray[j] = temp;\n\t}\n\tgap = gap / 2;\n}",
    pycode:
      "gap = len(array) / 2\nwhile gap > 0:\n\tfor i in range(gap, len(array)):\n\t\ttemp = array[i]\n\t\tj = i\n\t\twhile j >= gap and array[j - gap] > temp:\n\t\t\tarray[j] = array[j - gap]\n\t\t\tj -= gap\n\t\tarray[j] = temp\n\tgap = gap / 2",
    jscode:
      "let gap = Math.floor(array.length / 2);\nwhile (gap > 0) {\n\tfor (let i = gap; i < array.length; i++) {\n\t\tlet temp = array[i];\n\t\tlet j = i;\n\t\twhile (j >= gap && array[j - gap] > temp) {\n\t\t\tarray[j] = array[j - gap];\n\t\t\tj -= gap;\n\t\t}\n\t\tarray[j] = temp;\n\t}\n\tgap = Math.floor(gap / 2);\n}",
    method: "Comparison-based, variation of insertion sort",
    stable: "No",
    data: [0, 0.001, 0.0015, 0.011, 0.0263, 0.2104, 0.4524],
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
      "#include <iostream>\n#include <vector>\n\nint binarySearch(std::vector<int>& arr, int target) {\n\tint left = 0;\n\tint right = arr.size() - 1;\n\twhile (left <= right) {\n\t\tint mid = (left + right) / 2;\n\t\tif (arr[mid] == target) return mid;\n\t\tif (arr[mid] < target) left = mid + 1;\n\t\telse right = mid - 1;\n\t}\n\treturn -1;\n}",
    pycode:
      "def binary_search(arr, target):\n\tleft, right = 0, len(arr) - 1\n\twhile left <= right:\n\t\tmid = (left + right) / 2\n\t\tif arr[mid] == target:\n\t\t\treturn mid\n\t\tif arr[mid] < target:\n\t\t\tleft = mid + 1\n\t\telse:\n\t\t\tright = mid - 1\n\treturn -1",
    jscode:
      "function binarySearch(arr, target) {\n\tlet left = 0;\n\tlet right = arr.length - 1;\n\twhile (left <= right) {\n\t\tconst mid = Math.floor((left + right) / 2);\n\t\tif (arr[mid] === target) return mid;\n\t\tif (arr[mid] < target) left = mid + 1;\n\t\telse right = mid - 1;\n\t}\n\treturn -1;\n}",
    method: "Divide and Conquer",
    stable: "Not Applicable",
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
