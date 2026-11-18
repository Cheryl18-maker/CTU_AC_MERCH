using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Product> Products => Set<Product>();
    public DbSet<Voucher> Vouchers => Set<Voucher>();
    public DbSet<Order> Orders => Set<Order>();
    public DbSet<OrderItem> OrderItems => Set<OrderItem>();

    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>().HasIndex(u => u.UniversityId).IsUnique();
        b.Entity<Order>().HasIndex(o => o.OrderNo).IsUnique();
        b.Entity<OrderItem>().Ignore(i => i.LineTotal);

        b.Entity<Voucher>().HasData(
            new Voucher { Id = 1, Discount = 25, MinSpend = 250, PointsCost = 300 },
            new Voucher { Id = 2, Discount = 50, MinSpend = 500, PointsCost = 500 },
            new Voucher { Id = 3, Discount = 35, MinSpend = 250, PointsCost = 400 },
            new Voucher { Id = 4, Discount = 65, MinSpend = 250, PointsCost = 650 });

        b.Entity<Product>().HasData(
            // Apparel
            new Product { Id = 1, Name = "CTU Classic Tee", Category = "Apparel", Description = "Soft cotton, relaxed unisex fit", Price = 250, Stock = 18, ImageUrl = "/images/products/tee.png", Sizes = "S,M,L,XL,XXL", Colors = "Black,White" },
            new Product { Id = 2, Name = "CTU Letterman", Category = "Apparel", Description = "Varsity jacket", Price = 579, Stock = 10, ImageUrl = "/images/products/letterman.png", Sizes = "S,M,L,XL" },
            new Product { Id = 3, Name = "CTU Crewneck", Category = "Apparel", Description = "Cozy crewneck sweater", Price = 399, Stock = 12, ImageUrl = "/images/products/crewneck.png", Sizes = "S,M,L,XL" },
            new Product { Id = 4, Name = "CTU Polo Shirt", Category = "Apparel", Description = "Classic polo", Price = 379, Stock = 15, ImageUrl = "/images/products/polo.png", Sizes = "S,M,L,XL" },
            new Product { Id = 5, Name = "CTU Hoodie", Category = "Apparel", Description = "Warm campus hoodie", Price = 479, Stock = 12, ImageUrl = "/images/products/hoodie.png", Sizes = "S,M,L,XL" },
            new Product { Id = 6, Name = "CTU Pants", Category = "Apparel", Description = "Jogger pants", Price = 279, Stock = 14, ImageUrl = "/images/products/pants.png", Sizes = "S,M,L,XL" },
            // Accessories
            new Product { Id = 7, Name = "CTU Pins", Category = "Accessories", Description = "Hard enamel pins", Price = 79, Stock = 60, ImageUrl = "/images/products/pins.png" },
            new Product { Id = 8, Name = "CTU ID Lanyard", Category = "Accessories", Description = "Woven strap, safety clasp", Price = 99, Stock = 50, ImageUrl = "/images/products/lanyard.png" },
            new Product { Id = 9, Name = "CTU Pouch", Category = "Accessories", Description = "Canvas pouch", Price = 139, Stock = 25, ImageUrl = "/images/products/pouch.png" },
            new Product { Id = 10, Name = "CTU ID Holder", Category = "Accessories", Description = "Clear ID window", Price = 69, Stock = 40, ImageUrl = "/images/products/idholder.png" },
            new Product { Id = 11, Name = "CTU Card Wallet", Category = "Accessories", Description = "Faux leather, 4 card slots", Price = 199, Stock = 20, ImageUrl = "/images/products/wallet.png" },
            new Product { Id = 12, Name = "CTU Tote Bag", Category = "Accessories", Description = "Natural, heavy weight", Price = 250, Stock = 20, ImageUrl = "/images/products/tote.png" },
            // Collectibles
            new Product { Id = 13, Name = "CTU Stickers", Category = "Collectibles", Description = "Sticker pack", Price = 49, Stock = 100, ImageUrl = "/images/products/stickers.png" },
            new Product { Id = 14, Name = "CTU Pen", Category = "Collectibles", Description = "Ballpoint pen", Price = 59, Stock = 80, ImageUrl = "/images/products/pen.png" },
            new Product { Id = 15, Name = "CTU Keychain", Category = "Collectibles", Description = "Acrylic keychain", Price = 89, Stock = 50, ImageUrl = "/images/products/keychain.png" },
            new Product { Id = 16, Name = "CTU Pennant Flag", Category = "Collectibles", Description = "Felt pennant", Price = 149, Stock = 30, ImageUrl = "/images/products/pennant.png" },
            new Product { Id = 17, Name = "CTU Cap", Category = "Collectibles", Description = "Embroidered cap", Price = 280, Stock = 15, ImageUrl = "/images/products/cap.png" },
            new Product { Id = 18, Name = "CTU Notebook", Category = "Collectibles", Description = "2026 notebook", Price = 129, Stock = 40, ImageUrl = "/images/products/notebook.png" },
            // Drinkware
            new Product { Id = 19, Name = "CTU Water Bottle", Category = "Drinkware", Description = "Clear / orange · 750 mL", Price = 249, Stock = 30, ImageUrl = "/images/products/bottle.png" },
            new Product { Id = 20, Name = "CTU Travel Mug", Category = "Drinkware", Description = "400 mL, spill-resistant lid", Price = 239, Stock = 25, ImageUrl = "/images/products/travelmug.png" },
            new Product { Id = 21, Name = "CTU Glass Cup", Category = "Drinkware", Description = "450 mL, BPA-free", Price = 149, Stock = 25, ImageUrl = "/images/products/glasscup.png" },
            new Product { Id = 22, Name = "CTU Steel Tumbler", Category = "Drinkware", Description = "750 mL, BPA-free", Price = 349, Stock = 20, ImageUrl = "/images/products/tumbler.png" },
            new Product { Id = 23, Name = "CTU Mug", Category = "Drinkware", Description = "Orange · 350 mL", Price = 129, Stock = 35, ImageUrl = "/images/products/mug.png" },
            new Product { Id = 24, Name = "CTU Coffee Cup", Category = "Drinkware", Description = "Cream · 350 mL", Price = 450, Stock = 15, ImageUrl = "/images/products/coffeecup.png" });
    }
}