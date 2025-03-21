using System.ComponentModel.DataAnnotations;
using SampleApp.API.Validations;

namespace SampleApp.API.Entities;

public class User{
    public int Id {get; set;}

    [MinLength(5,ErrorMessage = "Минимальное длина имени 5")]
    [UserNameMaxLengthValidation(10)]
    public string Name {get ;set;} = String.Empty;
}