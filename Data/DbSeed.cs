
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using SPP_1.Models;
using System;

namespace SPP_1.Data
{
    public static class DbSeed
    {
        public static void EnsurePopulated(IApplicationBuilder app)
        {
            DatabaseContext context = app.ApplicationServices.CreateScope().ServiceProvider.GetRequiredService<DatabaseContext>();
            if (context.Database.GetPendingMigrations().Any())
                context.Database.Migrate();
            if(!context.TaskStatuses.Any())
            {
                var description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit," +
                    " sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." +
                    " Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." +
                    " Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
                var inAnalysis = new TaskStatusModel { Name = "In analysis" };
                var toDo = new TaskStatusModel { Name = "To do" };
                var inProgress = new TaskStatusModel { Name = "In progress" };
                var inReview = new TaskStatusModel { Name = "In review" };
                var done = new TaskStatusModel { Name = "Done" };
                context.Tasks.AddRange(
                    new TaskModel { 
                        Name="DB analysis, prepare rough data plan",
                        TaskStatus = inAnalysis,
                        Description =description, 
                        CompletionDate = DateTime.UtcNow
                    },
                     new TaskModel
                     {
                         Name = "Approve and select 1 design variant",
                         TaskStatus = toDo,
                         Description = description,
                         CompletionDate = DateTime.UtcNow
                     },
                      new TaskModel
                      {
                          Name = "Design necessary entrypoints and models in the StopLight.io",
                          TaskStatus = inProgress,
                          Description = description,
                          CompletionDate = DateTime.UtcNow
                      },
                       new TaskModel
                       {
                           Name = "Discuss the methods and models with the client's developer",
                           TaskStatus = inReview,
                           Description = description,
                           CompletionDate = DateTime.UtcNow
                       },
                        new TaskModel
                        {
                            Name = "Approve prototype with client",
                            TaskStatus = done,
                            Description = description,
                            CompletionDate = DateTime.UtcNow
                        }
                    );
                context.SaveChanges();
            }
        }
    }
}
