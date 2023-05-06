import { component$, Slot } from '@builder.io/qwik';
import { Link, routeLoader$ } from '@builder.io/qwik-city';


import { Navbar } from '~/components/navbar/Navbar';
import { Footer } from '~/components/footer/Footer';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {

  return (
    <>
      <Navbar>
        <div q:slot='navLogo' class={""}>
          <Link href='/' class={"font-bold text-lg text-primary-800 dark:text-white"}>TODO Qwik ⚡️</Link>
        </div>
      </Navbar>
      <main>
        <Slot />
      </main>
      <Footer />
    </>
  );
});
