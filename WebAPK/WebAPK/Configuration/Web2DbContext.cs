using Microsoft.EntityFrameworkCore;
using WebAPK.Models;

namespace WebAPK.Configuration
{
    public class Web2DbContext:DbContext
    {
        public DbSet<User>? Users { get; set; }
        public DbSet<Product>? Products { get; set; }
        public DbSet<Order>? Orders { get; set; }
        public DbSet<Item>? Items { get; set; }

        public Web2DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(Web2DbContext).Assembly);
        }
    }
}
