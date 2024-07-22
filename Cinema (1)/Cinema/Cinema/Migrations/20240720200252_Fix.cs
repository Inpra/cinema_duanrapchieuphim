using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Migrations
{
    /// <inheritdoc />
    public partial class Fix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Time",
                table: "Bookings");

            migrationBuilder.AddColumn<int>(
                name: "Slot",
                table: "Bookings",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Slot",
                table: "Bookings");

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
