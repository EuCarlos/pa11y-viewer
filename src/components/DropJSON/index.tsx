import axios from "axios"
import { getJSONFile } from "../../utils/get_json_file"
import '../../styles/drag_n_drop.sass'

type S = any

export function DropJSON({ setJsonReports, setToggleDragNDrop }: React.SetStateAction<S>) {
    const handleJsonReports = (url:string) => {
        axios.get(url)
            .then(res => setJsonReports(res.data))
            .catch(() => setJsonReports([])) 

        setToggleDragNDrop(false)
      }

    const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => handleJsonReports(`${getJSONFile(e)}`)

    return <div className="drag-n-drop">
        <label className="dragable-area" htmlFor="json-file">
            <input 
                type="file"
                id="json-file"
                accept=".json,application/json"
                onChange={(e) => handleFilesChange(e)}
            ></input>
            <img src="/assets/json-file.svg" width={70} alt="JSON icon" />
            <p><span className="upload-button">Click to upload</span> or drop your .json files here!</p>
        </label>
    </div>
}