using Microsoft.EntityFrameworkCore;
using SPP_1.Models;

namespace SPP_1.Data
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext()
        {
        }

        public DatabaseContext(string connectionString) : base(GetOptions(connectionString))
        {
        }

        private static DbContextOptions GetOptions(string connectionString)
        {
            return SqlServerDbContextOptionsExtensions.UseSqlServer(new DbContextOptionsBuilder(), connectionString).Options;
        }

        public DbSet<TaskModel> Tasks { get; set; }
        public DbSet<TaskStatusModel> TaskStatuses { get; set; }
        public DbSet<FileModel> Files { get; set; }
    }
}
