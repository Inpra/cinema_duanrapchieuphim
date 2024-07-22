namespace Cinema.Entity
{
	public class Booking: IEntity
	{
		public int Id { get; set; }

		public Film? Film { get; set; }

		public DateTime Date { get; set; }

		public int? Slot { get; set; }

		public List<String>? Position { get; set; }

		public decimal? TotalPrice { get; set; }
		
		public Theater? Theater { get; set; }

		public User? User { get; set; }

		public int? Quantity { get; set; }
	}
}
