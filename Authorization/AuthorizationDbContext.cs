using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace SPP_1.Authorization
{
    public class AuthorizationDbContext : IdentityDbContext<Account>
    {
        public AuthorizationDbContext(DbContextOptions<AuthorizationDbContext> opts) : base(opts) { }
    }
}
