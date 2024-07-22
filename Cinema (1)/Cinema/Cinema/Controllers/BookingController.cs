using Cinema.Dto;
using Cinema.Entity;
using Cinema.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
	[ApiController]
	[Route("Booking")]
	[EnableCors]
	public class BookingController: ControllerBase
	{
		private readonly IBookingService _bookingService;

		public BookingController(IBookingService bookingService)
		{
			_bookingService = bookingService;
		}

		[HttpGet("bookings")]
		public async Task<List<Booking>> GetAll()
		{
			return await _bookingService.GetAll();
		}

		[HttpPost("add")]
		public async Task<ActionResult> AddBooking(AddBookingDto addBookingDto)
		{
			await _bookingService.AddBooking(addBookingDto);

			return Ok();
		}

		[HttpGet("seats/{thearterId}")]
		public async Task<List<string>> GetSeat (int thearterId)
		{
			return await _bookingService.GetSeatBooking(thearterId);

		}

		[HttpGet("user/{userId}")]
		public async Task<List<Booking>> GetBookingsByUserId(int userId)
		{
			return await _bookingService.GetBookingsByUserId(userId);

		}
	}
}
