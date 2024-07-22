using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Migrations
{
    /// <inheritdoc />
    public partial class Fix2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NameId",
                table: "Theaters",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Rooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rooms", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Theaters_NameId",
                table: "Theaters",
                column: "NameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Theaters_Rooms_NameId",
                table: "Theaters",
                column: "NameId",
                principalTable: "Rooms",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Theaters_Rooms_NameId",
                table: "Theaters");

            migrationBuilder.DropTable(
                name: "Rooms");

            migrationBuilder.DropIndex(
                name: "IX_Theaters_NameId",
                table: "Theaters");

            migrationBuilder.DropColumn(
                name: "NameId",
                table: "Theaters");
        }
    }
}
