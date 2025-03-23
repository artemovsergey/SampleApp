using Microsoft.EntityFrameworkCore;
using SampleApp.API.Entities;

namespace SampleApp.API.Data;

public class SampleContext : DbContext
{
    public DbSet<User> Users {get; set;}

    public SampleContext(DbContextOptions<SampleContext> opt) : base(opt)
    {
        
    }
}