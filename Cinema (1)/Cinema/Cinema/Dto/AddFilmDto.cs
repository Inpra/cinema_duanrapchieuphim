namespace Cinema.Dto
{
	public class AddFilmDto
	{
		public string? Name { get; set; }

		public string? TrailerLink { get; set; }

		public string? Director { get; set; }

		public string? Actor { get; set; }

		public DateTime PublishDate { get; set; }

		public int hours { get; set; }

		public string? ImageUrl { get; set; }

		public string? Language { get; set; }
	}
}
