using Microsoft.AspNetCore.Mvc;

namespace SampleApp.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class WeatherForecastController : ControllerBase
{

    [HttpGet]
    public ActionResult TestRequest(){


        return Ok();
    }
    
}