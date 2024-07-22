using Cinema.Dto;
using Cinema.Entity;

namespace Cinema.Services
{
	public interface IUserService
	{
		Task<User> Login (LoginDto loginDto);
		Task<User> Register(RegisterDto registerDto);
		Task<User> User(int id);
		Task<List<User>> GetUsers();
		Task UpdateUser(UpdateUser updateUser);
	}
}
