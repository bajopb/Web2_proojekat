using WebAPK.Models.Enums;
using WebAPK.Models;

namespace WebAPK.DTO
{
    public class ProfileEditDTO
    {

        public string Username { get; set; } = null!;

        public string OldPassword { get; set; } = null!;
        public string NewPassword { get; set; } = null!;


        public string Firstname { get; set; } = null!;

        public string Lastname { get; set; } = null!;

        public DateTime Birthday { get; set; }

        public string Address { get; set; } = null!;



        public byte[]? Image { get; set; }

        public IFormFile? ImageFile { get; set; }
    }
}
