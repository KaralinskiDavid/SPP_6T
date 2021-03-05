using SPP_1.Models;
using SPP_1.Models.Request;
using SPP_1.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPP_1.Service
{
    public interface ITaskService
    {
        Task<TasksGetTaskResposeModel> GetTask(int taskId);
        Task<IEnumerable<TasksGetTaskResposeModel>> GetTasks();
        Task<int?> DeleteTask(int taskId);
        Task<PostTasksTaskResponseModel> CreateTask(PostTasksTaskRequestModel model);
        Task<PutTasksTaskResponseModel> UpdateTask(PutTasksTaskRequestModel model, int taskId);
        Task<IEnumerable<TaskStatusModel>> GetStatuses();
    }
}
