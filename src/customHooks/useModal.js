import { useState, useMemo } from 'react'

function useModal() {
    const [modalState, setModalState] = useState('hide');
    const [modalMessage, setModalMessage] = useState('');
    const [modalTitle, setModalTitle] = useState('');

    const handlers = useMemo(
        () => ({
            show: () => {
                setModalState('show');
            },
            hide: () => {
                setModalState('hide');
            },
            toggle: () => {
                setModalState(s => (s === 'show' ? 'hide' : 'show'));
            },
            changeModalMessage: (message) => {
                setModalMessage(message);
            },
            changeModalTitle: (message) => {
                setModalTitle(message);
            },
        }),
        []
    );

    return [modalState, modalTitle, modalMessage, handlers];
}

export default useModal;
