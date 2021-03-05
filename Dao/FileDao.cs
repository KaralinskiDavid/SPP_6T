using SPP_1.Data;
using SPP_1.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SPP_1.Dao
{
    public class FileDao : BaseDao<FileModel>, IFileDao
    {
        public FileDao(DatabaseContext context) : base(context) { }
        public override async Task<int> AddItem(FileModel item)
        {
            await _context.Files.AddAsync(item);
            return await _context.SaveChangesAsync();
        }

        public override async Task<int> DeleteItem(int itemId)
        {
            _context.Files.Remove(_context.Files.Find(itemId));
            return await _context.SaveChangesAsync();
        }

        public override async Task<FileModel> GetItemByIdAsync(int itemId) => await _context.Files.FirstOrDefaultAsync(i => i.Id == itemId);

        public override IEnumerable<FileModel> GetItems()
        {
            throw new NotImplementedException();
        }

        public override Task<int> UpdateItem(FileModel item)
        {
            throw new NotImplementedException();
        }
    }
}
