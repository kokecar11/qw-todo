import { Slot, component$, useStylesScoped$ } from "@builder.io/qwik";


export const Navbar = component$(() => {
    useStylesScoped$(`
    .nav-link {
        @apply text-primary-500 p-5 font-semibold transition duration-200 ease-in-out
        hover:bg-primary-500 hover:bg-opacity-10 hover:border-primary-500 hover:border-b-2
        dark:hover:bg-white dark:hover:bg-opacity-10 dark:hover:border-white dark:hover:border-b-2 dark:text-white
      }
        
      .active-nav-item {
        @apply border-b-2 bg-opacity-20 bg-primary-500 border-primary-500
        dark:border-secondary-500 dark:text-white dark:bg-white dark:bg-opacity-20
      }
      
      .navbar {
          @apply sticky top-0 z-10 bg-white backdrop-filter backdrop-blur-lg bg-opacity-20 border-b border-primary-500 border-opacity-20
          dark:bg-primary-900 dark:border-secondary-500 dark:border-opacity-20 dark:backdrop-blur-lg dark:bg-opacity-20
      }
  `);
    return (
        <nav class={"navbar"}>
            <div class="mx-2 sm:mx-6 lg:mx-40">
                <div class="relative flex h-16 items-center justify-between">
                    <div class="flex flex-1 sm:items-stretch sm:justify-start">
                        <div class="flex flex-shrink-0 items-center">
                            <Slot name="navLogo" />
                        </div>
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <Slot name="navItemsStart" />
                            </div>
                        </div>
                    </div>
                    <div class="sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Slot name="navItemsEnd" />
                    </div>
                </div>
            </div>
        </nav>
    );
})