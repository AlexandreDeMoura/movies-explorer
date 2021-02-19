export const createArrayOfN = n => {
    const newArray: string[] = []
    for (let i = 0; i < n; i++) {
        newArray.push('')
    }
    return newArray
}