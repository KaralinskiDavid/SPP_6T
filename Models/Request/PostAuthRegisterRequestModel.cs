using System.ComponentModel.DataAnnotations;

namespace SPP_1.Models.Request
{
    public class PostAuthRegisterRequestModel
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
