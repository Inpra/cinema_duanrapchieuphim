using Newtonsoft.Json;

namespace Cinema.Entity
{
	public class Comment: IEntity
	{
		public int Id { get; set; }
		public string Content { get; set; }

		public DateTime CreateDate { get; set; }

		public User? User { get; set; }
		[JsonIgnore]
		public Film? Film { get; set; }
	}
}
