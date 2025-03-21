var builder = WebApplication.CreateBuilder(args);
builder.Services.AddOpenApi();
builder.Services.AddControllers();

var app = builder.Build();
app.MapOpenApi();
app.MapControllers();
app.UseHttpsRedirection();
app.Run();


