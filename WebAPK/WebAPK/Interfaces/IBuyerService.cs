using WebAPK.DTO;

namespace WebAPK.Interfaces
{
    public interface IBuyerService
    {
        public Task<ResponseDTO> NewOrder(NewOrderDto orderDto);
        public Task<ResponseDTO> CancelOrder(int orderID);
        public Task<List<OrderDTO>> OrderHistory(int profileID);
        public Task<List<ProductDTO>> GetAllProducts();

    }
}
