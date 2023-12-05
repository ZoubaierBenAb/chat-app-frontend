const path = (root,route)=> {
    return `${root}${route}`
}


export const DEFAULT_PATH = {
    general : {
        app : path('/','app')
    }
}

export const BASE_URL = 'http://localhost:5000'