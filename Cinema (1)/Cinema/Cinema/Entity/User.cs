using System.Data;

namespace Cinema.Entity
{
	public class User : IEntity
	{
		public int Id { get; set; }
		public string FullName { get; set; } = string.Empty!;
		public string Email { get; set; } = string.Empty!;
		public string PhoneNumber { get; set; } = string.Empty!;
		public string Password { get; set; } = string.Empty!;
		public string Address { get; set; } = string.Empty!;
		public decimal? Ammount { get; set; }
		public Role Role { get; set; }
	}
}
