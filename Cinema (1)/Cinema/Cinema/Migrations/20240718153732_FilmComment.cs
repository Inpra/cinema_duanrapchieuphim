using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Cinema.Migrations
{
    /// <inheritdoc />
    public partial class FilmComment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Films",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TrailerLink = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Director = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Actor = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PublishDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    hours = table.Column<int>(type: "int", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Films", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreateDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    FilmId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_Films_FilmId",
                        column: x => x.FilmId,
                        principalTable: "Films",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_FilmId",
                table: "Comments",
                column: "FilmId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UserId",
                table: "Comments",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Films");
        }
    }
}
