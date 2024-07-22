using Cinema.Entity;

namespace Cinema.Dto
{
	public class AddBookingDto
	{
		public int? FilmId { get; set; }

		public DateTime Date { get; set; }

		public int? Slot { get; set; }

		public List<String>? Position { get; set; }

		public decimal? TotalPrice { get; set; }

		public int? UserId { get; set; }

		public int? ThearterId { get; set; }

		public int Quantity { get; set; }
	}
}
