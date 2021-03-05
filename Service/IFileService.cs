using Microsoft.AspNetCore.Http;
using SPP_1.Models;
using System.Threading.Tasks;

namespace SPP_1.Service
{
    public interface IFileService
    {
        Task<FileModel> UploadFile(IFormFile uploadedFile, FileModel input);
        Task<DownloadFileModel> DownloadFile(int fileId);
        Task<int?> DeleteFile(int fileId);
    }
}
