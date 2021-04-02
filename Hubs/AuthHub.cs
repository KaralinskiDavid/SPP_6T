using Microsoft.AspNetCore.SignalR;
using SPP_1.Service.Impl;
using System.Threading.Tasks;
using SPP_1.Models.Request;
using SPP_1.Authorization;
using SPP_1.Service;

namespace SPP_1.Hubs
{
    public class AuthHub : Hub
    {
        private readonly IAuthService _authService;

        public AuthHub(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task Register(PostAuthRegisterRequestModel request)
        {
            var result = await _authService.RegisterUser(request);
            await Clients.Caller.SendAsync("Register",result);
        }

        public async Task Login(PostAuthLoginRequestModel request)
        {
            Account user = new Account();
            if ((user = (await _authService.AuthenticateUser(request))) == null)
            {
                await Clients.Caller.SendAsync("Login", null);
                return;
            }
            var token = _authService.GenerateJwtToken(user);
            await Clients.Caller.SendAsync("Login", token);
        }

        public async Task CheckName(string userName)
        {
            var result = await _authService.CheckUserName(userName);
            await Clients.Caller.SendAsync("CheckName", result);
        }

    }
}
