using Projects;


var builder = DistributedApplication.CreateBuilder(args);


// 1. Существующие контейнеры через compose
builder.AddContainer("sampleapp-api","sampleapp.api");
var api = builder.AddProject<Projects.SampleApp_API>("API").WithArgs("--framework", "net9.0");


// Добавляем зависимости (например, PostgreSQL)
var db = builder.AddPostgres("postgres")
    .AddDatabase("mydb");

// Связываем API с БД
api.WithReference(db);

builder.Build().Run();
