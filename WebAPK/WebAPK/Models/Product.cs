using System;
using System.Collections.Generic;

namespace WebAPK.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public double Price { get; set; }

    public int Amount { get; set; }

    public string? Description { get; set; }

    public byte[]? Image { get; set; }

    public int SellerId { get; set; }


    public virtual User Seller { get; set; } = null!;
}
