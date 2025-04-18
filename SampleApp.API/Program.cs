using Microsoft.AspNetCore.Diagnostics;
using Microsoft.EntityFrameworkCore;
using SampleApp.API.Data;
using SampleApp.API.Extensions;
using SampleApp.API.Interfaces;
using SampleApp.API.Middleware;
using SampleApp.API.Repositories;
using SampleApp.API.Services;

var builder = WebApplication.CreateBuilder(args);
var config = builder.Configuration;
// builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IUserRepository, UsersLocalRepository>();
builder.Services.AddCors();

// builder.Services.AddDbContext<SampleContext>(o => o.UseNpgsql(config.GetConnectionString("PostgreSQL")));
builder.Services.AddDbContext<SampleContext>(o => o.UseNpgsql(builder.Configuration.GetConnectionString("PostgreSQL")));
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddAuthorization();
builder.Services.AddJwtServices(config);


var app = builder.Build();
app.UseHttpsRedirection();
app.UseMiddleware<SampleApp.API.Middleware.ExceptionHandlerMiddleware>();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
// app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();


