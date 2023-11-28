import Button from "./Button";
import TitleBlocks from "./TitleBlocks";
import DashboardGauges from "./DashboardGauges";
import CategoryResult from "./CategoryResult";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {useState} from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Result = ({criteres, audit, criteresResult, categories}) => {

    const approved = criteresResult.filter((critere) => critere.state === "APPROVED");
    const rejected = criteresResult.filter((critere) => critere.state === "REJECTED");
    const notApplicable = criteresResult.filter((critere) => critere.state === "NOT_APPLICABLE");
    const global = ((approved.length / (criteres.length - notApplicable.length)) * 100).toFixed(0);
    const [isLoading, setIsLoading] = useState(false); // Ajout de l'état pour le loader


    const handleDownloadPDF = async () => {
    setIsLoading(true); 
    const pdf = new jsPDF('p', 'mm', 'a4');
    const sections = document.querySelectorAll('.pdf-section');

    for (const [index, section] of sections.entries()) {
        const canvas = await html2canvas(section, {
        scale: 0.5, // Réduire la résolution de l'image
        useCORS: true,
        logging: true,
        letterRendering: 1,
        allowTaint: false
        });
        
        // Réduire la qualité de l'image (1 étant la meilleure qualité et 0 étant la pire)
        const imgData = canvas.toDataURL('image/jpeg', 0.75);

        const imgWidth = 190; // Largeur de l'image dans le PDF
        const pageHeight = pdf.internal.pageSize.height;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > pageHeight) {
        imgHeight = pageHeight - 20; // Ajouter une marge en bas si nécessaire
        }

        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight); // 10 mm de marges sur les côtés
        pdf.addPage();
        pdf.setFontSize(10);
        pdf.setTextColor(150);
        const pageNumber = `Page ${index + 1} sur ${sections.length}`;
        pdf.text(pageNumber, pdf.internal.pageSize.width / 2, pdf.internal.pageSize.height - 10, {
            align: 'center',
        });
    }

    // Supprimer la dernière page ajoutée inutilement
    const numberOfPages = pdf.internal.getNumberOfPages();
    if (numberOfPages > sections.length) {
        pdf.deletePage(numberOfPages);
    }

    setIsLoading(false); // Désactiver le loader après la génération du PDF
    pdf.save('result.pdf');
    };

    const formatUrl = (url) => {
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return `https://${url}`;
        }
        return url;
    };


    return (
        <>
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <ClipLoader color="#00BFFF" size={150}  aria-label="Loading Spinner" data-testid="loader"/>
                </div>
            )}
            <div className="p-4 md:p-8 my-8 w-full" id="result">
                <div className="pdf-section">
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
                            <img src="/link.svg" className="w-4 h-4 ml-1 my-auto" loading="lazy"/>
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
                </div>
                <div className="mt-4 md:mt-8 gap-4 md:gap-8 flex flex-col">
                    {categories.map((category, index) => (
                        <div className="pdf-section">
                            <CategoryResult key={index}
                                            category={category}
                                            criteres={criteres.filter((c) => c.thematique === category)}
                                            criteresResult={criteresResult}
                            />
                        </div>
                    ))
                    }
                </div>
            </div>

        </>
    )
}

export default Result;