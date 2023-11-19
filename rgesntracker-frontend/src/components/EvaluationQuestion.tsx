import React, { useState } from 'react';
import { RadioGroup } from '@headlessui/react';
import { } from '@heroicons/react/24/outline'
import { useEffect } from 'react';


const options = [
  { name: 'En cours de déploiement', bgColor: 'bg-orangeLight', borderColor: 'border-orangeStrong', roundColor: 'bg-orangeStrong', enumValue:"IN_PROGRESS" },
  { name: 'Conforme', bgColor: 'bg-greenLight', borderColor: 'border-greenStrong', roundColor: 'bg-greenStrong', enumValue:"APPROVED"},
  { name: 'Non conforme', bgColor: 'bg-redLight', borderColor: 'border-redStrong', roundColor: 'bg-redStrong', enumValue:"REJECTED"},
  { name: 'Non applicable', bgColor: 'bg-greyLight', borderColor: 'border-black', roundColor: 'bg-black', enumValue:"NOT_APPLICABLE" },
];

interface EvaluationQuestionProps {
  id: number;
  question: string;
  url: string;
  onChange: any;
  critereResult: any;
}

const EvaluationQuestion: React.FC<EvaluationQuestionProps> = ({ id, question, url, onChange, critereResult }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const onChangeOption = (id: number, index: number) => {
    setSelectedOption(options[index].name);
    onChange(id, options[index].enumValue);
  }

  useEffect(() => {
    const critereValue = critereResult.find((c: any) => c.id === id)?.state;
    const option = options.find((o) => o.enumValue === critereValue);
    setSelectedOption(option ? option.name : "");
  }, [critereResult, id]);

  const ExternalLinkSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );


  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-lg mx-auto my-4 border border-black">
      <div className="flex flex-col md:flex-row">
        <h3 className="text-xl font-semibold">{id}</h3>
        <h3 className="text-xl ml-2 font-semibold mb-4">{question}</h3>
      </div>

      <RadioGroup value={selectedOption} >
        <div className="flex gap-6 flex-wrap">
          {options.map((option, index) => (
            <RadioGroup.Option key={option.name} onClick={() => onChangeOption(id, index)} value={option.name} className={({ checked }) =>
              `flex items-center px-4 py-2 border rounded-xl cursor-pointer ${checked ? `${option.bgColor} ${option.borderColor} border-[2px] text-black` : 'border-black bg-white text-black'
              }`
            }>
              {({ checked }) => (
                <>
                  <span className={`text-sm font-normal ${checked ? 'font-semibold' : 'text-sm'}`}>
                    {option.name}
                  </span>
                  <span className="ml-2 flex-shrink-0 w-5 h-5 rounded-full border border-black relative">
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
      <div className="flex justify-end items-center mt-4">
        <a href={url} className="flex items-center text-base mr-3 text-black">
          <span className="ml-1 underline">Lien vers le critère</span>
        </a>
        <ExternalLinkSvg aria-hidden="true" />
      </div>
    </div>
  );
};

export default EvaluationQuestion;
