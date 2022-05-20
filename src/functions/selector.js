export const $ = (selector, node=document) => node.querySelector(selector)
export const $$ = (selector, node=document) => [...node.querySelectorAll(selector)]
export const $x = (xpath, node=document) =>{
    const collection = document.evaluate(xpath, node, null, XPathResult.ANY_TYPE, null)
    let result = collection.iterateNext()
    const elements  = []

    while(result){
        elements.push(result)
        result = collection.iterateNext()
    } 
    return elements
}