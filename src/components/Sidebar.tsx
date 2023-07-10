interface SidebarProps {
  selectedValue: any;
}

export default function Sidebar({ selectedValue }: SidebarProps) {
  return (
    <div className="h-auto w-96 py-8 px-5 rounded-md">
      <div className="space-y-5">
        <h1 className="text-[22px] font-medium">{selectedValue.label}</h1>
      </div>

      <div className="mt-10 space-y-4">
        <p>
          <span className="font-medium">Time Complexity: </span>
          {selectedValue.complexity.time}
        </p>
        <p>
          <span className="font-medium">Space Complexity: </span>
          {selectedValue.complexity.space}
        </p>
        <p>
          <span className="font-medium">Method: </span>
          {selectedValue.method}
        </p>
        <p>
          <span className="font-medium">Stable: </span>
          {selectedValue.stable}
        </p>
      </div>
    </div>
  );
}
