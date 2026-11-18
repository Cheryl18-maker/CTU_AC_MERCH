using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;

public record OrderItemDto(int ProductId, string? Size, string? Color, int Quantity);
public record CreateOrderDto(int? UserId, string PaymentMethod, int? VoucherId, List<OrderItemDto> Items);

[ApiController]
[Route("api/orders")]
public class OrdersController(AppDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> Create(CreateOrderDto dto)
    {
        if (dto.Items.Count == 0) return BadRequest(new { message = "Cart is empty." });
        if (dto.PaymentMethod is not ("Cash" or "GCash")) return BadRequest(new { message = "Invalid payment method." });

        await using var tx = await db.Database.BeginTransactionAsync();
        var order = new Order { PaymentMethod = dto.PaymentMethod, UserId = dto.UserId };

        foreach (var line in dto.Items)
        {
            var p = await db.Products.FindAsync(line.ProductId);
            if (p is null || line.Quantity < 1) return BadRequest(new { message = "Invalid item." });
            if (p.Stock < line.Quantity) return BadRequest(new { message = $"Not enough stock for {p.Name}." });
            p.Stock -= line.Quantity;
            order.Items.Add(new OrderItem
            {
                ProductId = p.Id, ProductName = p.Name, Size = line.Size, Color = line.Color,
                Quantity = line.Quantity, UnitPrice = p.Price
            });
        }

        order.Subtotal = order.Items.Sum(i => i.UnitPrice * i.Quantity);

        User? user = null;
        if (dto.UserId is not null) user = await db.Users.FindAsync(dto.UserId);

        if (dto.VoucherId is not null && user is not null)
        {
            var v = await db.Vouchers.FindAsync(dto.VoucherId);
            if (v is not null && user.Points >= v.PointsCost && order.Subtotal >= v.MinSpend)
            {
                order.Discount = v.Discount;
                user.Points -= v.PointsCost;
            }
        }

        order.Total = order.Subtotal - order.Discount;
        order.EarnedPoints = user is null ? 0 : (int)(order.Total / 16); // change your points rule here
        if (user is not null) user.Points += order.EarnedPoints;

        var seq = await db.Orders.CountAsync() + 1;
        order.OrderNo = $"CTU-{DateTime.Now:MMdd}-{seq:000}";
        order.PickupCode = $"CTU-{seq:000}";
        order.Status = dto.PaymentMethod == "Cash" ? "Pending" : "Paid";

        db.Orders.Add(order);
        await db.SaveChangesAsync();
        await tx.CommitAsync();
        return Ok(ToDto(order));
    }

    [HttpGet("{orderNo}")]
    public async Task<IActionResult> Get(string orderNo)
    {
        var o = await db.Orders.Include(x => x.Items).FirstOrDefaultAsync(x => x.OrderNo == orderNo);
        return o is null ? NotFound() : Ok(ToDto(o));
    }

    private static object ToDto(Order o) => new
    {
        o.OrderNo, o.PickupCode, o.PaymentMethod, o.Status, o.Subtotal, o.Discount, o.Total, o.EarnedPoints, o.CreatedAt,
        Items = o.Items.Select(i => new { i.ProductName, i.Size, i.Color, i.Quantity, i.UnitPrice, i.LineTotal })
    };
}