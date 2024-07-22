using Cinema.Dto;
using Cinema.Entity;
using Cinema.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
	[ApiController]
	[Route("User")]
	[EnableCors]
	public class UserController : ControllerBase
	{
		private readonly IUserService _userService;

		public UserController(IUserService userService) {
			_userService = userService;
		}

		[HttpPost("login")]
		public async Task<ActionResult<User>> Login(LoginDto loginDto)
		{
			return await _userService.Login(loginDto);
		}

		[HttpPost("register")]
		public async Task<ActionResult<User>> Register(RegisterDto register)
		{
			return await _userService.Register(register);
		}

		[HttpPut("update")]
		public async Task<ActionResult> UpdateUser(UpdateUser updateUser)
		{
			await _userService.UpdateUser(updateUser);
			return Ok();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<User>> User(int id)
		{
			return await _userService.User(id);
		}

		[HttpGet("Users")]
		public async Task<List<User>> Users()
		{
			;
			return await _userService.GetUsers();
		}
	}
}
