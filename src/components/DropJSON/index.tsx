import axios from "axios";
import { getJSONFile } from "../../utils/get_json_file";

type S = any

export function DropJSON({ setJsonReports }: React.SetStateAction<S>) {
    const handleJsonReports = (url:string) => {
        axios.get(url)
            .then(res => setJsonReports(res.data))
            .catch(() => setJsonReports([])) 
      }

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => handleJsonReports(`${getJSONFile(e)}`)

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