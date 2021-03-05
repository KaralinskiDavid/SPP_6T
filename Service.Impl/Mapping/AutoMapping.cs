using AutoMapper;
using SPP_1.Models;
using SPP_1.Models.Request;
using SPP_1.Models.Response;
using System;
using System.Collections.Generic;

namespace SPP_1.Service.Impl.Mapping
{
    public class AutoMapping : Profile
    {
        public AutoMapping()
        {
            #region TaskModels

            CreateMap<TaskModel, TasksGetTaskResposeModel>();

            CreateMap<PostTasksTaskRequestModel, TaskModel>()
                .ForMember(dest=>dest.TaskStatusModelId, opt=>opt.MapFrom(src=>src.TaskStatusId));

            CreateMap<TaskModel, PostTasksTaskResponseModel>()
                .ForMember(dest => dest.TaskStatusId, opt => opt.MapFrom(src => src.TaskStatusModelId));

            CreateMap<PutTasksTaskRequestModel, TaskModel>()
                .ForMember(dest => dest.TaskStatusModelId, opt => opt.MapFrom(src => src.TaskStatusId));

            CreateMap<TaskModel, PutTasksTaskResponseModel>()
                .ForMember(dest => dest.TaskStatusId, opt => opt.MapFrom(src => src.TaskStatusModelId));
            #endregion
        }
    }
}
