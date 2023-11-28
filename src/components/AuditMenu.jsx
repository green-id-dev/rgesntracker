import React, {useContext} from 'react';
import GreyContainer from '../components/GreyContainer';
import TitleBlocks from '../components/TitleBlocks';
import ScrollContext from './context/ScrollContext';

export default function AuditMenu({
                                      percents,
                                      criteres,
                                      date = new Date().toLocaleDateString(),
                                      hours = "",
                                      saveAudit,
                                      validate,
                                      url = "",
                                      onCategoryClick,
                                      isFinish
                                  }) {
    const {scrollToCategory} = useContext(ScrollContext);

    const handleClick = (critere) => {
        scrollToCategory(critere);
        onCategoryClick(critere);
    }

    const formatUrl = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };


    return (
        <GreyContainer flexDirection="flex-col md:flex-row">
            <div className="flex flex-col w-full md:w-1/2">
                <TitleBlocks text="Les critères"/>
                <div className="mt-4">
                    {criteres.map((critere, index) => (
                        <div className="flex flex-row" key={index}>
                            <p className="text-lg !leading-5">{index + 1}.</p>
                            <button
                                className="text-lg ml-2 underline !leading-5 mb-3"
                                onClick={() => handleClick(critere)}
                            >
                                {critere}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col w-full md:w-1/2 mt-8 md:mt-0">
                <div className="flex mb-4 flex-row">
                    <TitleBlocks text="Progression de l’audit"/>
                    <p className='text-2xl ml-auto'>{percents}%</p>
                </div>
                <div className="progress-bar-container bg-white h-6 border border-black rounded-3xl">
                    <div className="progress-bar bg-[#00BF7D] h-full border rounded-3xl"
                         style={{width: `${percents}%`}}></div>
                </div>
                <div className="flex flex-col md:flex-row gap-8 mt-8">
                    <div className="flex flex-col gap-4">
                        <div className="border-2 rounded-xl border-black hover:cursor-pointer" onClick={saveAudit}>
                            <h1 className="font-arial text-lg px-8 py-4 font-bold">Forcer une sauvegarde</h1>
                        </div>
                        <div
                            className={"border-2 border-black rounded-xl " + (isFinish ? "hover:cursor-pointer bg-[#90D8B2] hover:bg-[#00BF7D] " : "bg-greyBg")}
                            onClick={validate}>
                            <h1 className={"font-arial text-lg px-8 text-black z-10 py-4 font-bold text-center " + (isFinish ? " opacity-100" : "text-black")}>Valider
                                l'audit</h1>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 mt-6 md:mt-0">
                        <h1 className="font-arial text-base font-bold my-auto">Dernière sauvegarde
                            le {date} à {hours}</h1>
                        <h1 className="font-arial text-base font-bold my-auto">Validation possible à la fin de
                            l’audit</h1>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row ml-auto mt-6 md:mt-auto">
                    <h1 className="font-arial text-lg">Site à auditer: </h1>
                    <a href={formatUrl(url)} target="_blank" rel="noopener noreferrer"
                       className="font-arial text-lg underline ml-2">
                        {url}
                    </a>
                    <img src="/link.svg" className="w-4 h-4 ml-2 my-auto" loading="lazy" alt="Open the link in a new tab"/>
                </div>
            </div>
        </GreyContainer>
    );
}
