using System;
using System.ComponentModel.DataAnnotations;

namespace SPP_1.Models.Request
{
    public class PostTasksTaskRequestModel
    {
        [Required]
        public string Name { get; set; }
        public DateTime? CompletionDate { get; set; }
        public string Description { get; set; }
        [Required]
        public int TaskStatusId { get; set; }
    }
}
