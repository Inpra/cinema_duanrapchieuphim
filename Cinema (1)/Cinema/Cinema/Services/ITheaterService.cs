using Cinema.Entity;

namespace Cinema.Services
{
	public interface ITheaterService
	{
		Task<List<Theater>> GetTheater(int filmId);

	}
}
