const autoscrolling = pixels => new Promise((resolve, reject)=>{
    let pixelstoScroll = pixels;

    console.log(pixelstoScroll)

    const idInterval = setInterval(()=>{
        window.scrollTo(0,pixelstoScroll)
        pixelstoScroll+=pixels;

        if(pixelstoScroll>document.body.scrollHeight) {
            clearInterval(idInterval);
            resolve(true);
        }
    }, 100)

})

export default autoscrolling