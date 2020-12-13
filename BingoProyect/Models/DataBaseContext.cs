using Microsoft.EntityFrameworkCore;

namespace BingoProyect.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options) : base(options)
        {
            
        }

        public DbSet<Admin> Admins { get; set; }
        public DbSet<Room> Rooms { get; set; }
        public DbSet<Cardboard> Cardboards { get; set; }
    }
}