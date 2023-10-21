export type Steps = {
  type: string;
  detail?: string;
  position?: object;
};

export interface AlgoMetadata {
  ccode: string;
  complexity: {
    time: {
      best: string;
      average: string;
      worst: string;
    };
    space: {
      best: string;
      average: string;
      worst: string;
    };
  };
  data: number[];
  desc: string;
  jscode: string;
  label: string;
  method: string;
  pycode: string;
  stable: string;
  test_cases: {
    best: {
      elements: number[];
    };
    worst: {
      elements: number[];
    };
  };
  value: string;
}

export type AlgoMetrics = {
  timer: number;
  count: number;
};
