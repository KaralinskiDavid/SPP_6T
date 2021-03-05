using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SPP_1.Models;
using SPP_1.Models.Request;
using SPP_1.Models.Response;
using SPP_1.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPP_1.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [Route("{taskId}")]
        [HttpGet]
        public async Task<ActionResult<TasksGetTaskResposeModel>> GetTask([FromRoute] int taskId)
        {
            var result = await _taskService.GetTask(taskId);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TasksGetTaskResposeModel>>> GetTasks()
        {
            var result = await _taskService.GetTasks();
            if (result == null)
                return BadRequest();
            if(result.Any())
                return Ok(result);
            return NoContent();
        }

        [Route("{taskId}")]
        [HttpDelete]
        public async Task<IActionResult> DeleteTask([FromRoute] int taskId)
        {
            var result = await _taskService.DeleteTask(taskId);
            if (result == null)
                return NotFound();
            return Ok();
        }

        [HttpPut]
        [Route("{taskId}")]
        public async Task<ActionResult<PutTasksTaskResponseModel>> PutTask([FromBody] PutTasksTaskRequestModel model, [FromRoute] int taskId)
        {
            var result = await _taskService.UpdateTask(model,taskId);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [HttpPost]
        public async Task<ActionResult<PostTasksTaskResponseModel>> PostTask([FromBody] PostTasksTaskRequestModel model)
        {
            var result = await _taskService.CreateTask(model);
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        [Route("statuses")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskStatusModel>>> GetStatuses()
        {
            var result = await _taskService.GetStatuses();
            if (result == null)
                return BadRequest();
            if (result.Any())
                return Ok(result);
            return NoContent();
        }

    }
}
