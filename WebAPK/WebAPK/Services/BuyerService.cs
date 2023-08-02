using WebAPK.DTO;
using WebAPK.Interfaces;

namespace WebAPK.Services
{
    public class BuyerService : IBuyerService
    {
        public Task CancelOrder(int orderID)
        {
            throw new NotImplementedException();
        }

        public Task<OrderDTO> NewOrder(OrderDTO orderDto, int buyerID)
        {
            throw new NotImplementedException();
        }

        public Task<List<OrderDTO>> OrderHistory(int profileID)
        {
            throw new NotImplementedException();
        }
    }
}
