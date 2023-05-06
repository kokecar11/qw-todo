import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <div class={"dark:bg-primary-900 bg-white h-screen"}>
      
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik TODO',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
