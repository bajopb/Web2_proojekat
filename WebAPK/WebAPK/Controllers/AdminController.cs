using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPK.DTO;
using WebAPK.Interfaces;
using WebAPK.Models.Enums;

namespace WebAPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        IAdminService adminService;

        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }
        [HttpGet("getAllSellers")]
        //[Authorize(Roles ="admin")]
        public async Task<IActionResult> getAllSellers()
        {
            List<SellerDTO> users = await adminService.GetAllSellers();
            if (users == null)
            {
                return BadRequest(users);
            }
            return Ok(users);
        }

        [HttpGet("getVerifiedSelers")]
        [Authorize(Roles ="admin")]
        public async Task<IActionResult> getVerifiedSellers()
        {
            List<UserDTO> users = await adminService.GetVerifiedSellers();
            if(users == null)
            {
                return BadRequest(users);
            }
            return Ok(users);
        }

        [HttpPost("setStatus")]
       // [Authorize(Roles ="admin")]
        public async Task<IActionResult> SetStatus([FromBody]VerificationDTO verificationDto)
        {
            ResponseDTO response=await adminService.SetStatus(verificationDto.Id, verificationDto.VerificationStatus    );
            if (response.Result == "Korisnik ne postoji")
                return BadRequest("Korisnik ne postoji");
            return Ok(response);
        }

        [HttpGet("getAllOrders")]
        //[Authorize(Roles = "admin")]
        public async Task<IActionResult> getAllOrders() { 
            List<OrderDTO> orders=await adminService.GetAllOrders();
            if(orders == null)
            {
                return BadRequest("Nema porudzbina za prikazivanje");
            }
            return Ok(orders);
        }
    }
}
