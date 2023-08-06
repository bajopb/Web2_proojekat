using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPK.Interfaces;

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
        [Authorize(Roles ="admin")]
    }
}
