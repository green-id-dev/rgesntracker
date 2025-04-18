import React, { useEffect, useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import ReactMarkdown from 'react-markdown';
import ExpandableText from './ExpandableText';
import Pill from './Pill';

const options = [
  {
    name: 'En cours de déploiement',
    bgColor: 'bg-orangeLight',
    borderColor: 'border-orangeStrong',
    roundColor: 'bg-orangeStrong',
    enumValue: 'IN_PROGRESS',
  },
  {
    name: 'Conforme',
    bgColor: 'bg-greenLight',
    borderColor: 'border-greenStrong',
    roundColor: 'bg-greenStrong',
    enumValue: 'APPROVED',
  },
  {
    name: 'Non conforme',
    bgColor: 'bg-redLight',
    borderColor: 'border-redStrong',
    roundColor: 'bg-redStrong',
    enumValue: 'REJECTED',
  },
  {
    name: 'Non applicable',
    bgColor: 'bg-greyLight',
    borderColor: 'border-black',
    roundColor: 'bg-black',
    enumValue: 'NOT_APPLICABLE',
  },
];

interface EvaluationQuestionProps {
  critere: any;
  onChange: (id: number, value: string) => void;
  critereResult: any[];
}

const EvaluationQuestion: React.FC<EvaluationQuestionProps> = ({ critere, onChange, critereResult }) => {
  const {
    id,
    critere: question,
    url,
    objectif,
    miseEnOeuvre,
    controle,
    difficulte,
    priorite,
    application,
    metiers,
  } = critere;

  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    const critereValue = critereResult.find((c: any) => c.id === id)?.state;
    const option = options.find((o) => o.enumValue === critereValue);
    setSelectedOption(option ? option.name : '');
  }, [critereResult, id]);

  const onChangeOption = (id: number, index: number) => {
    setSelectedOption(options[index].name);
    onChange(id, options[index].enumValue);
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl mx-auto my-4 border border-black space-y-6">
      <div className="flex flex-wrap gap-2 items-baseline">
        <h3 className="text-xl font-bold text-black">{id}</h3>
        <h3 className="text-xl font-semibold text-black">{question}</h3>
      </div>

      <RadioGroup value={selectedOption}>
        <div className="flex gap-4 flex-wrap">
          {options.map((option, index) => (
            <RadioGroup.Option
              key={option.name}
              onClick={() => onChangeOption(id, index)}
              value={option.name}
              className={({ checked }) =>
                `flex items-center px-4 py-2 border rounded-xl cursor-pointer transition-all ${
                  checked
                    ? `${option.bgColor} ${option.borderColor} border-[2px] font-semibold`
                    : 'border-black bg-white'
                }`
              }
            >
              {({ checked }) => (
                <>
                  <span>{option.name}</span>
                  <span className="ml-2 w-5 h-5 rounded-full border border-black relative">
                    {checked && (
                      <>
                        <span className="absolute inset-0.5 bg-white rounded-full"></span>
                        <span className={`absolute inset-1 rounded-full ${option.roundColor}`}></span>
                      </>
                    )}
                  </span>
                </>
              )}
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>

      <div className="flex justify-end items-center">
        <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm underline text-black">
          Lien vers le critère
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </a>
      </div>

      <div className="space-y-4 bg-gray-50 border border-gray-200 p-4 rounded-xl text-sm">
        <ExpandableText title="🎯 Objectif" markdown={objectif} />
        <ExpandableText title="🛠 Mise en œuvre" markdown={miseEnOeuvre} />
        <ExpandableText title="✅ Contrôle attendu" markdown={controle} />

        <div className="flex flex-wrap gap-4 pt-2">
          <Pill label="Difficulté" value={difficulte} />
          <Pill label="Priorité" value={priorite} />
          <Pill label="Application" value={application} />
          {Array.isArray(metiers) && metiers.length > 0 && (
            <Pill label="Métiers concernés" value={metiers.join(', ')} />
          )}
        </div>
      </div>
    </div>
  );
};

export default EvaluationQuestion;