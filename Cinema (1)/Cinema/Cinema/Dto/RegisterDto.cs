﻿namespace Cinema.Dto
{
	public class RegisterDto
	{
		public string FullName { get; set; } = string.Empty!;
		public string Email { get; set; } = string.Empty!;
		public string PhoneNumber { get; set; } = string.Empty!;
		public string Password { get; set; } = string.Empty!;
		public string Address { get; set; } = string.Empty!;
	}
}
