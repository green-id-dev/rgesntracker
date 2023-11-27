import React, {useContext, useEffect, useMemo, useRef, useState} from "react";
import EvaluationQuestion from "./EvaluationQuestion.tsx";
import TitleBlocks from "./TitleBlocks.tsx";
import {AnimatePresence, motion} from 'framer-motion';
import ScrollContext from "./context/ScrollContext.tsx";


const Category = ({
                      category,
                      criteres,
                      criteresResult,
                      setCriteresResult,
                      open,
                      setOpenCategory,
                      filters,
                      sortFilter
                  }) => {
    const [renderCriteres, setRenderCriteres] = useState(false);
    const categoryRef = useRef(null);
    const {registerRef} = useContext(ScrollContext);

    useEffect(() => {
        registerRef(category, categoryRef);
    }, [category, registerRef]);

    if (open && !renderCriteres) {
        categoryRef.current?.scrollIntoView({behavior: "smooth", block: "start"});
        setTimeout(() => setRenderCriteres(true), 1000);
        setTimeout(() => setOpenCategory(null), 1000);
    }

    const critetesCategoryResult = useMemo(() => {
        return criteresResult.filter((critere) => criteres.some((c) => c.id === critere.id));
    }, [criteres, criteresResult]);

    const updateLocalStorage = (newCriteresResult) => {
        localStorage.setItem("audit", JSON.stringify(newCriteresResult));
    };


    const filterCriteres = criteres.filter((critere) => criteresResult.some((c) => c.id === critere.id && (filters.includes(c.state) || filters.includes("Tous"))));
    const totalFilterCritere = criteres.filter((critere) => (filters.includes("Tous")) || (filters.includes("NOT_EVALUATED") && !criteresResult.some((c) => critere.id === c.id)) || (filterCriteres.some((c) => c.id === critere.id)));
    if (sortFilter === "parNumero") {
        totalFilterCritere.sort((a, b) => {
            const aId = a.id.split(".").map((s) => parseInt(s));
            const bId = b.id.split(".").map((s) => parseInt(s));
            for (let i = 0; i < Math.min(aId.length, bId.length); i++) {
                if (aId[i] !== bId[i]) {
                    return aId[i] - bId[i];
                }
            }
            return aId.length - bId.length;
        });
    } else if (sortFilter === "plusConforme") {
        totalFilterCritere.sort((a, b) => {
            const aCritere = critetesCategoryResult.find((c) => c.id === a.id);
            const bCritere = critetesCategoryResult.find((c) => c.id === b.id);
            const stateOrder = ["APPROVED", "IN_PROGRESS", "REJECTED", "NOT_APPLICABLE"];
            const aStateIndex = aCritere ? stateOrder.indexOf(aCritere.state) : stateOrder.length;
            const bStateIndex = bCritere ? stateOrder.indexOf(bCritere.state) : stateOrder.length;
            return aStateIndex - bStateIndex;
        });
    } else if (sortFilter === "moinsConforme") {
        totalFilterCritere.sort((a, b) => {
            const aCritere = critetesCategoryResult.find((c) => c.id === a.id);
            const bCritere = critetesCategoryResult.find((c) => c.id === b.id);
            const stateOrder = ["REJECTED", "IN_PROGRESS", "APPROVED", "NOT_APPLICABLE"];
            const aStateIndex = aCritere ? stateOrder.indexOf(aCritere.state) : stateOrder.length;
            const bStateIndex = bCritere ? stateOrder.indexOf(bCritere.state) : stateOrder.length;
            return aStateIndex - bStateIndex;
        });
    }


    const handleOnChange = (id, value) => {
        let newCriteresResult;
        const index = criteresResult.findIndex((c) => c.id === id);
        if (index === -1) {
            newCriteresResult = criteresResult.concat({
                id: id,
                state: value,
            });
            setCriteresResult(newCriteresResult);
        } else {
            newCriteresResult = criteresResult.map((c) =>
                c.id === id ? {...c, state: value} : c
            );
            setCriteresResult(newCriteresResult);
        }

        let localAudit;
        const auditData = localStorage.getItem("audit");

        if (auditData) {
            try {
                localAudit = JSON.parse(auditData);
                localAudit.criteria = newCriteresResult;
                updateLocalStorage(localAudit);
            } catch (e) {
                console.error("Erreur lors du parsing de JSON:", e);
                localAudit = null;
            }
        } else {
            localAudit = null;
        }
    }

    return (
        <div className="flex flex-col bg-greyLight rounded-xl w-full p-4 md:p-8" ref={categoryRef}>
            <div className="flex flex-col md:flex-row w-full">
                <TitleBlocks text={category}/>
                <div className="ml-auto flex flex-col md:flex-row gap-4 items-center mt-4 md:mt-0">
                    <div className="bg-black px-2 md:px-4 py-2 md:py-3 border rounded-full">
                        <h1 className="text-white font-arial font-bold text-sm md:text-lg">
                            {critetesCategoryResult.length}/{criteres.length} critères évalués
                        </h1>
                    </div>
                    <button onClick={() => setRenderCriteres(!renderCriteres)} className="self-center">
                        {renderCriteres ? (
                            <img src="/minus.svg" className="w-6 h-6" alt="Collapse"/>
                        ) : (
                            <img src="/plus.svg" className="w-6 h-6" alt="Expand"/>
                        )}
                    </button>
                </div>
            </div>
            <AnimatePresence>
                {renderCriteres && (
                    <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: {opacity: 1, height: "auto"},
                            collapsed: {opacity: 0, height: 0}
                        }}
                        transition={{duration: 0.5}}
                        className="flex flex-col overflow-hidden"
                    >
                        {totalFilterCritere.map((critere, index) => (
                            <EvaluationQuestion key={index} id={critere.id} question={critere.critere} url={critere.url}
                                                onChange={handleOnChange} critereResult={criteresResult}/>

                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Category;