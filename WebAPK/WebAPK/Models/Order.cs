using System;
using System.Collections.Generic;

namespace WebAPK.Models;

public partial class Order
{
    public int Id { get; set; }

    public string DeliveryAddress { get; set; } = null!;

    public DateTime OrderTime { get; set; }

    public DateTime DeliveryTime { get; set; }

    public string? Comment { get; set; }

    public double OrderPrice { get; set; }

    public bool IsCancelled { get; set; }

    public int UserId { get; set; }

    public virtual List<Item> Items { get; set; } = new List<Item>();

    public virtual User User { get; set; } = null!;
}
