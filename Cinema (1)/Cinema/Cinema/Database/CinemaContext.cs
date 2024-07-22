using Cinema.Entity;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Database
{
	public class CinemaContext: DbContext
	{
		public DbSet<User> users { get; set; }
		public DbSet<Role> roles { get; set; }
		public DbSet<Film> Films { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<Booking> Bookings { get; set; }
		public DbSet<Theater> Theaters { get; set; }
		public DbSet<Room> Rooms { get; set; }
		public CinemaContext(DbContextOptions options): base(options) { }
	}
}
