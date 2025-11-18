import React from 'react';

const ColorTest = () => {
  const colors = [
    { name: 'Success', bgClass: 'bg-success', textClass: 'text-success-foreground' },
    { name: 'Danger', bgClass: 'bg-danger', textClass: 'text-danger-foreground' },
    { name: 'Warning', bgClass: 'bg-warning', textClass: 'text-warning-foreground' },
    { name: 'Info', bgClass: 'bg-info', textClass: 'text-info-foreground' },
    { name: 'Neutral', bgClass: 'bg-neutral', textClass: 'text-neutral-foreground' },
    { name: 'Dark', bgClass: 'bg-dark', textClass: 'text-dark-foreground' },
  ];

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Custom Color Test</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {colors.map((color) => (
          <div
            key={color.name}
            className={`${color.bgClass} ${color.textClass} p-4 rounded-lg shadow-md text-center`}
          >
            <div className="font-semibold text-lg">{color.name}</div>
            <div className="text-sm opacity-90 mt-1">
              {color.bgClass} with {color.textClass}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="text-lg font-semibold">Text Colors</h3>
        <div className="flex flex-wrap gap-4">
          <span className="text-success">Success Text</span>
          <span className="text-danger">Danger Text</span>
          <span className="text-warning">Warning Text</span>
          <span className="text-info">Info Text</span>
          <span className="text-neutral">Neutral Text</span>
          <span className="text-dark">Dark Text</span>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="text-lg font-semibold">Border Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border-2 border-success p-2 rounded">Success Border</div>
          <div className="border-2 border-danger p-2 rounded">Danger Border</div>
          <div className="border-2 border-warning p-2 rounded">Warning Border</div>
          <div className="border-2 border-info p-2 rounded">Info Border</div>
          <div className="border-2 border-neutral p-2 rounded">Neutral Border</div>
          <div className="border-2 border-dark p-2 rounded">Dark Border</div>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <h3 className="text-lg font-semibold">Background with Opacity</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-success/10 p-3 rounded">Success 10%</div>
          <div className="bg-danger/10 p-3 rounded">Danger 10%</div>
          <div className="bg-warning/10 p-3 rounded">Warning 10%</div>
          <div className="bg-info/10 p-3 rounded">Info 10%</div>
          <div className="bg-neutral/10 p-3 rounded">Neutral 10%</div>
          <div className="bg-dark/10 p-3 rounded">Dark 10%</div>
        </div>
      </div>
    </div>
  );
};

export default ColorTest;