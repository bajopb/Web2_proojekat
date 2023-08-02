using WebAPK.DTO;
using WebAPK.Models.Enums;

namespace WebAPK.Interfaces
{
    public interface IAdminService
    {
        public Task<List<UserDTO>> GetAllSellers();
        public Task<List<UserDTO>> GetVerifiedSellers();

        public Task<ResponseDTO> SetStatus(int profileID, VerifikacijaStatus status);

        public Task<List<OrderDTO>> GetAllOrders();

    }
}
