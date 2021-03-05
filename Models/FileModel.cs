using System.Collections.Generic;

namespace SPP_1.Models
{
    public class FileModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Path { get; set; }
        public int TaskModelId { get; set; }
    }
}
