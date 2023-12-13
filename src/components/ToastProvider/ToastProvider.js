import React, {useCallback} from 'react';
import useKeyDown from '../../hooks'

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
    const [toasts, setToasts] = React.useState([]);

    const handleEscape = useCallback(() => {
        setToasts([])
    }, []);

    useKeyDown('Escape', handleEscape);

    const createToast = (message, variant) => {
        const updatedToasts = [...toasts];

        updatedToasts.push({
            id: crypto.randomUUID(),
            variant,
            message
        });

        setToasts(updatedToasts);
    };

    const closeToast = (id) => {
        const updatedToasts = toasts.filter((toast) => toast.id !== id);
        setToasts(updatedToasts);
    };

    return (
        <ToastContext.Provider value={{
            toasts,
            createToast,
            setToasts,
            closeToast
        }}>
            {children}
        </ToastContext.Provider>
    );
}

export default ToastProvider;