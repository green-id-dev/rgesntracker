import React from 'react';
import CustomButtonRapport from './CustomButtonRapport';


const options = [
    {
        name: 'En cours de déploiement',
        bgColor: 'bg-orangeLight',
        borderColor: 'border-orangeStrong',
        roundColor: 'bg-orangeStrong',
        enumValue: "IN_PROGRESS"
    },
    {
        name: 'Conforme',
        bgColor: 'bg-greenLight',
        borderColor: 'border-greenStrong',
        roundColor: 'bg-greenStrong',
        enumValue: "APPROVED"
    },
    {
        name: 'Non conforme',
        bgColor: 'bg-redLight',
        borderColor: 'border-redStrong',
        roundColor: 'bg-redStrong',
        enumValue: "REJECTED"
    },
    {
        name: 'Non applicable',
        bgColor: 'bg-greyLight',
        borderColor: 'border-black',
        roundColor: 'bg-black',
        enumValue: "NOT_APPLICABLE"
    },
];

interface EvaluationQuestionProps {
    id: number;
    question: string;
    url: string;
    critereResult: any;
    state: string;
}

const EvaluationResult: React.FC<EvaluationQuestionProps> = ({id, question, url, critereResult, state}) => {

    const backgroundColor = state === "IN_PROGRESS" ? 'bg-orangeLight' : state === "APPROVED" ? 'bg-greenLight' : state === "REJECTED" ? 'bg-redLight' : 'bg-greyLight';
    const borderColor = state === "IN_PROGRESS" ? 'border-orangeStrong' : state === "APPROVED" ? 'border-greenStrong' : state === "REJECTED" ? 'border-redStrong' : 'border-grey';
    const text = state === "IN_PROGRESS" ? 'En cours de déploiement' : state === "APPROVED" ? 'Conforme' : state === "REJECTED" ? 'Non conforme' : 'Non applicable';

    const ExternalLinkSvg = () => (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
             className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>
        </svg>
    );


    return (
        <div className="w-full bg-white p-6 rounded-lg mx-auto my-4 border border-black">
            <div className="flex flex-row">
                <h3 className="text-xl font-semibold">{id}</h3>
                <h3 className="text-xl ml-2 font-semibold mb-4">{question}</h3>
            </div>

            <CustomButtonRapport text={text} backgroundColor={backgroundColor} borderColor={borderColor}/>


            <div className="flex justify-end items-center mt-4">
                <a href={url} target={"_blank"} className="flex items-center text-base mr-3 text-black">
                    <span className="ml-1 underline">Lien vers le critère</span>
                </a>
                <ExternalLinkSvg aria-hidden="true"/>
            </div>
        </div>
    );
};

export default EvaluationResult;
