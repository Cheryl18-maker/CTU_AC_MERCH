using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

public record AuthRequest(string UniversityId, DateOnly Birthday);

[ApiController]
[Route("api/auth")]
public class AuthController(AppDbContext db) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register(AuthRequest req)
    {
        var id = req.UniversityId.Trim();
        if (string.IsNullOrEmpty(id)) return BadRequest(new { message = "University ID is required." });
        if (await db.Users.AnyAsync(u => u.UniversityId == id))
            return Conflict(new { message = "This University ID is already registered." });

        var user = new User { UniversityId = id, Birthday = req.Birthday };
        db.Users.Add(user);
        await db.SaveChangesAsync();
        return Ok(new { user.Id, user.UniversityId, user.Points });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(AuthRequest req)
    {
        var id = req.UniversityId.Trim();
        var user = await db.Users.FirstOrDefaultAsync(u => u.UniversityId == id && u.Birthday == req.Birthday);
        if (user is null) return Unauthorized(new { message = "University ID or birthday is incorrect." });
        return Ok(new { user.Id, user.UniversityId, user.Points });
    }
}