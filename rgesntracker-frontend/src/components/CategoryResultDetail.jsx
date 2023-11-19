import EvaluationQuestion from "./EvaluationQuestion";
import EvaluationResult from "./EvaluationResult";
import TitleBlocks from "./TitleBlocks";


const CategoryResultDetail = ({ category, criteres, criteresResult, state, description }) => {

    
    const totalFilterCritere = criteres.filter((critere) => criteresResult.some((c) => c.id === critere.id && (state === c.state)));
 



   
  return (
    <div className="">
        <h4 className="font-arial text-[24px] font-bold mt-8 mb-8">{description}</h4>
   
    <div className="flex flex-col bg-greyLight rounded-xl w-full p-8" >
      <div className="flex flex-row w-full">
        <TitleBlocks text={category} />
        <div className="ml-auto flex flex-row gap-8 items-center">
          <div className="bg-black px-4 py-3 border rounded-full">
            <h1 className="text-white font-arial font-bold text-lg">{totalFilterCritere.length} critères</h1>
          </div>

        </div>
      </div>
      {totalFilterCritere.map((critere, index) => (
                  <EvaluationResult key={index} id={critere.id} question={critere.critere} url={critere.url} critereResult={criteresResult} state={state} />

              ))}

    </div>
    </div>
  );
}

export default CategoryResultDetail;
