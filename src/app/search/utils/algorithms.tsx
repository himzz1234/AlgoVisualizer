import { Steps } from "@/app/types/types";

interface colorConfiguration {
  [key: string]: string;
}

// Color configuration for different elements
export const colorConfig: colorConfiguration = {
  i_comp: "#3498db",
  i_match: "green",
  low_comp: "red",
  high_comp: "red",
  mid_comp: "#3498db",
  mid_match: "green",
};

// Linear Search
export function LinearSearch(arr: number[], target: number) {
  const steps: Steps[] = [];
  for (let i = 0; i < arr.length; i++) {
    // Compare the current element with the target element.
    steps.push({
      type: "comp",
      detail: `Comparing value at position ${i} with ${target}`,
      position: { i: i },
    });

    if (arr[i] === target) {
      // The target element is found at the current position.
      steps.push({
        type: "match",
        detail: `The target element is found at position ${i}`,
        position: { i: i },
      });

      return steps;
    }
  }

  // The target element is not found in the array.
  steps.push({
    type: "not-found",
    detail: "The target element is not found in the array",
  });

  return steps;
}

// Binary Search
export function BinarySearch(arr: number[], target: number) {
  const steps: Steps[] = [];

  let low = 0,
    high = arr.length - 1;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);

    steps.push({
      type: "comp",
      detail: `Comparing middle value ${arr[mid]} with target ${target}`,
      position: { mid: mid, low: low, high: high },
    });

    if (arr[mid] == target) {
      steps.push({
        type: "match",
        detail: "The target element is found at position " + mid,
        position: { mid: mid },
      });

      return steps;
    }

    if (arr[mid] > target) {
      high = mid - 1;
      steps.push({
        type: "comp",
        detail: `Updating high to ${high}th index since ${arr[mid]} (mid) > ${target}`,
        position: { low: low, high: high },
      });
    } else {
      low = mid + 1;
      steps.push({
        type: "comp",
        detail: `Updating low to ${low}th index since ${arr[mid]} (mid) < ${target}`,
        position: { low: low, high: high },
      });
    }
  }

  if (low > high) {
    steps.push({
      type: "not-found",
      detail: "The target element is not found in the array.",
    });
  }

  return steps;
}
