namespace api.Models;

public class User
{
    public int Id { get; set; }
    public string UniversityId { get; set; } = "";
    public DateOnly Birthday { get; set; }
    public int Points { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public string Category { get; set; } = "";
    public string Description { get; set; } = "";
    public decimal Price { get; set; }
    public int Stock { get; set; }
    public string ImageUrl { get; set; } = "";
    public string? Sizes { get; set; }   // "S,M,L,XL"
    public string? Colors { get; set; }  // "Black,White"
}

public class Voucher
{
    public int Id { get; set; }
    public decimal Discount { get; set; }
    public decimal MinSpend { get; set; }
    public int PointsCost { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public string OrderNo { get; set; } = "";
    public string PickupCode { get; set; } = "";
    public int? UserId { get; set; }
    public decimal Subtotal { get; set; }
    public decimal Discount { get; set; }
    public decimal Total { get; set; }
    public string PaymentMethod { get; set; } = "";
    public string Status { get; set; } = "Pending";
    public int EarnedPoints { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public List<OrderItem> Items { get; set; } = new();
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = "";
    public string? Size { get; set; }
    public string? Color { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal LineTotal => UnitPrice * Quantity;
}