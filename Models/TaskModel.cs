using System.Collections.Generic;
using System;

namespace SPP_1.Models
{
    public class TaskModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? CompletionDate { get; set; }
        public int TaskStatusModelId { get; set; }

        public string? Description { get; set; }


        public TaskStatusModel TaskStatus { get; set; }
        public IEnumerable<FileModel> Files { get; set; } = new HashSet<FileModel>();
    }
}
