using System.ComponentModel.DataAnnotations;
using SampleApp.API.Validations;

namespace SampleApp.API.Entities;

public class User : Base
{

    [MinLength(5, ErrorMessage = "Минимальное длина имени 5")]
    [UserNameMaxLengthValidation(10)]
    public string Name { get; set; } = String.Empty;

    [MinLength(5, ErrorMessage = "Минимальное длина логина 5")]
    public required string Login { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }

    public string Token{get; set;} = string. Empty;
}