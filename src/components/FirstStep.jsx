import SiteInformationForm from "./SiteInformationForm.tsx";
import AuditorInformationForm from "./AuditorInformationForm.tsx";
import Button from "./Button.tsx";
import {useState} from "react";
import {host} from "../utils/config";


const FirstStep = ({setStep, setAudit, setCriteresResult}) => {
    const [url, setUrl] = useState('');
    const [siteName, setSiteName] = useState('');
    const [nameAuditor, setNameAuditor] = useState('');
    const [siteNameAuditor, setSiteNameAuditor] = useState('');
    const [selectedSort, setSelectedSort] = useState('oui');
    const [email, setEmail] = useState('');


    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    const postAudit = async () => {

        if (
            !url ||
            !siteName ||
            !email
        ) {
            alert("Veuillez remplir tous les champs");
            return;
        }
        if (!isValidEmail(email)) {
            alert("Veuillez entrer un email valide");
            return;
        }

        const body = {
            siteName: siteName,
            url: url,
            nameAuditor: nameAuditor,
            structureName: siteNameAuditor,
            emailAuditor: email,
            renderEmail: selectedSort === "non" ? true : false,
        };


        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: body ? JSON.stringify(body) : undefined,
            };
            const response = await fetch(host + "audit/", options);
            const data = await response.json();

            setAudit(data);
            localStorage.setItem("audit", JSON.stringify(data));
            alert("Un email vous a été envoyé avec un lien de sauvegarde de l'audit")
            setStep(2);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            throw error;
        }
    };
    return (
        <div className="w-full flex flex-col">
            <SiteInformationForm url={url} setUrl={setUrl} siteName={siteName}
                                 setSiteName={setSiteName}></SiteInformationForm>
            <AuditorInformationForm name={nameAuditor} setName={setNameAuditor} siteName={siteNameAuditor}
                                    setSiteName={setSiteNameAuditor} selectedSort={selectedSort}
                                    setSelectedSort={setSelectedSort} email={email}
                                    setEmail={setEmail}></AuditorInformationForm>
            <div className="mx-auto flex w-full mb-8">
                <Button onClick={postAudit}>Commencer l'audit →</Button>
            </div>


        </div>
    )
}

export default FirstStep;