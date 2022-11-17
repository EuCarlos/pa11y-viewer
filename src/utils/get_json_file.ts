interface IEvent<T = any> {
    target: T;
}

export function getJSONFile(event: IEvent) {
    if (event.target.files.length > 0) {
        const src =  URL.createObjectURL(event.target.files[0])
        
        return src
    }

    return 'data:text/json;charset=utf-8,%5B%5D'
}
