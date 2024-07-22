using Cinema.Dto;
using Cinema.Entity;

namespace Cinema.Services
{
	public interface IRoomService
	{
		Task<List<Room>> Rooms();
		Task Add (AddRoom addRoom );
	}
}
