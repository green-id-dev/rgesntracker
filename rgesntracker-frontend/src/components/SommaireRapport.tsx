import React from 'react';
import GreyContainer from '../components/GreyContainer.tsx'; // Supposition sur le chemin d'importation

interface SectionItem {
    label: string;
    items: string[];
}

const sections: SectionItem[] = [
    {label: 'Stratégie', items: ['Non conforme', 'Conforme', 'En cours de déploiement', 'Non applicable']},
    // ... autres sections
];

const SommaireComponent: React.FC = () => {
    return (
        <GreyContainer>
            <div className="flex flex-wrap justify-between">
                {sections.map((section, index) => (
                    <div key={index} className="mb-4 w-full md:w-1/3 lg:w-1/4 px-2">
                        <h3 className="font-bold text-lg mb-2">{`${index + 1}. ${section.label}`}</h3>
                        <ul className="list-none space-y-1">
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-center">
                                    <span className="text-sm">{`${String.fromCharCode(97 + itemIndex)}.`}</span>
                                    <span className="text-sm ml-2">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </GreyContainer>
    );
};

export default SommaireComponent;
