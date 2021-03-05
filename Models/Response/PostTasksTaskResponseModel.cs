using SPP_1.Models.Request;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPP_1.Models.Response
{
    public class PostTasksTaskResponseModel : PostTasksTaskRequestModel
    {
        public int Id { get; set; }
        public TaskStatus TaskStatus { get; set; }
    }
}
