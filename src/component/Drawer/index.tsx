import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom';
interface DrawerProps {
    open?: boolean;
    placement?: 'top' | 'bottom';
    onOpen?: () => void;
    onClose?: () => void;
    children?: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = (props) => {
    const { open = false, onClose, placement = 'bottom', children } = props

    const [showContent, setShowContent] = useState<boolean>(false)

    const handleClose = () => {
        setShowContent(false)
    }

    const baseClass = {
        top: `transition-[top] rounded-b-3xl border-b-2 border-b-sky-500`,
        bottom: `transition-[bottom] rounded-t-3xl border-t-2 border-t-sky-500`
    }

    const transitionProperty = {
        enter_top: 'top-0',
        leave_top: `-top-full`,
        enter_bottom: 'bottom-0',
        leave_bottom: `-bottom-full`,
    }


    useEffect(() => {
        if (open) {
            setTimeout(() => {
                setShowContent(open)
            }, 0)
        }
    }, [open])
    return ReactDOM.createPortal(<div className={`fixed left-0 top-0 h-full w-full  z-50 ${open ? '' : 'hidden'}`}>
        <div className={`absolute left-0 top-0 h-full w-full bg-black/60 ${showContent ? '' : 'hidden'}`} onClick={handleClose}></div>
        <div
            onTransitionEnd={() => {
                if (!showContent) {
                    onClose?.()
                }
            }}
            className={`content absolute w-full
                duration-200
                bg-gray-800
                p-5
                shadow-[0_0_30px_0_rgba(0,0,0,0.3)]
                shadow-sky-400
                ${baseClass[placement]}
                ${showContent ? transitionProperty[`enter_${placement}`] : transitionProperty[`leave_${placement}`]}
             `
            }
        >
            <div className='close absolute right-5 top-3' onClick={handleClose}>X</div>
            {children}
        </div>
    </div>, document.body)
}


export default Drawer;
