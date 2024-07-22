using Cinema.Dto;
using Cinema.Entity;
using Cinema.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
	[ApiController]
	[Route("theater")]
	[EnableCors]
	public class ThearterController : ControllerBase
	{
		private readonly ITheaterService _theaterService;
		private readonly IRoomService _roomService;

		public ThearterController (ITheaterService theaterService, IRoomService roomService)
		{
			_theaterService = theaterService;
			_roomService = roomService;
		}

		[HttpGet("{filmId}")]
		public async Task<List<Theater>> GetTheaters(int filmId) {
			return await _theaterService.GetTheater(filmId);
		}

		[HttpGet("rooms")]
		public async Task<List<Room>> GetRooms()
		{
			return await _roomService.Rooms();
		}

		[HttpPost("add")]
		public async Task<ActionResult> Add(AddRoom addRoom)
		{
			await _roomService.Add(addRoom);
			return Ok();
		}
			
	}
}
