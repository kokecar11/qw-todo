import { component$} from '@builder.io/qwik';

export type TagProps = {
    text: string;
    variant?: TagVariants;
    size?: TagSizes;
}

export type TagSizes = 'xs' | 'sm' | 'md' | 'lg';
export type TagVariants = 'danger' | 'warning' | 'info' | 'success' | 'primary' | 'secondary';

export const Tag = component$(({text, size, variant}:TagProps) => {
    const {sizes, variants} ={
        variants:{
            danger: 'bg-danger-500',
            warning: 'bg-warning-500',
            success: 'bg-success-500',
            info: 'bg-info-500',
            primary: 'bg-primary-500',
            secondary: 'bg-secondary-500',
        },
        sizes:{
            xs: 'text-xs',
            sm: 'text-sm',
            md: 'text-md',
            lg: 'text-lg',
        }
    }
    return(
        <span class={`inline-block px-3 py-2 rounded-sm text-white font-semibold ${variant ? variants[variant] : variants.primary} ${size ? sizes[size]: sizes.sm}`}>
            {text}
        </span>
    );
})