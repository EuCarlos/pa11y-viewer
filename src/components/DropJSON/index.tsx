import { getJSONFile } from "../../utils/get_json_file";

export function DropJSON() {
    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => location.href = `/?url=${getJSONFile(e)}`

    return <div>
        <input 
            type="file"
            id="json-preview"
            accept=".json,application/json"
            onChange={ (e) => handleFilesChange(e) }
        ></input>
        {/* <div>drop your .json files here!</div> */}
    </div>
}