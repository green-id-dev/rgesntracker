import CategoryResultDetail from "./CategoryResultDetail";

const CategoryResult = ({category, criteres, criteresResult}) => {
    return (
        <div className="flex flex-col w-full">
            <div className="w-full bg-black rounded-xl text-center py-6 mb-8">
                <h3 className="font-arial text-white text-[42px] font-bold mx-auto">Résultat du critère
                    "{category}"</h3>
            </div>
            <div className="gap-8">
                <CategoryResultDetail category={category} criteres={criteres.filter((c) => c.thematique === category)}
                                      criteresResult={criteresResult} state="REJECTED"
                                      description={"Les critères " + category + " non conformes"}/>
                <CategoryResultDetail category={category} criteres={criteres.filter((c) => c.thematique === category)}
                                      criteresResult={criteresResult} state="APPROVED"
                                      description={"Les critères " + category + " conformes"}/>
                <CategoryResultDetail category={category} criteres={criteres.filter((c) => c.thematique === category)}
                                      criteresResult={criteresResult} state="IN_PROGRESS"
                                      description={"Les critères " + category + " en cours de déploiement"}/>
                <CategoryResultDetail category={category} criteres={criteres.filter((c) => c.thematique === category)}
                                      criteresResult={criteresResult} state="NOT_APPLICABLE"
                                      description={"Les critères " + category + " non applicable"}/>
            </div>
        </div>
    );
}

export default CategoryResult;