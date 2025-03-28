using System.Security.Cryptography;
using System.Text;
using Bogus;
using Microsoft.AspNetCore.Mvc;
using SampleApp.API.Data;
using SampleApp.API.Dtos;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;

[ApiController]
[Route("api/[controller]")]
public class SeedController : ControllerBase
{
    private readonly ITokenService _tokenService;
    private readonly SampleContext db;
    public SeedController(SampleContext _db, ITokenService tokenService)
    {
      _tokenService = tokenService;
      db = _db;
    }

  
    [HttpGet("generate")]
    public ActionResult SeedUsers()
    {

        using var hmac = new HMACSHA512();

        Faker<UserDto> _faker = new Faker<UserDto>("en")
            .RuleFor(u => u.Login, f => GenerateLogin(f).Trim())
            .RuleFor(u => u.Password, f => GeneratePassword(f).Trim().Replace(" ", ""));

        string GenerateLogin(Faker faker)
        {
            return faker.Random.Word() + faker.Random.Number(3, 5);
        }

        string GeneratePassword(Faker faker)
        {
            return faker.Random.Word() + faker.Random.Number(3, 5);
        }

        var users = _faker.Generate(100).Where(u => u.Login.Length > 4 && u.Login.Length <= 10);

        List<User> userToDb = new List<User>();

        try
        {
            foreach (var user in users)
            {
                var u = new User()
                {
                    Login = user.Login,
                    PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(user.Password)),
                    PasswordSalt = hmac.Key,
                    Token = _tokenService.CreateToken(user.Login)
                    
                };
                userToDb.Add(u);
            }
            db.Users.AddRange(userToDb);
            db.SaveChanges();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"{ex.InnerException!.Message}");
        }

        return Ok(userToDb);
    }

}