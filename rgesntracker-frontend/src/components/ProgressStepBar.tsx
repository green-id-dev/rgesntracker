import React, { useEffect, useState } from 'react';

interface ProgressStepBarProps {
    step: number;
}

const ProgressStepBar: React.FC<ProgressStepBarProps> = ({ step }) => {
    const [currentStep, setCurrentStep] = useState(step);
    useEffect(() => {
        setCurrentStep(step);
    }, [step]);

    return (
        <div className="flex flex-col items-center px-4 mt-8 md:px-16 md:mt-16">

            <div className="w-full text-center">
                <div className="flex justify-center items-center mb-2">
                    {[1, 2, 3].map((step, index) => (
                        <React.Fragment key={step}>
                            <div className={`step w-8 h-8 rounded-full bg-white border-2 border-black ${currentStep >= step ? '!bg-greenButton border-4' : ''} relative transition-all duration-300 ease-in-out`}>
                                {currentStep === step && <div className="active-step-indicator" />}
                            </div>
                            {index < 2 && <div className="h-[2px] bg-black flex-grow mx-2" />}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-between w-full text-xs md:text-2xl font-bold text-center mt-4">
                <div>Informations</div>
                <div className='mt-2 md:mt-0 md:ml-10'>Réalisation de l'audit</div>
                <div className='mt-2 md:mt-0'>Rapport de l'audit</div>
            </div>
        </div>
    );
};

export default ProgressStepBar;
