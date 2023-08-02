using WebAPK.Models.Enums;

namespace WebAPK.DTO
{
    public class UserDTO
    {
        public int Id { get; set; }

        public string Username { get; set; } = null!;

        public string Email { get; set; } = null!;

        public string Firstname { get; set; } = null!;

        public string Lastname { get; set; } = null!;

        public DateTime Birthday { get; set; }

        public string Address { get; set; } = null!;

        public TipKorisnika Type { get; set; }


        public byte[]? Image { get; set; }
    }
}
