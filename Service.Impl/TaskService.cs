using AutoMapper;
using SPP_1.Dao;
using SPP_1.Models;
using SPP_1.Models.Request;
using SPP_1.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPP_1.Service.Impl
{
    public class TaskService : ITaskService
    {
        private readonly IMapper _mapper;
        private readonly ITaskDao _taskDao;
        private readonly ITaskStatusDao _taskStatusDao;
        private readonly IFileService _fileService;

        public TaskService(IMapper mapper, ITaskDao taskDao, ITaskStatusDao taskStatusDao, IFileService fileService)
        {
            _mapper = mapper;
            _taskDao = taskDao;
            _taskStatusDao = taskStatusDao;
            _fileService = fileService;
        }

        public async Task<PostTasksTaskResponseModel> CreateTask(PostTasksTaskRequestModel body)
        {
            try
            {
                var model = _mapper.Map<TaskModel>(body);
                var result = await _taskDao.AddItem(model);
                if (result > 0)
                    return _mapper.Map<PostTasksTaskResponseModel>(model);
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
            return null;
        }

        public async Task<int?> DeleteTask(int taskId)
        {
            try
            {
                var task = await _taskDao.GetItemByIdAsync(taskId);
                if (task.Files != null)
                    foreach (var file in task.Files)
                        await _fileService.DeleteFile(file.Id);
                var result = await _taskDao.DeleteItem(taskId);
                if(result>0)
                    return result;
            }
            catch
            {
                return null;
            }
            return null;
        }

        public async Task<IEnumerable<TaskStatusModel>> GetStatuses()
        {
            try
            {
                var result = await Task.Run(() => _taskStatusDao.GetItems());
                if (result != null)
                    return result;
            }
            catch
            {
                return null;
            }
            return new List<TaskStatusModel>();
        }

        public async Task<TasksGetTaskResposeModel> GetTask(int taskId)
        {
            try
            {
                var result = await _taskDao.GetItemByIdAsync(taskId);
                if(result!=null)
                    return _mapper.Map<TasksGetTaskResposeModel>(result);
            }
            catch
            {
                return null;
            }
            return null;
        }

        public async Task<IEnumerable<TasksGetTaskResposeModel>> GetTasks()
        {
            try
            {
                var result = await Task.Run(() => _taskDao.GetItems());
                if(result!=null)
                    return _mapper.Map<IEnumerable<TasksGetTaskResposeModel>>(result);
            }
            catch
            {
                return null;
            }
            return new List<TasksGetTaskResposeModel>();
        }

        public async Task<PutTasksTaskResponseModel> UpdateTask(PutTasksTaskRequestModel body, int taskId)
        {
            try
            {
                var model = _mapper.Map<TaskModel>(body);
                model.Id = taskId;
                var result = await _taskDao.UpdateItem(model);
                if (result > 0)
                    return _mapper.Map<PutTasksTaskResponseModel>(model);
            }
            catch
            {
                return null;
            }
            return null;
        }
    }
}
