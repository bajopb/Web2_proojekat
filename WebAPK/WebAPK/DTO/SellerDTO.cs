using WebAPK.Models.Enums;

namespace WebAPK.DTO
{
    public class SellerDTO
    {
        public int Id { get; set; }

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Firstname { get; set; } = null!;

        public string Lastname { get; set; } = null!;

        public DateTime Birthday { get; set; }

        public string Address { get; set; } = null!;

        public byte[]? Image { get; set; }
        public VerifikacijaStatus VerificationStatus { get; set; }
    }
}
