import { UID } from "./uid"

type SearchHistoryProps = {
    id: string
    value: string
}

const getSearchHistory = (): SearchHistoryProps[]  => {
    let getAllSearchHistory = JSON.parse(localStorage.getItem('search') || '[]')

    if (getAllSearchHistory == null) {
        return []
    }
      
    return getAllSearchHistory
}

const setSearchHistory = (value: string) => {
  	var shouldGetAllSearchHistory = getSearchHistory()
    const hasValue = shouldGetAllSearchHistory.find((item: SearchHistoryProps) => item.value == value)
        
    if (!hasValue) {
        shouldGetAllSearchHistory.push({id: UID(), value})
    }

    localStorage.setItem('search', JSON.stringify(shouldGetAllSearchHistory))
}

const removeSearchHistory = (id: string) => {
    var shouldGetAllSearchHistory = getSearchHistory()

    const removeSearchHistoryById = shouldGetAllSearchHistory.filter((obj: any) => obj.id !== id)

    localStorage.setItem('search', JSON.stringify(removeSearchHistoryById))
}

export { getSearchHistory, setSearchHistory, removeSearchHistory }