using System.ComponentModel.DataAnnotations;

namespace SampleApp.API.Dtos;

public class UserDto
{
    [MinLength(5, ErrorMessage = "Минимальное длина логина 5")]
    public string Login { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}