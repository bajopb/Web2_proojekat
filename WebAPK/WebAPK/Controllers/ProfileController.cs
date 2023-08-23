using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPK.DTO;
using WebAPK.Interfaces;

namespace WebAPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        IProfileService profileService;

        public ProfileController(IProfileService profileService)
        {
            this.profileService = profileService;
        }

        [HttpGet("showProfile/{id}")]
        public async Task<IActionResult> showProfile(int id)
        {
            UserDTO user=await profileService.ShowProfile(id);
            if(user == null)
            {
                return BadRequest("Korisnik ne postoji");
            }
            return Ok(user);
        }

        [HttpPut("editProfile/{id}")]
        public async Task<IActionResult> editProfile(int id, [FromForm] ProfileEditDTO edit)
        {
            ResponseDTO response = await profileService.EditProfile(id, edit);
            return Ok(response);
        }

    }
}
