import React, { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import GreyContainer from './GreyContainer';
import TitleBlocks from './TitleBlocks';

interface SortingProps {
  onSortChange: (newSort: string) => void;
}

const SortingComponent: React.FC<SortingProps> = ({ onSortChange }) => {
  const [selectedSort, setSelectedSort] = useState('parNumero');

  const options = [
    { label: 'Du plus conforme', value: 'plusConforme', icon: ChevronDownIcon },
    { label: 'Du moins conforme', value: 'moinsConforme', icon: ChevronUpIcon },
    { label: 'Par numéro de critère', value: 'parNumero' },
    { label: 'Par difficulté', value: 'parDifficulte' },
    { label: 'Par priorité', value: 'parPriorite' },
  ];

  const handleOnChange = (value: string) => {
    setSelectedSort(value);
    onSortChange(value);
  };

  return (
    <GreyContainer flexDirection="flex-col md:flex-col">
      <TitleBlocks text="Trier :" />
      <div className="space-y-2 mt-4 flex flex-col gap-2">
        {options.map((opt) => {
          const Icon = opt.icon;
          return (
            <label key={opt.value} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="sort"
                value={opt.value}
                checked={selectedSort === opt.value}
                onChange={() => handleOnChange(opt.value)}
                className="h-4 w-4 border-gray-300 focus:ring-0"
              />
              <span className={`ml-2 ${selectedSort === opt.value ? 'font-bold' : 'font-normal'}`}>{opt.label}</span>
              {Icon && selectedSort === opt.value && (
                <Icon className="ml-2 h-5 w-5 text-gray-600" />
              )}
            </label>
          );
        })}
      </div>
    </GreyContainer>
  );
};

export default SortingComponent;