using SPP_1.Data;
using SPP_1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace SPP_1.Dao
{
    public class TaskDao : BaseDao<TaskModel>, ITaskDao
    {
        public TaskDao(DatabaseContext context) : base(context) { }
        public override async Task<int> DeleteItem(int itemId)
        {
            _context.Tasks.Remove(_context.Tasks.Find(itemId));
            return await _context.SaveChangesAsync();
        }

        public override async Task<TaskModel> GetItemByIdAsync(int itemId) =>
            await _context.Tasks.Include(t => t.TaskStatus).Include(t=>t.Files).FirstOrDefaultAsync(t => t.Id == itemId);

        public override IEnumerable<TaskModel> GetItems() => _context.Tasks.Include(t => t.TaskStatus).Include(t => t.Files);

        public override async Task<int> AddItem(TaskModel model)
        {
            await _context.AddAsync(model);
            return await _context.SaveChangesAsync();
        }

        public override async Task<int> UpdateItem(TaskModel model)
        {
             _context.Update(model);
            return await _context.SaveChangesAsync();
        }
    }
}
