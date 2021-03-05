using System.ComponentModel.DataAnnotations;

namespace SPP_1.Models.Request
{
    public class PostAuthLoginRequestModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
