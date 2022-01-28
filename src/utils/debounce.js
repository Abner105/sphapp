const debounce=function(fn,delay){
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