using SPP_1.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SPP_1.Dao
{
    public abstract class BaseDao<T>
    {
        public BaseDao(DatabaseContext context) => _context = context;
  
        public DatabaseContext _context;
        public abstract Task<T> GetItemByIdAsync(int itemId);
        public abstract IEnumerable<T> GetItems();
        public abstract Task<int> AddItem(T item);
        public abstract Task<int> UpdateItem(T item);
        public abstract Task<int> DeleteItem(int itemId);
    }
}
