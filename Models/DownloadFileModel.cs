using System.IO;

namespace SPP_1.Models
{
    public class DownloadFileModel
    {
        public FileModel FileModel { get; set; }
        public FileStream Stream { get; set; }
    }
}
