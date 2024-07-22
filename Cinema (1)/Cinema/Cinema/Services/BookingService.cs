using Cinema.Dto;
using Cinema.Entity;
using Cinema.Repositories;
using Microsoft.EntityFrameworkCore;

namespace Cinema.Services
{
	public class BookingService : IBookingService
	{
		private readonly IRepository<Booking> _bookingRepository;
		private readonly IRepository<User> _userRepository;
		private readonly IRepository<Film> _filmRopository;
		private readonly IRepository<Theater> _thearterRopository;

		public BookingService(IRepository<Booking> bookingRepository, IRepository<User> userRepository, IRepository<Film> filmRopository, IRepository<Theater> theaterRepository)
		{
			_bookingRepository = bookingRepository;
			_userRepository = userRepository;
			_filmRopository = filmRopository;
			_thearterRopository= theaterRepository;
		}

		public async Task AddBooking(AddBookingDto addBookingDto)
		{
			var thear = await _thearterRopository.Get().FirstAsync(x => x.Id == addBookingDto.ThearterId);
			var film = await _filmRopository.Get().FirstAsync(x => x.Id == addBookingDto.FilmId);
			var user = await _userRepository.Get().FirstAsync(x => x.Id == addBookingDto.UserId);
			if (user.Ammount == 0)
			{
				throw new Exception("Vui lòng nạp tiền vào tài khoản");
			}

			var newBooking = new Booking
			{
				Date = addBookingDto.Date,
				Film = film,
				User = user,
				Theater = thear,
				Position = addBookingDto.Position,
				Quantity = addBookingDto.Quantity,
				Slot = addBookingDto.Slot,
				TotalPrice = addBookingDto.TotalPrice,
			};

			user.Ammount = user.Ammount - addBookingDto.TotalPrice;
			thear.Quantity = thear.Quantity - addBookingDto.Quantity;

			await _bookingRepository.AddAsync(newBooking);
			await _userRepository.SaveChangesAsync();
		}

		public async Task<List<Booking>> GetAll()
		{
			return await _bookingRepository.Get().Include(x => x.Film).Include(x => x.User).Include(x => x.Theater).ToListAsync();
		}

		public async Task<List<Booking>> GetBookingsByUserId(int id)
		{
			return await _bookingRepository.Get().Include(x => x.User).Where(x => x.User.Id == id).ToListAsync();
		}

		public async Task<List<string>> GetSeatBooking(int theaterId)
		{
			var bookings = await _bookingRepository.Get()
		.Where(x => x.Theater.Id == theaterId) // Lọc theo theaterId
		.ToListAsync(); // Chuyển thành danh sách

			// Nếu không có đặt chỗ nào, trả về danh sách rỗng
			if (bookings == null || !bookings.Any())
			{
				return new List<string>(); // Hoặc xử lý theo cách khác nếu cần
			}

			// Gộp tất cả các vị trí vào một danh sách duy nhất
			var allPositions = bookings
				.SelectMany(b => b.Position) // Kết hợp các danh sách vị trí
				.Distinct() // Loại bỏ các vị trí trùng lặp nếu cần
				.OrderBy(p => p) // Sắp xếp nếu cần
				.ToList(); // Chuyển đổi thành danh sách

			return allPositions;
		}
	}
}
