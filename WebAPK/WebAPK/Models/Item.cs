using System;
using System.Collections.Generic;

namespace WebAPK.Models;

public partial class Item
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public int Amount { get; set; }

    public string Name { get; set; } = null!;

    public double Price { get; set; }

    public int OrderId { get; set; }

    public virtual Order Order { get; set; } = null!;

}
