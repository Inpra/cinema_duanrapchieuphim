using Cinema.Database;
using Cinema.Extension;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(opt =>
{
	opt.AddDefaultPolicy(builder =>
	{
		builder.WithOrigins("http://localhost:3000")
			.AllowAnyHeader()
			.AllowAnyMethod();
	});
});
builder.Services.AddControllers().AddNewtonsoftJson();

builder.Services.AddDbContext<CinemaContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Register();

var app = builder.Build();

EnsureMigrate(app);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

app.MapControllers();

app.Run();



void EnsureMigrate(WebApplication webApp)
{
	using var scope = webApp.Services.CreateScope();
	var pimContext = scope.ServiceProvider.GetRequiredService<CinemaContext>();
	pimContext.Database.Migrate();
}
