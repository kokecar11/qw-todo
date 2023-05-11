import { type QwikIntrinsicElements, Slot, component$, useStyles$} from "@builder.io/qwik";
import stylesCard from './Card.css?inline'

export type CardProps = QwikIntrinsicElements['div'] & {
    title?:string;
    content?: string;
    newItem?: boolean;
}

export default component$( ({title, content, newItem, ...props}: CardProps) => {
    useStyles$(stylesCard)
    return(
        <div class={`card ${newItem ? 'card-new-item' : '' }`} {...props}>
            {title ? 
                <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-primary-800 dark:text-white">{title}</h5>
                </a>
                : 
                <h5 class={"text-2xl font-bold tracking-tight text-primary-800 dark:text-white"}>
                   <Slot name="card-title" />
                </h5>
                
            }
            {content ? 
                <p class="mb-3 text-primary-800 text-opacity-70 dark:text-white dark:text-opacity-90">{content}</p> 
                : 
                <div>
                    <Slot name="card-content"/>
                </div>
            }   
            <Slot name="card-actions" />
            <div class="absolute inset-0"></div>
        </div>
    );
})