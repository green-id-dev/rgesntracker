import React from 'react';

const Pill = ({ label, value }: { label: string; value: string }) => {
  const colorMap: Record<string, string> = {
    Faible: 'bg-green-100 text-green-800 border-green-300',
    Moyen: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    Fort: 'bg-red-100 text-red-800 border-red-300',
    Prioritaire: 'bg-red-100 text-red-800 border-red-300',
    Recommandé: 'bg-green-100 text-green-800 border-green-300',
    Modéré: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  const colorClass = colorMap[value] || 'bg-gray-100 text-gray-800 border-gray-300';

  return (
    <div className={`border rounded-full px-4 py-1 text-sm font-medium ${colorClass}`}>
      <span className="font-semibold">{label} :</span> {value}
    </div>
  );
};

export default Pill;