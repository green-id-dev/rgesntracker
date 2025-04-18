import Filter from "./Filter.tsx";
import Sort from "./Sort.tsx";

interface FilterProps {
    values: string[];
    onChange: (newValues: string[]) => void;
    criteres: { id: string; state: string }[];
    criteresFilled: { id: string; state: string }[];
    onSortChange: (newSort: string) => void;
}


const OrganisationResults: React.FC<FilterProps> = ({values, onChange, criteres, criteresFilled, onSortChange}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-stretch">
            <div className="col-span-1 md:col-span-3 h-full">
                <Filter values={values} onChange={onChange} criteres={criteres} criteresFilled={criteresFilled}/>
            </div>
            <div className="col-span-1 h-full">
                <Sort onSortChange={onSortChange}/>
            </div>
        </div>
    )
}

export default OrganisationResults;