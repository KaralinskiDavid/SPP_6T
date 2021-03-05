using System;
using System.Collections.Generic;

namespace SPP_1.Models.Response
{
    public class TasksGetTaskResposeModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? CompletionDate { get; set; }
        public string Description { get; set; }
        public TaskStatusModel TaskStatus { get; set; }
        public List<FileModel> Files { get; set; }
    }
}
