using Cinema.Dto;
using Cinema.Entity;
using Cinema.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
	public class RoomService : IRoomService
	{
		private readonly IRepository<Room> _roomRepository;

		public RoomService(IRepository<Room> roomRepository) {
			_roomRepository = roomRepository;
		}
		public async Task Add(AddRoom addRoom)
		{
			await _roomRepository.AddAsync(new Room { Name = addRoom.Name });
			await _roomRepository.SaveChangesAsync();
		}

		public Task<List<Room>> Rooms()
		{
			return _roomRepository.Get().ToListAsync();
		}
	}
}
