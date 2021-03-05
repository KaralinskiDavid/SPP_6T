using Microsoft.AspNetCore.Http;
using SPP_1.Dao;
using SPP_1.Dto;
using SPP_1.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SPP_1.Service.Impl
{
    public class FileService : IFileService
    {
        private readonly IFileDao _fileDao;
        public FileService(IFileDao filedao)
        {
            _fileDao = filedao;
        }

        public async Task<DownloadFileModel> DownloadFile(int fileId)
        {
            if (fileId <= 0)
                return null;

            var file = await _fileDao.GetItemByIdAsync(fileId);
            if (file == null)
                return null;

            try
            {
                var path = string.Format(ConstantStrings.FileStructurePath, file.TaskModelId);
                var directory = Path.Combine(Environment.CurrentDirectory, path);

                if (!File.Exists(directory + file.Name))
                    return null;

                return new DownloadFileModel()
                {
                    Stream = File.OpenRead(directory + file.Name),
                    FileModel = file
                };
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public async Task<int?> DeleteFile(int fileId)
        {
            var file = await _fileDao.GetItemByIdAsync(fileId);

            if (file == null)
                return null;

            try
            {
                var path = string.Format(ConstantStrings.FileStructurePath, file.TaskModelId);
                var directory = Path.Combine(Environment.CurrentDirectory, path);

                var result = await _fileDao.DeleteItem(fileId);

                if (result > 0)
                {
                    if (File.Exists(directory + file.Name))
                        File.Delete(directory + file.Name);

                    return result;
                }
            }
            catch
            {
                return null;
            }

            return null;
        }

        public async Task<FileModel> UploadFile(IFormFile uploadedFile, FileModel input)
        {
            if (uploadedFile == null)
                return null;

            try
            {
                var resultCreateFileRecord = await _fileDao.AddItem(input);

                if (resultCreateFileRecord > 0)
                {
                    var path = string.Format(ConstantStrings.FileStructurePath, input.TaskModelId);
                    var directory = Path.Combine(Environment.CurrentDirectory, path);
                    input.Path = directory;

                    if (!Directory.Exists(directory))
                        Directory.CreateDirectory(directory);

                    await using (var fileStream = new FileStream(directory + input.Name, FileMode.CreateNew))
                    {
                        await uploadedFile.CopyToAsync(fileStream);
                    }
                }
                return input;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
