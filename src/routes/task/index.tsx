import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, Form, routeAction$, routeLoader$, zod$, z, useNavigate } from '@builder.io/qwik-city';
import { PrismaClient } from '@prisma/client';
import Card from '~/components/card/Card';
import Modal from '~/components/modal/Modal';
import { MdiPlus } from '~/components/icons/icons';
import { Input } from '~/components/input/Input';
import { Textarea } from '~/components/textarea/Textarea';

export const useCreateTask = routeAction$(
  async (data) => {
    const prisma = new PrismaClient();
    const task = await prisma.task.create({
      data,
    });
    return task;
},  zod$({
  task: z.string(),
  content: z.string(),
}));

export const useGetTasks = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany()
  return tasks;
});


export default component$(() => {
  const createTask = useCreateTask();
  const getTasks = useGetTasks();
  const nav = useNavigate()

  const isVisibleModal = useSignal(false);
  const showModal = $(()=> isVisibleModal.value = !isVisibleModal.value)
  
  return (
    <div class={"m-2 sm:mx-36 py-6"}>
      <div class={"grid gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4"}>
        <Card newItem={true} onClick$={showModal}>
          <div q:slot='card-title' class={"text-center"}>
            Agregar nueva tarea
          </div>
          <div q:slot='card-content' class={"text-center grid place-items-center"}>
            <MdiPlus class={"text-4xl text-primary-800 text-center"} />
          </div>
        </Card>
        {
          getTasks.value.map(task => (
            <Card key={task.id} title={task.task} content={task.content}>
              <div q:slot='card-actions'>
                <button class={"p-2 bg-success-500 text-white cursor-pointer"}>Ver detalle</button>
              </div>
            </Card>
          ))
        }

      </div>
      <Modal isVisible={isVisibleModal} onClose={showModal}>
        <div q:slot="modal-content" class={"mx-5"}>
          <Form action={createTask}>
            <Input label='Titulo de tarea' name='task' type='text' placeholder='Titulo de la tarea' value={createTask.formData?.get('task')} />
            <Textarea label='Contenido' name='content' placeholder='Contenido de la tarea' value={createTask.formData?.get('content')}></Textarea>
            <div class={"mt-4"}>
              <button class={"bg-primary-900 p-3 rounded text-white w-full"} type='submit'>Crear tarea</button>
            </div>
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
