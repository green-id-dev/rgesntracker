import React, {useEffect, useState} from 'react';
import Audit from './Audit';
import FirstStep from './FirstStep.jsx';
import ProgressStepBar from './ProgressStepBar.tsx';
import Result from './Result';

const StepManager = ({audits = null}) => {
    const [audit, setAudit] = useState(audits);
    const [data, setData] = useState({});
    const [criteres, setCriteres] = useState([]);
    const [criteresResult, setCriteresResult] = useState(audits ? audits.criteria : []);
    const [step, setStep] = useState(1);
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        if (criteres.length === criteresResult.length && criteresResult.length !== 0) {
            setStep(3);
        }
    }, [criteresResult]);

    const fetchData = async () => {
        try {
            const response = await fetch(
                "https://ecoresponsable.numerique.gouv.fr/publications/referentiel-general-ecoconception/export/referentiel-general-ecoconception-version-v1.json"
            );
            const jsonData = await response.json();
            setData(jsonData);
            const uniqueCategories = [...new Set(jsonData.criteres.map((c) => c.thematique))];
            setCategories(uniqueCategories);
            setCriteres(jsonData.criteres.map((c) => {
                return {id: c.id, url: c.url, critere: c.critere, thematique: c.thematique}
            }));

            let localAudit;
            const auditData = localStorage.getItem("audit");

            if (auditData) {
                try {
                    localAudit = JSON.parse(auditData);
                } catch (e) {
                    console.error("Erreur lors du parsing de JSON:", e);
                    localAudit = null;
                }
            } else {
                localAudit = null;
            }

            if (localAudit) {
                setAudit(localAudit);
                setCriteresResult(localAudit.criteria);
                setStep(2);
            }
            if (audits) {
                setAudit(audits);
                setCriteresResult(audits.criteria);
                setStep(2);
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <ProgressStepBar step={step}></ProgressStepBar>
            {step === 1 && <FirstStep setStep={setStep} setAudit={setAudit} setCriteresResult={setCriteresResult}/>}
            {step === 2 && <Audit criteres={criteres} audit={audit} criteresResult={criteresResult}
                                  setCriteresResult={setCriteresResult} categories={categories} setStep={setStep}
                                  setAudit={setAudit}/>}
            {step === 3 && <Result criteres={criteres} audit={audit} criteresResult={criteresResult}
                                   categories={categories}></Result>
            }

        </div>
    )
}

export default StepManager;