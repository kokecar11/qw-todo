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
        <div>
            {task.value ? (
        <>
          <p>Task: {task.value.task}</p>
          <p>Content: {task.value.content}</p>
          <button class={"p-4 bg-danger-500 text-white rounded-sm"} onClick$={()=> {
              deleteTask(task.value.id)
              nav('../')
            }}>Delete Task</button>
        </>
      ) : (
        <p>Task not found</p>
      )}
        </div>
    );
})