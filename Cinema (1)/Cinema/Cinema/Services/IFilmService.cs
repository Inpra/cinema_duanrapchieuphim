using Cinema.Dto;
using Cinema.Entity;

namespace Cinema.Services
{
	public interface IFilmService
	{
		Task<Film> GetFilmById(int id);
		Task<List<Film>> GetFilms();

		Task<Film> GetFilmWithTheaterById(int id);

		Task AddComment (CommentDto comment);

		Task Add(AddFilmDto addFilmDto);
	}
}
