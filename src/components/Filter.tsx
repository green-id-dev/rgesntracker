import React from 'react';
import GreyContainer from '../components/GreyContainer.tsx';
import '../styles/checkbox.css';
import TitleBlocks from '../components/TitleBlocks.tsx';

interface FilterProps {
  values: string[];
  onChange: (newValues: string[]) => void;
  criteres: { id: string; state: string; difficulte?: string; priorite?: string }[];
  criteresFilled: { id: string; state: string }[];
}

const Filter: React.FC<FilterProps> = ({ values, onChange, criteres, criteresFilled }) => {
  const statesCount = {
    "En cours de déploiement": criteresFilled.filter((critere) => critere.state === "IN_PROGRESS").length,
    "Conforme": criteresFilled.filter((critere) => critere.state === "APPROVED").length,
    "Non conforme": criteresFilled.filter((critere) => critere.state === "REJECTED").length,
    "Non applicable": criteresFilled.filter((critere) => critere.state === "NOT_APPLICABLE").length,
    "Critères non évalués": criteres.filter((critere) => !criteresFilled.some((c) => c.id === critere.id)).length,
    "Faible": criteres.filter((critere) => critere.difficulte === "Faible").length,
    "Moyen": criteres.filter((critere) => critere.difficulte === "Moyen").length,
    "Fort": criteres.filter((critere) => critere.difficulte === "Fort").length,
    "Modéré": criteres.filter((critere) => critere.priorite === "Modéré").length,
    "Recommandé": criteres.filter((critere) => critere.priorite === "Recommandé").length,
    "Prioritaire": criteres.filter((critere) => critere.priorite === "Prioritaire").length,
    "Tous": criteres.length,
  };

  const categoriesValues = [
    "IN_PROGRESS",
    "APPROVED",
    "REJECTED",
    "NOT_APPLICABLE",
    "NOT_EVALUATED",
    "FAIBLE",
    "MOYEN",
    "FORT",
    "MODERE",
    "RECOMMANDE",
    "PRIORITAIRE",
    "Tous",
  ];
  
  const filterKeys = [
    "En cours de déploiement",
    "Conforme",
    "Non conforme",
    "Non applicable",
    "Critères non évalués",
    "Faible",
    "Moyen",
    "Fort",
    "Modéré",
    "Recommandé",
    "Prioritaire",
    "Tous",
  ];

  

  const handleOnChange = (categoryValue: string, index: number) => {
    if (categoryValue === "Tous") {
      onChange(["Tous"]);
    } else {
      if (values.includes(categoriesValues[index])) {
        if (values.length === 1) {
          onChange(["Tous"]);
        } else {
          onChange(values.filter((v) => v !== categoriesValues[index]));
        }
      } else {
        onChange([...values.filter((v) => v !== "Tous"), categoriesValues[index]]);
      }
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <GreyContainer flexDirection="flex-col">
        <TitleBlocks text="Filtrer" />
        <div className="flex flex-col self-center items-center md:flex-row flex-wrap gap-2 mt-4">
          {(filterKeys as (keyof typeof statesCount)[]).map((key) => {
            const index = filterKeys.indexOf(key);
            const rawValue = categoriesValues[index];
            return (
              <label key={key} className="flex p-2 mt-0 cursor-pointer form-control">
                <input
                  type="checkbox"
                  name="filter"
                  value={rawValue}
                  checked={values.includes(rawValue)}
                  onChange={() => handleOnChange(key, index)}
                  className="text-sm"
                />
                <span className="ml-2">{key} ({statesCount[key] ?? 0})</span>
              </label>
            );
          })}

          
        </div>
      </GreyContainer>
    </div>
  );
};

export default Filter;
