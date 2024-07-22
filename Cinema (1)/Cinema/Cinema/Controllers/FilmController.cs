using Cinema.Dto;
using Cinema.Entity;
using Cinema.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace Cinema.Controllers
{
	[ApiController]
	[Route("Film")]
	[EnableCors]
	public class FilmController : ControllerBase
	{
		private readonly IFilmService _filmService;

		public FilmController(IFilmService filmService) {
			_filmService = filmService;
		}


		[HttpGet("films")]
		public async Task<ActionResult<List<Film>>> Films()
		{
			return await _filmService.GetFilms();
		}

		[HttpPost("add")]
		public async Task<ActionResult> Add(AddFilmDto addFilmDto)
		{
			await _filmService.Add(addFilmDto);
			return Ok();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Film>> GetFilm(int id)
		{
			return await _filmService.GetFilmById(id);
		}

		[HttpGet("withThearter/{id}")]
		public async Task<ActionResult<Film>> GetFilmWithThearter(int id)
		{
			return await _filmService.GetFilmWithTheaterById(id);
		}


		[HttpPost("addComment")]
		public async Task<ActionResult<Film>> AddComment(CommentDto commentDto)
		{
			await _filmService.AddComment(commentDto);
			return Ok();
		}
	}
}
