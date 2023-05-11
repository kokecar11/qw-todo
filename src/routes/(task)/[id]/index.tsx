import { component$ } from "@builder.io/qwik";
import { routeLoader$, server$, useNavigate } from "@builder.io/qwik-city";
import { PrismaClient } from "@prisma/client";

export const useGetTask = routeLoader$(async ({params, status}) => {
  const taskId = parseInt(params['id'], 10);
  const prisma = new PrismaClient();
  const task = await prisma.task.findUnique({where: {id: taskId}});
  if (!task) {
    status(404);
  }
  return task;
});

export const deleteTask = server$(
  async (taskId: number) =>{
    const prisma = new PrismaClient();
    await prisma.task.delete({
      where: { id: taskId },
    });
  }
);

export default component$( () => {
    const nav = useNavigate();
    const task = useGetTask();
    // const useDeleteTask = useDeleteTask()

    return (
      //   <div>
      //       {task.value ? (
      //   <>
      //     <p>Task: {task.value.task}</p>
      //     <p>Content: {task.value.content}</p>
      //     <button class={"p-4 bg-danger-500 text-white rounded-sm"} onClick$={()=> {
      //         deleteTask(task.value.id)
      //         nav('../')
      //       }}>Delete Task</button>
      //   </>
      // ) : (
      //   <p>Task not found</p>
      // )}
      //   </div>
      <div class="flex">
      <div class="w-4/5 p-4 bg-slate-400 h-screen">
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-white rounded-lg shadow-lg p-4">
            <h2 class="text-lg font-medium mb-2">Card 1</h2>
            <p class="text-gray-600">Contenido de la card 1.</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-4">
            <h2 class="text-lg font-medium mb-2">Card 2</h2>
            <p class="text-gray-600">Contenido de la card 2.</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-4">
            <h2 class="text-lg font-medium mb-2">Card 3</h2>
            <p class="text-gray-600">Contenido de la card 3.</p>
          </div>
          <div class="bg-white rounded-lg shadow-lg p-4">
            <h2 class="text-lg font-medium mb-2">Card 3</h2>
            <p class="text-gray-600">Contenido de la card 3.</p>
          </div>
        </div>
      </div>
      <div class="w-1/5  p-4">
        <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h2 class="text-lg font-medium mb-2">Dashboard</h2>
          <p class="text-gray-600">Contenido del dashboard.</p>
        </div>
        <div class="bg-white rounded-lg shadow-lg p-4 mb-4">
          <h2 class="text-lg font-medium mb-2">Otro widget</h2>
          <p class="text-gray-600">Contenido del widget.</p>
        </div>
      </div>
    </div>
    );
})