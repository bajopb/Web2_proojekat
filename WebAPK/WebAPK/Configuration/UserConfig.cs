using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebAPK.Models;
using WebAPK.Models.Enums;

namespace WebAPK.Configuration
{
    public class UserConfig : IEntityTypeConfiguration<User>
    {


        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Username).HasMaxLength(100).IsRequired();
            builder.HasIndex(x => x.Username).IsUnique();
            builder.Property(x => x.Email).HasMaxLength(100).IsRequired();
            builder.HasIndex(x => x.Email).IsUnique();
            builder.Property(x => x.Firstname).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Lastname).HasMaxLength(50).IsRequired();
            builder.Property(x => x.Password).HasMaxLength(300).IsRequired();
            builder.Property(x => x.Address).HasMaxLength(200).IsRequired();
            builder.Property(x => x.Type).HasConversion(new EnumToStringConverter<TipKorisnika>()).IsRequired();
            builder.Property(x => x.Birthday).IsRequired();
            builder.Property(x => x.VerificationStatus).HasConversion(new EnumToStringConverter<VerifikacijaStatus>()).IsRequired();
        }
    }
}
