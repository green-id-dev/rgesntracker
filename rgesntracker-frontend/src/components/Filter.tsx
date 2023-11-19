import React, { useState } from 'react';
import GreyContainer from '../components/GreyContainer.tsx';
import '../styles/checkbox.css'
import TitleBlocks from '../components/TitleBlocks.tsx';

interface FilterProps {
  values: string[];
  onChange: (newValues: string[]) => void;
  criteres: { id: string; state: string }[];
  criteresFilled: { id: string; state: string }[];
}

const Filter: React.FC<FilterProps> = ({ values, onChange, criteres, criteresFilled }) => {
  const statesCount = {
    "En cours de déploiement": criteresFilled.filter(critere => critere.state === "IN_PROGRESS").length,
    "Conforme": criteresFilled.filter(critere => critere.state === "APPROVED").length,
    "Non conforme": criteresFilled.filter(critere => critere.state === "REJECTED").length,
    "Non applicable": criteresFilled.filter(critere => critere.state === "NOT_APPLICABLE").length,
    "Critères non évalués": criteres.filter(critere => !criteresFilled.some(c => c.id === critere.id)).length,
    "Tous": criteres.length,
  };

  const categoriesValues = [
    "IN_PROGRESS",
    "APPROVED",
    "REJECTED",
    "NOT_APPLICABLE",
    "NOT_EVALUATED",
    "Tous"
]

  const handleOnChange = (categoryValue: string, index:number) => {
    if (categoryValue === "Tous") {
      onChange(["Tous"]);
    } else {
      if (values.includes(categoriesValues[index])) {
        if (values.length === 1) {
          onChange(["Tous"]);
        } else
          onChange(values.filter(v => v !== categoriesValues[index]));
      } else {
        onChange([...values.filter(v => v !== "Tous"), categoriesValues[index]]);
      }
    }
  };

  return (
    <div className='flew flew-col'>
      <GreyContainer flexDirection="flex-col">
        <TitleBlocks text="Filtrer" />
        <div className="flex flex-col md:flex-row flex-wrap gap-4 mt-4">
          {Object.entries(statesCount).map(([stateKey, count], index) => (
            <label key={stateKey} className={`flex items-center p-2 cursor-pointer form-control}`}>
              <input
                type="checkbox"
                name="filter"
                value={stateKey}
                checked={values.includes(categoriesValues[index])}
                onChange={() => handleOnChange(stateKey, index)}
                className="mr-2"
              />
              <span className='ml-2'>{stateKey} ({count})</span>
            </label>
          ))}
        </div>
      </GreyContainer>

    </div>
  );
};

export default Filter;
