using SPP_1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SPP_1.Dao
{
    public interface ITaskStatusDao
    {
        IEnumerable<TaskStatusModel> GetItems();
    }
}
