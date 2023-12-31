﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPK.DTO;
using WebAPK.Interfaces;

namespace WebAPK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]LoginDTO loginDTO) {
            ResponseDTO response = await userService.Login(loginDTO);
            if (string.IsNullOrEmpty(response.Token))
            {
                return Ok(response);
            }
            return Ok(response);
        }


        [HttpPost("googleLogin")]
        public async Task<IActionResult> GoogleLogin([FromBody]string token)
        {
            ResponseDTO response = await userService.GoogleLogin(token);
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromForm]RegisterDTO regDto)
        {
            
            ResponseDTO response = await userService.Register(regDto);
            if (string.IsNullOrEmpty(response.Token))
            {
                return Ok(response);
            }
            return Ok(response);
        }
    }
}
