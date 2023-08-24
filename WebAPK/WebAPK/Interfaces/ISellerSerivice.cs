using WebAPK.DTO;

namespace WebAPK.Interfaces
{
    public interface ISellerSerivice
    {
        Task<ResponseDTO> AddProduct(ProductDTO productDto);
        Task<ResponseDTO> EditProduct(ProductDTO productDto);
        Task<ResponseDTO> DeleteProduct(int productID);
        Task<List<OrderDTO>> ListNewOrders(int profileID);
        Task<List<OrderDTO>> OrdersHistory(int profileID);
        Task<List<ProductDTO>> GetMyProducts(int id);
    }
}
