using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPK.Models;

namespace WebAPK.Configuration
{
        public class ProductConfig : IEntityTypeConfiguration<Product>
        {
            public void Configure(EntityTypeBuilder<Product> builder)
            {
                builder.HasKey(x => x.Id);
                builder.Property(x => x.Name).HasMaxLength(100).IsRequired();
                builder.Property(x => x.Price).IsRequired();
                builder.Property(x => x.Amount).IsRequired();
                builder.Property(x => x.Description).HasMaxLength(200);
                builder.HasOne(x => x.Seller).WithMany(x => x.Products).HasForeignKey(x => x.SellerId).OnDelete(DeleteBehavior.Cascade);
            }
        }
}
