﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using SPP_1.Data;

namespace SPP_1.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20210221205637_New")]
    partial class New
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.2");

            modelBuilder.Entity("SPP_1.Models.FileModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Path")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskModelId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskModelId");

                    b.ToTable("Files");
                });

            modelBuilder.Entity("SPP_1.Models.TaskModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<DateTime?>("CompletionDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("TaskStatusModelId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("TaskStatusModelId");

                    b.ToTable("Tasks");
                });

            modelBuilder.Entity("SPP_1.Models.TaskStatusModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("TaskStatuses");
                });

            modelBuilder.Entity("SPP_1.Models.FileModel", b =>
                {
                    b.HasOne("SPP_1.Models.TaskModel", null)
                        .WithMany("Files")
                        .HasForeignKey("TaskModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("SPP_1.Models.TaskModel", b =>
                {
                    b.HasOne("SPP_1.Models.TaskStatusModel", "TaskStatus")
                        .WithMany()
                        .HasForeignKey("TaskStatusModelId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("TaskStatus");
                });

            modelBuilder.Entity("SPP_1.Models.TaskModel", b =>
                {
                    b.Navigation("Files");
                });
#pragma warning restore 612, 618
        }
    }
}
