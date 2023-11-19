import { host } from "../utils/config";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import AuditMenu from "./AuditMenu.jsx";
import Category from "./Category.jsx";
import OrganisationResults from "./OrganisationResults.tsx";
import DashboardGauges from './DashboardGauges.tsx';
import ScrollContext from "./context/ScrollContext.tsx";

export default function Audit({criteres, audit, criteresResult, setCriteresResult, categories, setStep, setAudit}) {
  const [data, setData] = useState({});

  const [filters, setFilters] = useState(["Tous"]);
  const [sortFilter, setSortFilter] = useState("parNumero");

  const handleFilterChange = (values) => {
    console.log(values);
    setFilters(values);
  };

  const handleSortChange = (value) => {
    setSortFilter(value);
  };



  const approved = criteresResult.filter((critere) => critere.state === "APPROVED");
  const rejected = criteresResult.filter((critere) => critere.state === "REJECTED");
  const notApplicable = criteresResult.filter((critere) => critere.state === "NOT_APPLICABLE");


  const [categoryRefs, setCategoryRefs] = useState({});

  const registerRef = useCallback((categoryName, ref) => {
    setCategoryRefs((prevRefs) => ({
      ...prevRefs,
      [categoryName]: ref
    }));
  }, []);

  const scrollToCategory = useCallback((categoryName) => {
    categoryRefs[categoryName]?.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [categoryRefs]);

  const [openCategory, setOpenCategory] = useState(null);

  const handleScrollToCategory = (categoryName) => {
    setOpenCategory(categoryName);
  };

  const percents = (criteresResult.length / criteres.length * 100).toFixed(0);

  const updatedAt = new Date(audit.updatedAt);
  const hours = updatedAt.getHours();
  const minutes = updatedAt.getMinutes();
  const updatedAtString = `${hours}h${minutes}`;




  const saveAudit = async () => {
    const body = criteresResult;
    try {
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : undefined,
      };
      const response = await fetch(host + "audit/" + audit.token, options);
      const data = await response.json();
      console.log(data)
      setAudit(data);
    }
    catch (error) {
      console.error("Failed to fetch data:", error);
      throw error;
    }
  }
  

  const validate = async () => {
    if (isFinish){
      saveAudit();
      setStep(3);
    }

  }

  const save = async () => {
    alert("L'audit a été sauvegardé");
    saveAudit();
  }
  
  const isFinish = criteresResult.length === criteres.length;


  return (
    <ScrollContext.Provider value={{ scrollToCategory, registerRef }}>


      <AuditMenu percents={percents} criteres={categories} date={new Date().toLocaleDateString(audit.updatedat)} hours={updatedAtString} url={audit.url} saveAudit={save} onCategoryClick={handleScrollToCategory} validate={validate} />

      <DashboardGauges approved={approved.length} rejected={rejected.length} notApplicable={notApplicable.length} maxValue={criteres.length} globalRate={0}></DashboardGauges>
      <OrganisationResults values={filters} onChange={handleFilterChange} criteres={criteres} criteresFilled={criteresResult} onSortChange={handleSortChange}/>
      <div className="mt-8 gap-8 flex flex-col">
        {categories.map((category, index) => (
          <Category key={index}
            category={category}
            open={openCategory === category}
            registerRef={registerRef}
              criteres={criteres.filter((c) => c.thematique === category)}
            criteresResult={criteresResult}
            setCriteresResult={setCriteresResult}
            setOpenCategory={setOpenCategory}
            filters={filters}
            sortFilter={sortFilter}
          />
        ))
        }
      </div>
    </ScrollContext.Provider>
  );
}