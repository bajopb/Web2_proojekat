using WebAPK.DTO;

namespace WebAPK.Interfaces
{
    public interface IUserService
    {
        public Task<ResponseDTO> Login(LoginDTO loginDto);
        public Task<ResponseDTO> GoogleLogin(string token);
        public Task<ResponseDTO> Register(RegisterDTO registerDto);
    }
}
