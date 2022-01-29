const debounce=function(fn,delay=500){
    // console.log(this)
    let timer = null
    return function(...arg){
        timer && clearTimeout(timer)
        timer = setTimeout(() => {
            this[fn](...arg)
        }, delay);
    }
}
export default debounce