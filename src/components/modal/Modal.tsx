import { type PropFunction,type QwikIntrinsicElements, $, Slot, component$, useStyles$, useOnDocument } from '@builder.io/qwik';
import styles from "./Modal.css?inline";

export type ModalProps = QwikIntrinsicElements['div'] & {
    title?:string;
    content?: string;
    isVisible?: any;
    onClose: PropFunction<() => boolean >
}

export default component$( ({title, content, isVisible, onClose, ...props}:ModalProps) => {
    useStyles$(styles);
    
    const handlerOnClose = $((e:any) => {
        if(e.target.id === 'wrapper-modal') onClose();
    })

    useOnDocument('keydown', $((event)=>{
        const key = event as KeyboardEvent
        if(key.code === 'Escape') onClose()
      }));

    return (
        <div class={`fixed flex modal ${isVisible.value ? 'block': 'hidden'}`} onClick$={handlerOnClose} id='wrapper-modal' {...props}>
             <div class={"w-[600px]"}>
                <div class={"bg-white dark:bg-primary-500 p-6 rounded-sm"}>
                    <button class={"btn-secondary"} onClick$={onClose}> Close </button>
                    {title ? <h1 class={"text-xl"}>{title}</h1>:<Slot name="modal-title"/>}
                    {content ? <p>{content}</p>:<Slot name="modal-content"/>}
                </div>
            </div>
        </div>
    );
} )