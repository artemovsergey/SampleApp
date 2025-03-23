using Microsoft.EntityFrameworkCore;
using SampleApp.API.Data;
using SampleApp.API.Repositories;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserRepository, UsersLocalRepository>();
builder.Services.AddCors();
// builder.Services.AddDbContext<SampleContext>(o => o.UseNpgsql(config.GetConnectionString("PostgreSQL")));
builder.Services.AddDbContext<SampleContext>(o => o.UseSqlite(builder.Configuration.GetConnectionString("SQLite")));

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();


