#include <iostream>
#include <vector>
#include <stack>

void swap(std::vector<int>& array, int a, int b) {
	int temp = array[a];
	array[a] = array[b];
	array[b] = temp;
}

int partition(std::vector<int>& array, int left, int right) {
	int pivotValue = array[right];
	int pivot = left;
	for (int i = left; i < right; i++) {
		if (array[i] < pivotValue) {
			swap(array, pivot, i);
			pivot++;
		}
	}
	swap(array, right, pivot);
	return pivot;
}

void quickSort(std::vector<int>& array) {
	std::stack<int> stack;
	stack.push(0);
	stack.push(array.size() - 1);
	while (!stack.empty()) {
		int end = stack.top();
		stack.pop();
		int start = stack.top();
		stack.pop();
		int pivot = partition(array, start, end);
		if (pivot - 1 > start) {
			stack.push(start);
			stack.push(pivot - 1);
		}
		if (pivot + 1 < end) {
			stack.push(pivot + 1);
			stack.push(end);
		}
	}
}