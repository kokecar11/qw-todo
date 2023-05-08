import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, Form, routeAction$, routeLoader$ } from '@builder.io/qwik-city';
import Card from '~/components/card/Card';
import Modal from '~/components/modal/Modal';
import { MdiPlus } from '~/components/icons/icons';
import { PrismaClient } from '@prisma/client';

export const useCreateTask = routeAction$(async (data) => {
  const prisma = new PrismaClient();
  const task = await prisma.task.create({
    data,
  });
  return task;
});

export const useGetTasks = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const users = await prisma.task.findMany()
  return users;
});

export default component$(() => {
  const createTask = useCreateTask();
  const getTasks = useGetTasks();

  const isVisibleModal = useSignal(false);
  const count = useSignal(0);
  const showModal = $(()=> isVisibleModal.value = !isVisibleModal.value)
  
  return (
    <div class={"m-2 sm:mx-36 py-6"}>
      <div class={"grid gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4"}>
        <Card newItem={true} onClick$={showModal}>
          <div q:slot='card-title' class={"text-center"}>
            Agregar nueva tarea {count.value}
          </div>
          <div q:slot='card-content' class={"text-center grid place-items-center"}>
            <MdiPlus class={"text-4xl text-primary-800 text-center"} />
          </div>
        </Card>
        {
          getTasks.value.map(task => (
            <Card key={task.id} title={task.task} content={task.content}/>
          ))
        }
        {/* <Card title='Tarea 1' content='teste'/> */}
      </div>
      {isVisibleModal.value}
      <Modal isVisible={isVisibleModal} onClose={showModal}>
        <div q:slot="modal-content">
          <Form action={createTask}>
            <input type='text' name='task' placeholder='Titulo de tarea' value={createTask.formData?.get('task')} />
            <input type='text' name='content' placeholder='Contenido de la tarea' value={createTask.formData?.get('content')} />
            <button type='submit'>Crear tarea</button>
          </Form>
        </div>
      </Modal>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to TODO with Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
