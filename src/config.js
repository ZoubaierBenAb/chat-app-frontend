const path = (root,route)=> {
    return `${root}${route}`
}


export const DEFAULT_PATH = {
    general : {
        app : path('/','app')
    }
}