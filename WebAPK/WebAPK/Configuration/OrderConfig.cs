using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using WebAPK.Models;

namespace WebAPK.Configuration
{
    public class OrderConfig : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.DeliveryAddress).HasMaxLength(200).IsRequired();
            builder.Property(x => x.OrderTime).IsRequired().HasDefaultValue(DateTime.Now);
            builder.Property(x => x.DeliveryTime).IsRequired();
            builder.Property(x => x.Comment).HasMaxLength(200);
            builder.Property(x => x.IsCancelled).IsRequired().HasDefaultValue(false);
            builder.Property(x => x.OrderPrice).IsRequired();
            builder.HasOne(x => x.User).WithMany(x => x.Orders).HasForeignKey(x => x.UserId).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
