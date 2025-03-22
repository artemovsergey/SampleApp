using SampleApp.API.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton<IUserRepository, UsersMemoryRepository>();
builder.Services.AddCors();

var app = builder.Build();
app.UseHttpsRedirection();
app.UseCors(o => o.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();
app.MapControllers();

app.Run();


