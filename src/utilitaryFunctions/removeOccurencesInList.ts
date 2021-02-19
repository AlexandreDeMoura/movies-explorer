export const removeOccurencesInList = (list: []) => {
    const filteredList = []
    list.forEach(element => {
        if (!filteredList.includes(element)) {
            filteredList.push(element)
        }
    })
    return filteredList
}