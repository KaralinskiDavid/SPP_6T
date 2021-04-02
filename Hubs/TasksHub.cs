using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using SPP_1.Models.Request;
using SPP_1.Service;

namespace SPP_1.Hubs
{
    [Authorize]
    public class TasksHub : Hub
    {
        private readonly ITaskService _taskService;

        public TasksHub(ITaskService taskService)
        {
            _taskService = taskService;
        }


        public async Task GetTasks()
        {
            var tasks = await _taskService.GetTasks();
            await Clients.Caller.SendAsync("GetTasks", tasks);
        }

        public async Task GetStatuses()
        {
            var result = await _taskService.GetStatuses();
            await Clients.Caller.SendAsync("GetStatuses", result);
        }

        public async Task CreateTask(PostTasksTaskRequestModel task)
        {
            var result = await _taskService.CreateTask(task);
            await Clients.Caller.SendAsync("CreateTask",result);
        }

        public async Task UpdateTask(PutTasksTaskRequestModel task, int taskId)
        {
            var result = await _taskService.UpdateTask(task, taskId);
            await Clients.Caller.SendAsync("UpdateTask", result);
        }

        public async Task DeleteTask(int taskId)
        {
            var result = await _taskService.DeleteTask(taskId);
            await Clients.Caller.SendAsync("DeleteTask", result);
        }

    }
}
