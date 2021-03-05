using SPP_1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SPP_1.Dao
{
    public interface ITaskDao
    {
        Task<int> DeleteItem(int itemId);
        Task<TaskModel> GetItemByIdAsync(int itemId);
        IEnumerable<TaskModel> GetItems();
        Task<int> AddItem(TaskModel item);
        Task<int> UpdateItem(TaskModel item);
    }
}
