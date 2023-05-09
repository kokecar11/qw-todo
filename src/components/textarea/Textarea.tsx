import {type QwikIntrinsicElements, component$, useStyles$} from "@builder.io/qwik";
import styleInput from './Textarea.css?inline'

export type TextareaProps = QwikIntrinsicElements['textarea'] & {
    label?:string;
};

export const Textarea = component$( ({label, ...props}: TextareaProps) => {
    useStyles$(styleInput)
    return(
    <div>
        <label class="label-input">{label}</label>
        <textarea 
            {...props}
            class="input"></textarea>
    </div>
    );
})