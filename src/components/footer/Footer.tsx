import { component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';
// import { GlobalStore } from '~/core/context';


export const Footer = component$( () => {
    // const state = useContext(GlobalStore);
    return ( 
        <footer class="bg-secondary-100 text-center text-white dark:bg-primary-900">
            <div class="pt-6">
                <div class="mb-6 flex justify-center">
                    <Link href="#!" class="icon">

                    </Link>
                    <Link href="#!" class="icon">

                    </Link>
                </div>
            </div>
            <div
                class="bg-secondary-100 text-primary-800 dark:bg-primary-900 dark:text-white p-1 text-center">
                Hecho con el 💙 - <span class={"font-bold text-primary-800"}>Kokecar11</span>
            </div>
        </footer>
    );
})