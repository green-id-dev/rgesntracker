import React from 'react';
import GreyContainer from './GreyContainer.tsx';
import TitleBlocks from './TitleBlocks.tsx';

interface AuditorInformationFormProps {
    name: string;
    siteName: string;
    selectedSort: string;
    email: string;
    setName: (name: string) => void;
    setSiteName: (siteName: string) => void;
    setSelectedSort: (selectedSort: string) => void;
    setEmail: (email: string) => void;
}


const AuditorInformationForm: React.FC<AuditorInformationFormProps> = ({
                                                                           name,
                                                                           siteName,
                                                                           selectedSort,
                                                                           email,
                                                                           setName,
                                                                           setSiteName,
                                                                           setSelectedSort,
                                                                           setEmail
                                                                       }) => {


    const handleOnChange = (sortValue: string) => {
        setSelectedSort(sortValue);
    }

    return (
        <GreyContainer flexDirection="flex-col">
            <TitleBlocks text="Informations sur l’auditeur ou auditrice de l’audit"/>
            <div className="grid gap-4 mt-4 md:grid-cols-2">
                <div>
                    <label className="block text-gray-700 text-lg font-normal mb-2" htmlFor="site-url">
                        Nom et prénom (optionnel)
                    </label>
                    <input
                        className="appearance-none border-[1px] border-black rounded-2xl w-full p-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="site-url"
                        type="text"
                        placeholder="Saisir le nom et prénom"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <p className="text-sm text-gray-600 mt-2">Le nom et prénom sera affiché sur l’audit</p>
                </div>
                <div>
                    <label className="block text-gray-700 text-lg font-normal mb-2" htmlFor="site-name">
                        Nom de la structure (optionnel)
                    </label>
                    <input
                        className="appearance-none border-[1px] border-black rounded-2xl w-full p-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="site-name"
                        type="text"
                        placeholder="Saisir le nom de la structure"
                        value={siteName}
                        onChange={(e) => setSiteName(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid mt-8 gap-4 md:grid-cols-2">
                <div>
                    <label className="block text-gray-700 text-lg font-normal mb-2" htmlFor="site-url">
                        Adresse e-mail<label className='text-redStrong'> *</label>
                    </label>
                    <input
                        className="appearance-none border-[1px] border-black rounded-2xl w-full p-4 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="site-url"
                        type="text"
                        placeholder="Saisir l'adresse e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-sm text-gray-600 mt-2">L’adresse mail permettra de vous envoyer les liens de
                        l’audit</p>
                </div>
                <div className='flex flex-col gap-3'>
                    <p className="text-lg text-black font-semibold">Afficher l’adresse mail dans l’audit ?</p>
                    <label className="flex flex-wrap items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="oui"
                            checked={selectedSort === 'oui'}
                            onChange={() => handleOnChange('oui')}
                            className="h-4 w-4 border-gray-300 focus:ring-0"
                        />
                        <span className="ml-2">Non, je ne souhaite pas qu’elle soit affichée</span>
                    </label>
                    <label className="flex flex-wrap items-center">
                        <input
                            type="radio"
                            name="sort"
                            value="non"
                            checked={selectedSort === 'non'}
                            onChange={() => handleOnChange('non')}
                            className="h-4 w-4 border-gray-300 focus:ring-0"
                        />
                        <span className="ml-2">Oui, je souhaite qu’elle soit affichée</span>
                    </label>
                </div>
            </div>
        </GreyContainer>
    );
};

export default AuditorInformationForm;
