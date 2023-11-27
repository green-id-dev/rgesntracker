import Button from "./Button";
import TitleBlocks from "./TitleBlocks";
import DashboardGauges from "./DashboardGauges";
import CategoryResult from "./CategoryResult";
import React from "react";


const Result = ({criteres, audit, criteresResult, categories}) => {


    const approved = criteresResult.filter((critere) => critere.state === "APPROVED");
    const rejected = criteresResult.filter((critere) => critere.state === "REJECTED");
    const notApplicable = criteresResult.filter((critere) => critere.state === "NOT_APPLICABLE");
    const global = ((approved.length / (criteres.length - notApplicable.length)) * 100).toFixed(0);
    const handleDownloadPDF = () => {
        var element = document.getElementById('result');
        html2pdf(element);

    };

    const formatUrl = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };


    return (
        <div className="p-4 md:p-8 my-8 w-full" id="result">
            <div className="flex flex-col md:flex-row justify-between self-center w-full">
                <h1 className="font-arial self-center font-semibold text-2xl md:text-4xl">Résultats de l’audit</h1>
                <div onClick={handleDownloadPDF} className="ml-auto mt-4 md:mt-0">
                    <Button text="Télécharger le rapport complet en PDF"/>
                </div>
            </div>
            <div className="flex mt-10 flex-col">
                <TitleBlocks text="Informations de l’audit"></TitleBlocks>
                <div className="flex mt-4 flex-row">
                    <p className="text-black text-lg font-normal">URL du site:</p>
                    <a href={formatUrl(audit.url)} target="_blank" rel="noopener noreferrer"
                       className="font-arial font-semibold text-lg underline ml-2">
                        {audit.url}
                    </a>
                    <img src="/link.svg" className="w-4 h-4 ml-1 my-auto"/>
                </div>
                <div className="flex flex-row">
                    <p className="text-black text-lg font-normal">Audit commencé le:</p>
                    <a href='/home'
                       className="font-arial font-semibold text-lg ml-1">{new Date().toLocaleDateString(audit.updatedat)}</a>
                </div>
                {
                    audit.nameAuditor && (
                        <div className="flex flex-row">
                            <p className="text-black text-lg font-normal">Réalisé par:</p>
                            <a href='/home' className="font-arial font-semibold text-lg ml-1">{audit.nameAuditor}</a>
                        </div>)
                }
            </div>
            <DashboardGauges approved={approved.length} rejected={rejected.length} notApplicable={notApplicable.length}
                             maxValue={criteres.length} globalRate={global}></DashboardGauges>
            <div className="mt-4 md:mt-8 gap-4 md:gap-8 flex flex-col">
                {categories.map((category, index) => (
                    <CategoryResult key={index}
                                    category={category}
                                    criteres={criteres.filter((c) => c.thematique === category)}
                                    criteresResult={criteresResult}
                    />
                ))
                }
            </div>
        </div>
    )
}

export default Result;