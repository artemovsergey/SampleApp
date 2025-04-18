using System.Security.Cryptography;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using SampleApp.API.Dtos;
using SampleApp.API.Entities;
using SampleApp.API.Interfaces;
using SampleApp.API.Validations;

namespace SampleApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private HMACSHA512 hmac = new HMACSHA512();
    private readonly IUserRepository _repo;
    private readonly ITokenService _tokenService;

    public UsersController(IUserRepository repo, ITokenService tokenService)
    {
        _repo = repo;
        _tokenService = tokenService;
    }

    [HttpPost]
    public ActionResult CreateUser(UserDto userDto)
    {

        var user = new User()
        {
            Login = userDto.Login,
            PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password)),
            PasswordSalt = hmac.Key,
            Name = "",
            Token = _tokenService.CreateToken(userDto.Login)
        };

        var validator = new FluentValidator();
        var result = validator.Validate(user);
        if (!result.IsValid)
        {
            throw new Exception($"{result.Errors.First().ErrorMessage}");
        }
        return Created("", _repo.CreateUser(user));
    }

    // [Authorize]
    [HttpGet]
    [ResponseCache(Duration = 86400)]
    public ActionResult GetUsers()
    {
        return Ok(_repo.GetUsers());
    }

    [HttpPut]
    public ActionResult UpdateUser(User user)
    {
        return Ok(_repo.EditUser(user, user.Id));
    }

    [HttpGet("{id}")]
    public ActionResult GetUserById(int id)
    {
        return Ok(_repo.FindUserById(id));
    }

    [HttpDelete]
    public ActionResult DeleteUser(int id)
    {
        return Ok(_repo.DeleteUser(id));
    }

    [HttpPost("Login")]
    public ActionResult Login(UserDto userDto)
    {
        var user = _repo.FindUser(userDto.Login);
        return CheckPasswordHash(userDto, user);
    }

    private ActionResult CheckPasswordHash(UserDto userDto, User user)
    {

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(userDto.Password));

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i])
            {
                return Unauthorized($"Неправильный пароль");
            }
        }

        return Ok(user);
    }

}