using SPP_1.Authorization;
using SPP_1.Models.Request;
using System.Threading.Tasks;

namespace SPP_1.Service
{
    public interface IAuthService
    {
        Task<bool> CheckUserName(string userName);
        Task<bool> RegisterUser(PostAuthRegisterRequestModel request);
        Task<Account> AuthenticateUser(PostAuthLoginRequestModel request);
        string GenerateJwtToken(Account user);
    }
}
