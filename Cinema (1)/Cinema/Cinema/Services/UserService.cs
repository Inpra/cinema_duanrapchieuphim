using Cinema.Dto;
using Cinema.Entity;
using Cinema.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
	public class UserService: IUserService
	{
		private readonly IRepository<User> _userRepository;
		private readonly IRepository<Role> _roleRepository;

		public UserService (IRepository<User> userRepository, IRepository<Role> roleRepository)
		{
			_userRepository = userRepository;
			_roleRepository = roleRepository;
		}

		public async Task<List<User>> GetUsers()
		{
			return await _userRepository.Get().Where(x => x.Role.Name == "USER").ToListAsync();
		}

		public async Task<User> Login(LoginDto loginDto)
		{
			var user = await _userRepository.Get().Include(x => x.Role).Where(x => x.Email == loginDto.Email).SingleOrDefaultAsync();
			if (user == null)
			{
				throw new Exception("Không tìm thấy tài khoản");
			}
			if (user.Password != loginDto.Password) {
				throw new Exception("Sai mật khẩu");
			}

			return user;
		}

		public async Task<User> Register(RegisterDto registerDto)
		{
			var role = _roleRepository.Get().Where(x => x.Name == "USER").First();

			var newUser = new User
			{
				Email = registerDto.Email,
				Password = registerDto.Password,
				Address = registerDto.Address,
				FullName = registerDto.FullName,
				PhoneNumber = registerDto.PhoneNumber,
				Ammount = 0,
				Role = role,
			};

			await _userRepository.AddAsync(newUser);
			await _userRepository.SaveChangesAsync();

			return newUser;

		}

		public async Task UpdateUser(UpdateUser updateUser)
		{
			var user = await _userRepository.Get().Include(x => x.Role).Where(x => x.Id == updateUser.Id).SingleOrDefaultAsync();
			if (user == null)
			{
				throw new Exception("Không tìm thấy tài khoản");
			}
			
			user.Address = updateUser.Address;
			user.PhoneNumber = updateUser.PhoneNumber;
			user.FullName = updateUser.Name;

			_userRepository.Update(user);
			await _userRepository.SaveChangesAsync();
		}

		public async Task<User> User(int id)
		{
			var user = await _userRepository.Get().Where(x => x.Id == id).SingleOrDefaultAsync();
			if (user == null)
			{
				throw new Exception("Không tìm thấy tài khoản");
			}
			return user;
		}
	}
}
