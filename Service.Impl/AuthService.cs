using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using SPP_1.Authorization;
using SPP_1.Models.Request;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SPP_1.Service.Impl
{
    public class AuthService : IAuthService
    {
        private readonly JwtOptions _jwtOptions;
        private readonly UserManager<Account> _userManager;
        private readonly SignInManager<Account> _signInManager;

        public AuthService(IOptions<JwtOptions> jwtOptions, UserManager<Account> userManager, SignInManager<Account> signInManager)
        {
            _jwtOptions = jwtOptions.Value;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<Account> AuthenticateUser(PostAuthLoginRequestModel request)
        {
            try
            {
                Account user = new();
                if ((user = await _userManager.FindByEmailAsync(request.Email)) == null)
                    return null;
                if (await _userManager.CheckPasswordAsync(user, request.Password))
                    return user;
                return null;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public string GenerateJwtToken(Account user)
        {
            var securityKey = _jwtOptions.GetSymmetricSecurityKey();
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.GivenName, user.UserName)
            };

            var token = new JwtSecurityToken(
                _jwtOptions.Issuer,
                _jwtOptions.Audience,
                claims,
                notBefore: DateTime.UtcNow,
                expires: DateTime.UtcNow.AddSeconds(_jwtOptions.TokenLifeTime),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public async Task<bool> RegisterUser(PostAuthRegisterRequestModel request)
        {
            try
            {
                if ((await _userManager.FindByEmailAsync(request.Email)) != null)
                    return false;

                var identity = new Account { Email = request.Email, UserName = request.UserName };
                var result = await _userManager.CreateAsync(identity, request.Password);
                return result.Succeeded;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> CheckUserName(string userName)
        {
            try
            {
                if ((await _userManager.FindByNameAsync(userName)) != null)
                    return false;
                return true;
            }
            catch
            {
                return false;
            }
        }

    }
}
