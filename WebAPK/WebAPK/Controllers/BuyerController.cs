using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPK.DTO;
using WebAPK.Interfaces;

namespace WebAPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BuyerController : ControllerBase
    {
        IBuyerService buyerService;
        
        public BuyerController(IBuyerService buyerService)
        {
            this.buyerService = buyerService;
        }

        [HttpPost("newOrder")]
        public async Task<IActionResult> newOrder(NewOrderDto orderDTO)
        {
            ResponseDTO response = await buyerService.NewOrder(orderDTO);
            return Ok(response);
        }

        [HttpPost("cancelOrder/{id}")]
        public async Task<IActionResult> cancelOrder(int id)
        {
            ResponseDTO response=await buyerService.CancelOrder(id);
            return Ok(response);
        }

        [HttpGet("orderHistory/{id}")]
        public async Task<IActionResult> OrderHistory(int id)
        {
            List<OrderDTO> orders = await buyerService.OrderHistory(id);

            if (orders == null)
            {
                return BadRequest("Nema porudžbina za prikazivanje");
            }

            return Ok(orders);
        }


        [HttpGet("getAllProducts")]
        public async Task<IActionResult> getAllProducts() {
            List<ProductDTO> products = await buyerService.GetAllProducts();
            
            return Ok(products);
        }

    }
}
