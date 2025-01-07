import {ChangeEvent, SyntheticEvent} from "react";

interface Props {
    handleOnClick: (e: SyntheticEvent) => void;
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchText: string | undefined;
}
const Search = ({ handleOnClick, handleOnChange, searchText }: Props) => {

    return (
        <div className={"flex space-x-5 p-2"}>
            <input className={"p-2 flex-grow"} type={"text"} value={searchText} onChange={(e) => handleOnChange(e)} />
            <button className={"flex-shrink bg-green-700 text-white text-2xl p-1 hover:bg-green-800"} onClick={(e) => handleOnClick(e)}>Search</button>
        </div>
    )
}
export default Search
