using WebAPK.DTO;

namespace WebAPK.Interfaces
{
    public interface IBuyerService
    {
        public Task<OrderDTO> NewOrder(OrderDTO orderDto, int buyerID);
        public Task CancelOrder(int orderID);
        public Task<List<OrderDTO>> OrderHistory(int profileID);

    }
}
