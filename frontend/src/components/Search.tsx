import {ChangeEvent, SyntheticEvent} from "react";

interface Props {
    handleOnClick: (e: SyntheticEvent) => void;
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    searchText: string | undefined;
}
const Search = ({ handleOnClick, handleOnChange, searchText }: Props) => {

    return (
        <div className={"space-x-4"}>
            <input className={"border-2 border-solid border-black"} type={"text"} value={searchText} onChange={(e) => handleOnChange(e)} />
            <button className={"bg-gray-500"} onClick={(e) => handleOnClick(e)}>Search</button>
        </div>
    )
}
export default Search
