using Cinema.Dto;
using Cinema.Entity;

namespace Cinema.Services
{
	public interface IBookingService
	{
		Task AddBooking(AddBookingDto addBookingDto);

		Task<List<Booking>> GetBookingsByUserId(int id);

		Task<List<Booking>> GetAll();

		Task<List<string>> GetSeatBooking(int thearterId);

 	}
}
