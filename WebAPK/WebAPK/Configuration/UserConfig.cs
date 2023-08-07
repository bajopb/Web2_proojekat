    using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Org.BouncyCastle.Crypto.Generators;
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
            builder.Property(x => x.Firstname).HasMaxLength(100).IsRequired();
            builder.Property(x => x.Lastname).HasMaxLength(100).IsRequired();
            builder.Property(x => x.Password).HasMaxLength(300).IsRequired();
            builder.Property(x => x.Address).HasMaxLength(200).IsRequired();
            builder.Property(x => x.Type).HasConversion(new EnumToStringConverter<TipKorisnika>()).IsRequired();
            builder.Property(x => x.Birthday).IsRequired();
            builder.Property(x => x.VerificationStatus).HasConversion(new EnumToStringConverter<VerifikacijaStatus>()).IsRequired();

            builder.HasData(new User
            {
                Id = 1,
                Username = "bajopb",
                Email = "bajo@gmail.com",
                Firstname = "Nikola",
                Lastname="Vujovic",
                Password = BCrypt.Net.BCrypt.HashPassword("123"),
                Address = "adresa1",
                Type = TipKorisnika.Administrator,
                Birthday = new DateTime(2000, 03, 10)
            },
           new User
           {
               Id = 2,
               Username = "marko",
               Email = "marko@gmail.com",
               Firstname = "Marko",
               Lastname="Markovic",
               Password = BCrypt.Net.BCrypt.HashPassword("123"),
               Address = "adresa2",
               Type = TipKorisnika.Prodavac,
               Birthday = new DateTime(2000, 03, 10),
               VerificationStatus = VerifikacijaStatus.Ceka,
           },
           new User
           {
               Id = 3,
               Username = "petar",
               Email = "petar@gmail.com",
               Firstname = "Petar",
               Lastname="Petrovic",
               Password = BCrypt.Net.BCrypt.HashPassword("123"),
               Address = "adresa3",
               Type = TipKorisnika.Kupac,
               Birthday = new DateTime(2000, 03, 10)
           });
        }
    }

}
