import { $, component$, useSignal } from '@builder.io/qwik';
import { type DocumentHead, Form, routeAction$, routeLoader$, zod$, z, useNavigate, server$ } from '@builder.io/qwik-city';
import { PrismaClient } from '@prisma/client';
import Card from '~/components/card/Card';
import Modal from '~/components/modal/Modal';
import { MdiPlus } from '~/components/icons/icons';
import { Input } from '~/components/input/Input';
import { Textarea } from '~/components/textarea/Textarea';

export const taskForm = zod$({
  task: z.string({
    required_error: "Title task is required",
    invalid_type_error: "Title task must be a string",
  }).nonempty({
    message: "El titulo de la tarea es requerido",
  }),
  content: z.string(),
});

export const useCreateTask = routeAction$(
  async (data) => {
    const prisma = new PrismaClient();
    const task = await prisma.task.create({
      data,
    });
    
    return {
      success: true,
      task,
    };
},  taskForm);

export const useGetTasks = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const tasks = await prisma.task.findMany()
  return tasks;
});

export const indicatorsOfTasks = routeLoader$(async () => {
  const prisma = new PrismaClient();
  const task = await prisma.task;
  const totalTasks = await task.count();
  const totalInprogressTasks = await task.count({
    where: {status: 'INPROGRESS'}
  });
  const totalDoneTasks = await task.count({
  where: {status: 'DONE'}
  });
  return {
    totalTasks,
    totalDoneTasks,
    totalInprogressTasks,

  };
})

export const useDeleteAllTask = routeAction$(async (task) => {
    const prisma = new PrismaClient();
    await prisma.task.deleteMany();
    return{
      success: true,
      message: 'Todas las tasks han sido eliminadas.'
    }
  }
);

export default component$(() => {
  const createTask = useCreateTask();
  const getTasks = useGetTasks();
  const deleteAllTask = useDeleteAllTask();
  const indicators = indicatorsOfTasks();
  const nav = useNavigate();

  const isVisibleModal = useSignal(false);
  const showModal = $(() => isVisibleModal.value = !isVisibleModal.value);
  
  return (
    <div class={"flex mx-2"}>
      <div class="w-4/5 px-8 py-4 h-screen">
        <div class={"col-span-4 grid gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-4"}>
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
              <Card key={task.id} title={task.task} content={task.content} onClick$={()=> nav(`${task.id}`)}/>
            ))
          }
        </div>
      </div>
      <div class="w-1/5 px-4 py-4 bg-white h-screen border-l border-primary-500 border-opacity-20">
        <div class="flex items-center px-4 py-8 bg-primary-100 rounded-sm bg-opacity-30">
          <div class={"mr-auto"}>
            <p class={"text-primary-800"}>Hello,</p>
            <p class="text-lg font-bold text-primary-800">Koke Carpintero</p>
          </div>
          <img src="https://via.placeholder.com/48" alt="Avatar" class="w-16 h-16 rounded-full" />
        </div>
        <hr class={"border-primary-500 border-opacity-20 my-2 mx-2"}></hr>
        <div class={"grid grid-cols-2 gap-2 shadow-sm"}>
          <div class="bg-primary-100 p-4 bg-opacity-30">
            <h2 class="text-xs text-primary-800 font-medium mb-2">Total tareas</h2>
            <p class="text-lg font-bold text-primary-800">
              <span class={"border-l-2 border-purple-500 mr-2"}></span> {indicators.value.totalTasks}
            </p>
          </div>
          <div class="bg-primary-100 p-4 bg-opacity-30">
            <h2 class="text-xs text-primary-800 font-medium mb-2">Completadas</h2>
            <p class="text-lg font-bold text-primary-800">
              <span class={"border-l-2 border-secondary-500 mr-2"}></span> {indicators.value.totalDoneTasks}
            </p>
          </div>

          <div class="bg-primary-100 p-4 bg-opacity-30">
            <h2 class="text-xs text-primary-800 font-medium mb-2">En progreso</h2>
            <p class="text-lg font-bold text-primary-800">
              <span class={"border-l-2 border-warning-500 mr-2"}></span> {indicators.value.totalInprogressTasks}
            </p>
          </div>

          <div class="bg-primary-100 p-4 bg-opacity-30">
          <h2 class="text-xs text-primary-800 font-medium mb-2">Fuera de tiempo</h2>
            <p class="text-lg font-bold text-primary-800">
              <span class={"border-l-2 border-danger-500 mr-2"}></span> 
            </p>
          </div>
        </div>
      </div>
      <Modal isVisible={isVisibleModal} onClose={showModal}>
        <div q:slot="modal-content" class={"mx-5"}>
          <Form action={createTask} onSubmitCompleted$={showModal}>
            {createTask.status && <p>{createTask.value?.success}</p>}
            <Input label='Titulo de tarea' name='task' type='text' placeholder='Titulo de la tarea' value={createTask.formData?.get('task')} />
            {createTask.value?.failed && <p class={"mt-2 p-2 rounded-sm bg-danger-100 text-danger-500"}>{createTask.value.fieldErrors?.task}</p>}
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
