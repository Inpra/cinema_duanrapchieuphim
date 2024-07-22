using Cinema.Dto;
using Cinema.Entity;
using Cinema.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
	public class FilmService: IFilmService
	{
		private readonly IRepository<Film> _fimlRepository;
		private readonly IRepository<Comment> _commentRepo;
		private readonly IRepository<User> _userRepo;


		public FilmService (IRepository<Film> repository, IRepository<Comment> repository1, IRepository<User> repository2)
		{
			_fimlRepository = repository;
			_commentRepo = repository1;
			_userRepo = repository2;
		}

		public async Task AddComment(CommentDto comment)
		{
			var user = await _userRepo.Get().Where(x => x.Id == comment.UserId).SingleAsync();
			var film = await _fimlRepository.Get().Where(x => x.Id == comment.FilmId).SingleAsync();

			var newComment = new Comment { User = user, Content = comment.Comment, CreateDate = DateTime.UtcNow, Film = film };

			await _commentRepo.AddAsync(newComment);
			await _commentRepo.SaveChangesAsync();

		}

		public async Task<Film> GetFilmById(int id)
		{
			var film = await _fimlRepository.Get().Include(x => x.Comments).ThenInclude(x => x.User).SingleOrDefaultAsync(x => x.Id == id);

			if(film == null)
			{
				throw new Exception("Không tìm thấy Phim");
			}

			return film;
		}

		public async Task<Film> GetFilmWithTheaterById(int id)
		{
			var film = await _fimlRepository.Get().Include(x => x.Theater).SingleOrDefaultAsync(x => x.Id == id);

			if (film == null)
			{
				throw new Exception("Không tìm thấy Phim");
			}

			return film;
		}

		public async Task<List<Film>> GetFilms()
		{
			return await _fimlRepository.Get().ToListAsync();
		}

		public async Task Add(AddFilmDto addFilmDto)
		{

			var film = new Film
			{
				Name = addFilmDto.Name,
				Actor = addFilmDto.Actor,
				Director = addFilmDto.Director,
				hours = addFilmDto.hours,
				ImageUrl = addFilmDto.ImageUrl,
				Language = addFilmDto.Language,
				TrailerLink = addFilmDto.TrailerLink,
				PublishDate = addFilmDto.PublishDate
			};

			await _fimlRepository.AddAsync(film);
			await _fimlRepository.SaveChangesAsync();

		}
	}
}
