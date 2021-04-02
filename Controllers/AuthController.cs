using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using SPP_1.Authorization;
using SPP_1.Models;
using SPP_1.Models.Request;
using SPP_1.Models.Response;
using SPP_1.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SPP_1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] PostAuthLoginRequestModel request)
        {
            Account user = new Account();
            if ((user=(await _authService.AuthenticateUser(request)))==null)
                return Unauthorized();
            var token = _authService.GenerateJwtToken(user);
            return Ok(new
            {
                access_token = token
            });
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register([FromBody] PostAuthRegisterRequestModel request)
        {
            var result = await _authService.RegisterUser(request);
            if (result)
                return Ok();
            return BadRequest();
        }

        [HttpGet]
        [Route("checkName/{userName}")]
        public async Task<IActionResult> CheckName([FromRoute] string userName)
        {
            var result = await _authService.CheckUserName(userName);
            return Ok(result);
        }

    }
}
