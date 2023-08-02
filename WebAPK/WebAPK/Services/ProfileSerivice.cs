using WebAPK.DTO;
using WebAPK.Interfaces;

namespace WebAPK.Services
{
    public class ProfileSerivice : IProfileService
    {
        public Task<UserDTO> EditProfile(int profileID, UserDTO userDTO)
        {
            throw new NotImplementedException();
        }

        public Task<UserDTO> ShowProfile(int profileID)
        {
            throw new NotImplementedException();
        }
    }
}
