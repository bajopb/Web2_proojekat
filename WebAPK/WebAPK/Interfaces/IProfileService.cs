using WebAPK.DTO;

namespace WebAPK.Interfaces
{
    public interface IProfileService
    {
        public Task<UserDTO> ShowProfile(int profileID);
        public Task<ResponseDTO> EditProfile(int profileID, ProfileEditDTO editDTO);   
    }
}
