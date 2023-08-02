﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPK.Configuration;

#nullable disable

namespace WebAPK.Migrations
{
    [DbContext(typeof(Web2DbContext))]
    partial class Web2DbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.9")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("WebAPK.Models.Item", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("OrderId")
                        .HasColumnType("int");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OrderId");

                    b.ToTable("Items");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 5,
                            Name = "Item1",
                            OrderId = 1,
                            Price = 100.0,
                            ProductId = 1
                        });
                });

            modelBuilder.Entity("WebAPK.Models.Order", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Comment")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("DeliveryAddress")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<DateTime>("DeliveryTime")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsCancelled")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bit")
                        .HasDefaultValue(false);

                    b.Property<double>("OrderPrice")
                        .HasColumnType("float");

                    b.Property<DateTime>("OrderTime")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValue(new DateTime(2023, 8, 2, 16, 28, 37, 605, DateTimeKind.Local).AddTicks(1357));

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Orders");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DeliveryAddress = "adresa3",
                            DeliveryTime = new DateTime(2023, 8, 2, 19, 22, 37, 605, DateTimeKind.Local).AddTicks(5364),
                            IsCancelled = false,
                            OrderPrice = 700.0,
                            OrderTime = new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            UserId = 3
                        });
                });

            modelBuilder.Entity("WebAPK.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Amount")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<double>("Price")
                        .HasColumnType("float");

                    b.Property<int>("SellerId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("SellerId");

                    b.ToTable("Products");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Amount = 10,
                            Description = "nesto",
                            Name = "Product1",
                            Price = 100.0,
                            SellerId = 2
                        });
                });

            modelBuilder.Entity("WebAPK.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("nvarchar(200)");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<byte[]>("Image")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasMaxLength(300)
                        .HasColumnType("nvarchar(300)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("VerificationStatus")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("Email")
                        .IsUnique();

                    b.HasIndex("Username")
                        .IsUnique();

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "adresa1",
                            Birthday = new DateTime(2000, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "bajo@gmail.com",
                            Firstname = "Nikola",
                            Lastname = "Vujovic",
                            Password = "$2a$10$9o2fSWLxhVTUF2bou7PqeOvaT9v5uzZ7ourk.V4pZT7EcHqH7AdJy",
                            Type = "Administrator",
                            Username = "bajopb",
                            VerificationStatus = "Prihvacen"
                        },
                        new
                        {
                            Id = 2,
                            Address = "adresa2",
                            Birthday = new DateTime(2000, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "marko@gmail.com",
                            Firstname = "Marko",
                            Lastname = "Markovic",
                            Password = "$2a$10$8lA.E2dDiUNBIV/Hqk36fuOgBL5LEGILTlyHdQe4BgFqgY3IlvgKu",
                            Type = "Prodavac",
                            Username = "marko",
                            VerificationStatus = "Ceka"
                        },
                        new
                        {
                            Id = 3,
                            Address = "adresa3",
                            Birthday = new DateTime(2000, 3, 10, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Email = "petar@gmail.com",
                            Firstname = "Petar",
                            Lastname = "Petrovic",
                            Password = "$2a$10$E5Wd.WnLBCG0fwDT/3Uape7pU4oH1D/jlLm/1kjk5W.76Gom2Lu8q",
                            Type = "Kupac",
                            Username = "petar",
                            VerificationStatus = "Prihvacen"
                        });
                });

            modelBuilder.Entity("WebAPK.Models.Item", b =>
                {
                    b.HasOne("WebAPK.Models.Order", "Order")
                        .WithMany("Items")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");
                });

            modelBuilder.Entity("WebAPK.Models.Order", b =>
                {
                    b.HasOne("WebAPK.Models.User", "User")
                        .WithMany("Orders")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("WebAPK.Models.Product", b =>
                {
                    b.HasOne("WebAPK.Models.User", "Seller")
                        .WithMany("Products")
                        .HasForeignKey("SellerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Seller");
                });

            modelBuilder.Entity("WebAPK.Models.Order", b =>
                {
                    b.Navigation("Items");
                });

            modelBuilder.Entity("WebAPK.Models.User", b =>
                {
                    b.Navigation("Orders");

                    b.Navigation("Products");
                });
#pragma warning restore 612, 618
        }
    }
}