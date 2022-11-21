import axios from "axios"
import { ChangeEvent, SetStateAction } from "react"
import { getJSONFile } from "../../utils/get_json_file"

import '../../styles/drag_n_drop.sass'

type S = any

export function DragAndDropContainer({ setJSONReports, setIsDragged }: SetStateAction<S>) {
    const handleJSONReports = (url:string) => {
        axios
            .get(url)
                .then(res => setJSONReports(res.data))
                .catch(() => setJSONReports([])) 

        setIsDragged(false)
      }

    const handleFilesChange = (e: ChangeEvent<HTMLInputElement>) => handleJSONReports(`${getJSONFile(e)}`)

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