using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class InitialMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployersPortfolio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployersPortfolio", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LocationsPortfolio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LocationsPortfolio", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ShiftsPortfolio",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmployerId = table.Column<int>(type: "int", nullable: false),
                    LocationId = table.Column<int>(type: "int", nullable: false),
                    Start1 = table.Column<DateTime>(type: "datetime2", nullable: false),
                    End1 = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Duration1 = table.Column<TimeSpan>(type: "time", nullable: true),
                    Penalty1 = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Start2 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    End2 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Duration2 = table.Column<TimeSpan>(type: "time", nullable: true),
                    Penalty2 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Start3 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    End3 = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Duration3 = table.Column<TimeSpan>(type: "time", nullable: true),
                    Penalty3 = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    ShiftStart = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShiftEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShiftDuration = table.Column<TimeSpan>(type: "time", nullable: false),
                    Rate = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Money = table.Column<decimal>(type: "decimal(18,2)", nullable: true),
                    Paid = table.Column<bool>(type: "bit", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftsPortfolio", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShiftsPortfolio_EmployersPortfolio_EmployerId",
                        column: x => x.EmployerId,
                        principalTable: "EmployersPortfolio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShiftsPortfolio_LocationsPortfolio_LocationId",
                        column: x => x.LocationId,
                        principalTable: "LocationsPortfolio",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShiftsPortfolio_EmployerId",
                table: "ShiftsPortfolio",
                column: "EmployerId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftsPortfolio_LocationId",
                table: "ShiftsPortfolio",
                column: "LocationId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShiftsPortfolio");

            migrationBuilder.DropTable(
                name: "EmployersPortfolio");

            migrationBuilder.DropTable(
                name: "LocationsPortfolio");
        }
    }
}
