export default function debounce(func: Function, wait: number) {
    let timer: any;
    return function (...args : any) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(args);
        }, wait);
    }
}
