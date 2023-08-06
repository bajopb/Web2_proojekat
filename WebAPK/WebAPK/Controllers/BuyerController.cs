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
        [Authorize(Roles ="kupac")]
        public async Task<IActionResult> newOrder(OrderDTO orderDTO)
        {
            ResponseDTO response = await buyerService.NewOrder(orderDTO, orderDTO.UserId);
            return Ok(response);
        }

        [HttpPost("cancelOrder")]
        [Authorize(Roles ="kupac")]
        public async Task<IActionResult> cancelOrder(int id)
        {
            ResponseDTO response=await buyerService.CancelOrder(id);
            return Ok(response);
        }

        [HttpGet("oredrHistory")]
        [Authorize(Roles = "kupac")]
        public async Task<IActionResult> orderHistory(int id) {
            List<OrderDTO> orders = await buyerService.OrderHistory(id);
            if (orders == null)
            {
                return BadRequest("Nema porudzbina za prikazivanje");
            }
            return Ok(orders);
        }

    }
}
