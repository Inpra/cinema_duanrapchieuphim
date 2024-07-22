using Cinema.Entity;
using Cinema.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
	public class TheaterService : ITheaterService
	{
		private readonly IRepository<Theater> _theaterRepository;

		public TheaterService(IRepository<Theater> theaterRepository)
		{
			_theaterRepository = theaterRepository;
		}

		public async Task<List<Theater>> GetTheater(int filmId)
		{
			return await _theaterRepository.Get().Include(x => x.Film).Where(x => x.Film.Id == filmId).ToListAsync();
		}

		
	}
}
