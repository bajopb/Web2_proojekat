using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPK.DTO;
using WebAPK.Interfaces;

namespace WebAPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SellerController : ControllerBase
    {
        ISellerSerivice sellerSerivice;

        public SellerController(ISellerSerivice sellerSerivice)
        {
            this.sellerSerivice = sellerSerivice;
        }
        [HttpPost("addProduct")]
        //[Authorize(Roles ="Prodavac")]
        public async Task<IActionResult> AddProduct([FromForm]ProductDTO productDTO)
        {
            ResponseDTO response=await sellerSerivice.AddProduct(productDTO);
            return Ok(response);
        }

        [HttpPut("editProduct")]
        //[Authorize(Roles ="Prodavac")]
        public async Task<IActionResult> EditProduct(ProductDTO productDTO) {
            ProductDTO product = await sellerSerivice.EditProduct(productDTO);
            if (product == null) {
                return BadRequest("Artikal ne postoji");
            }
            return Ok("Uspesna izmena");

        }

        [HttpDelete("{id}")]
        [Authorize(Roles ="Prodavac")]
        public async Task<IActionResult> DeleteProduct(int id)
        {

            ResponseDTO response = await sellerSerivice.DeleteProduct(id);
            return Ok(response);    
        }


        //Dodati metodu koja je ostala

        [HttpGet("orderHistory/{id}")]
        //[Authorize(Roles ="Prodavac")]
        public async Task<IActionResult> OrderHistory(int id)
        {
            List<OrderDTO> orderList = await sellerSerivice.OrdersHistory(id);
            if (orderList == null)
            {
                return BadRequest("Korisnik ne postoji");
            }
            return Ok(orderList);
        }


    }
}
