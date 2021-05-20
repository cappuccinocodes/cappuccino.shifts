
using System;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class DataContext: DbContext
    {
        public DataContext(DbContextOptions<DataContext> options)
           : base(options)
        {}

        public DbSet<Employer> EmployersPortfolio{ get; set; }
        public DbSet<Shift> ShiftsPortfolio { get; set; }
        public DbSet<Location> LocationsPortfolio { get; set; }


         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Shift>()
            .HasOne<Employer>(s => s.Employer)
            .WithMany(e => e.Shifts)
            .HasForeignKey(s => s.EmployerId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Employer>().Property(e => e.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<Location>().Property(l => l.Id).ValueGeneratedOnAdd();

            modelBuilder.Entity<Shift>()
            .HasOne<Location>(s => s.Location)
            .WithMany(l => l.Shifts)
            .HasForeignKey(s => s.LocationId)
            .OnDelete(DeleteBehavior.Cascade);

            // // seed the database with dummy data
            // modelBuilder.Entity<Category>().HasData(
            // new Category()
            // {
            //     Id = 1,
            //     Name = "Groceries",
            //     Icon = "Cart"

            // }

            // new Category()
            // {
            //     Id = 2,
            //     Name = "Fuel",
            //     Icon = "Car"
            // },

            // new Category()
            // {
            //     Id = 3,
            //     Name = "Eating Out",
            //     Icon = "Restaurant"
                

            // }
           


            // modelBuilder.Entity<Transaction>()

            // .HasData(
            //     new Transaction()
            //     {
            //         Id = 1,
            //         Title = "Coles",
            //         CategoryId = 1,
            //         CreatedAt = new DateTime(2008, 4, 10, 8, 30, 0),
            //         Value = 60m,
            //         Type = TransactionType.Expense,
            //     }
                // new Transaction()
                // {
                //     Id = 2,
                //     Title = "Caltex",
                //     CategoryId = 2,
                //     CreatedAt = new DateTime(2008, 4, 10, 10, 30, 0),
                //     Value = 55m,
                //     Type = TransactionType.Expense,
                // },
                // new Transaction()
                // {
                //     Id = 3,
                //     Title = "Hathi",
                //     CategoryId = 3,
                //     CreatedAt = new DateTime(2008, 4, 10, 12, 30, 0),
                //     Value = 95m,
                //     Type = TransactionType.Expense,
                // }
                

            base.OnModelCreating(modelBuilder);
        }
    }
    }

    
