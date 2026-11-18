using api.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

[ApiController]
[Route("api")]
public class CatalogController(AppDbContext db) : ControllerBase
{
    [HttpGet("products")]
    public async Task<IActionResult> Products() =>
        Ok(await db.Products.Where(p => p.Stock > 0).ToListAsync());

    [HttpGet("vouchers")]
    public async Task<IActionResult> Vouchers() => Ok(await db.Vouchers.ToListAsync());

    [HttpGet("users/{id:int}")]
    public async Task<IActionResult> User(int id)
    {
        var u = await db.Users.FindAsync(id);
        return u is null ? NotFound() : Ok(new { u.Id, u.UniversityId, u.Points });
    }
}