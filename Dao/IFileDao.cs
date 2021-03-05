using SPP_1.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SPP_1.Dao
{
    public interface IFileDao
    {
        Task<int> DeleteItem(int itemId);
        Task<FileModel> GetItemByIdAsync(int itemId);
        IEnumerable<FileModel> GetItems();
        Task<int> AddItem(FileModel item);
    }
}
