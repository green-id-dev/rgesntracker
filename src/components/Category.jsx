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
    const [justChanged, setJustChanged] = useState(false);
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


    const totalFilterCritere = criteres.filter((critere) => {
        const isTous = filters.includes("Tous");
        const isNotEvaluated = filters.includes("NOT_EVALUATED") && !criteresResult.some((c) => c.id === critere.id);
        const isStateMatch = criteresResult.some(
            (c) => c.id === critere.id && filters.includes(c.state)
        );

        const mapDiff = { "Faible": "FAIBLE", "Moyen": "MOYEN", "Fort": "FORT" };
        const mapPrio = { "Modéré": "MODERE", "Recommandé": "RECOMMANDE", "Prioritaire": "PRIORITAIRE" };

        const matchDifficulte = Object.entries(mapDiff).some(
            ([label, value]) => filters.includes(value) && critere.difficulte === label
        );

        const matchPriorite = Object.entries(mapPrio).some(
            ([label, value]) => filters.includes(value) && critere.priorite === label
        );

        return isTous || isNotEvaluated || isStateMatch || matchDifficulte || matchPriorite;
    });
    if (!justChanged) {
        if (sortFilter === "parNumero") {
                totalFilterCritere.sort((a, b) => {
                    const aId = a.id.split(".").map((s) => parseInt(s));
                    const bId = b.id.split(".").map((s) => parseInt(s));
                    for (let i = 0; i < Math.min(aId.length, bId.length); i++) {
                        if (aId[i] !== bId[i]) return aId[i] - bId[i];
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
            } else if (sortFilter === "parDifficulte") {
                const order = { "Faible": 0, "Moyen": 1, "Fort": 2 };
                totalFilterCritere.sort((a, b) => {
                    const aDiff = order[a.difficulte] ?? 99;
                    const bDiff = order[b.difficulte] ?? 99;
                    return aDiff - bDiff;
            });
            } else if (sortFilter === "parPriorite") {
                const order = { "Prioritaire": 0, "Modéré": 1, "Recommandé": 2 };
                totalFilterCritere.sort((a, b) => {
                    const aPrio = order[a.priorite] ?? 99;
                    const bPrio = order[b.priorite] ?? 99;
                    return aPrio - bPrio;
            });
        }
    }

    const handleOnChange = (id, value) => {
    setJustChanged(true);
    setTimeout(() => setJustChanged(false), 500);
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
                            <img src="/minus.svg" className="w-6 h-6" alt="Collapse" loading="lazy"/>
                        ) : (
                            <img src="/plus.svg" className="w-6 h-6" alt="Expand" loading="lazy"/>
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
                        {justChanged && (
                          <div className="flex items-center justify-center mb-4 text-sm text-gray-500 animate-pulse">
                            Mise à jour du tri...
                          </div>
                        )}
                        {totalFilterCritere.map((critere, index) => (
                            <EvaluationQuestion
                                key={index}
                                critere={critere}
                                onChange={handleOnChange}
                                critereResult={criteresResult}
                            />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default Category;