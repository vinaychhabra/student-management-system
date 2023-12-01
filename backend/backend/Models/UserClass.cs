namespace backend.Models
{
    public class UserClass
    {
        public Guid UserID { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string UserRole { get; set; }
    }
}
