import { $ } from "./selector.js"

const waitForElement = selector => new Promise((resolve, reject)=>{
    const interval = setInterval(()=>{
        if(!$(selector).element){
            clearInterval(interval)
            resolve()
        }
    }, 10)

    setTimeout(()=>{reject()}, 10000)
})

export default waitForElement