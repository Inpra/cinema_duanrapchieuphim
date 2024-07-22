using Cinema.Repositories;
using Cinema.Services;

namespace Cinema.Extension
{
	public static class ServiceCollectionExtensions
	{
		public static void Register(this IServiceCollection services)
		{
			services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
			services.AddScoped<IUserService, UserService>();
			services.AddScoped<IFilmService, FilmService>();
			services.AddScoped<IBookingService, BookingService>();
			services.AddScoped<ITheaterService, TheaterService>();
			services.AddScoped<IRoomService, RoomService>();
		}
	}
}
