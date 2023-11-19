import React, { useState } from 'react';
import GreyContainer from './GreyContainer.tsx';
import TitleBlocks from './TitleBlocks.tsx';

interface SiteInformationFormProps {
    url: string;
    siteName: string;
    setUrl: (url: string) => void;
    setSiteName: (siteName: string) => void;
}

const SiteInformationForm: React.FC<SiteInformationFormProps> = ({ url, siteName, setUrl, setSiteName }) => {


    return (
        <GreyContainer>
            <TitleBlocks text="Informations sur le site à auditer" />
            <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div>
                    <label className="block text-gray-700  text-lg font-normal mb-2" htmlFor="site-url">
                        URL du site à auditer<label className='text-redStrong'> *</label> 
                    </label>
                    <input
                        className="appearance-none border-[1px] border-black rounded-2xl w-full p-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="site-url"
                        type="text"
                        placeholder="Saisir l'URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <p className="text-sm text-gray-600 mt-2">L'URL de la page doit commencer par https://</p>
                </div>
                <div>
                    <label className="block text-gray-700 text-lg font-normal mb-2" htmlFor="site-name">
                        Nom du site à auditer<label className='text-redStrong'> *</label> 
                    </label>
                    <input
                        className="appearance-none border-[1px] border-black rounded-2xl w-full p-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="site-name"
                        type="text"
                        placeholder="Saisir le nom"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                    />
                </div>
            </div>
        </GreyContainer>
    );
};

export default SiteInformationForm;
