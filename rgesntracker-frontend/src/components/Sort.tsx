import React, { useState } from 'react';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import GreyContainer from './GreyContainer.tsx';
import '../styles/radio.css';
import TitleBlocks from './TitleBlocks.tsx';


interface SortingProps {
    onSortChange: (newSort: string) => void;
}

const SortingComponent: React.FC<SortingProps> = ({onSortChange}) => {
    const [selectedSort, setSelectedSort] = useState('parNumero');


    const handleOnChange = (sortValue: string) => {
        setSelectedSort(sortValue);
        onSortChange(sortValue);

    }

    return (
        <GreyContainer flexDirection="flex-col md:flex-col">
            <TitleBlocks text="Trier :" />
            <div className="space-y-2 mt-4 flex flex-wrap">
                <label className="flex flex-wrap items-center">
                    <input
                        type="radio"
                        name="sort"
                        value="plusConforme"
                        checked={selectedSort === 'plusConforme'}
                        onChange={() => handleOnChange('plusConforme')}
                        className="h-4 w-4 border-gray-300 focus:ring-0"
                    />
                    <span className={`ml-2 ${selectedSort === 'plusConforme' ? 'font-bold' : 'font-normal'}`}>Du plus conforme</span>
                    <ChevronDownIcon className="ml-1 h-5 w-5 text-gray-600" />
                </label>
                <label className="flex flex-wrap items-center">
                    <input
                        type="radio"
                        name="sort"
                        value="moinsConforme"
                        checked={selectedSort === 'moinsConforme'}
                        onChange={() => handleOnChange('moinsConforme')}
                        className="h-4 w-4 border-gray-300 focus:ring-0"
                    />
                    <span className={`ml-2 ${selectedSort === 'moinsConforme' ? 'font-bold' : 'font-normal'}`}>Du moins conforme</span>
                    <ChevronUpIcon className="ml-1 h-5 w-5 text-gray-600" />
                </label>
                <label className="flex flex-wrap items-center">
                    <input
                        type="radio"
                        name="sort"
                        value="parNumero"
                        checked={selectedSort === 'parNumero'}
                        onChange={() => handleOnChange('parNumero')}
                        className="h-4 w-4 border-gray-300 focus:ring-0"
                    />
                    <span className={`ml-2 ${selectedSort === 'parNumero' ? 'font-bold' : 'font-normal'}`}>Par numéro de critère</span>
                </label>
            </div>
        </GreyContainer>
    );
};

export default SortingComponent;
