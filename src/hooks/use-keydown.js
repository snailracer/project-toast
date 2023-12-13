import {useEffect} from "react";

const useKeyDown = (key, callBack) => {

    useEffect(() => {
        const keyHandler = (event) => {
            if(event.code === key){
                callBack(event);
            }
        }
        window.addEventListener('keydown', (e) => {
            keyHandler(e);
        });

        return () => {
            window.removeEventListener('keydown', keyHandler);
        }
    }, [key, callBack])
}

export default useKeyDown