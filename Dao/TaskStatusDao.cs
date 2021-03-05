using SPP_1.Data;
using SPP_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPP_1.Dao
{
    public class TaskStatusDao : BaseDao<TaskStatusModel>, ITaskStatusDao
    {
        public TaskStatusDao(DatabaseContext context) : base(context) { }
        public override Task<int> AddItem(TaskStatusModel item)
        {
            throw new NotImplementedException();
        }

        public override Task<int> DeleteItem(int itemId)
        {
            throw new NotImplementedException();
        }

        public override Task<TaskStatusModel> GetItemByIdAsync(int itemId)
        {
            throw new NotImplementedException();
        }

        public override IEnumerable<TaskStatusModel> GetItems() => this._context.TaskStatuses;

        public override Task<int> UpdateItem(TaskStatusModel item)
        {
            throw new NotImplementedException();
        }
    }
}
