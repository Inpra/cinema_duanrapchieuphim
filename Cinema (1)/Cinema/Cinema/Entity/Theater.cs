using Newtonsoft.Json;

namespace Cinema.Entity
{
	public class Theater : IEntity
	{
		public int Id { get; set; }

		

		public int Quantity { get; set; }

		public int Slot { get; set; }

		public DateTime Date { get; set; }

		[JsonIgnore]
		public Film? Film { get; set; }
		public Room? Name { get; set; }

	}
}
