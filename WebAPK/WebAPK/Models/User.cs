using System;
using System.Collections.Generic;
using WebAPK.Models.Enums;

namespace WebAPK.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public DateTime Birthday { get; set; }

    public string Address { get; set; } = null!;

    public TipKorisnika Type { get; set; }

    public VerifikacijaStatus VerificationStatus { get; set; }

    public byte[]? Image { get; set; }

    public virtual List<Order> Orders { get; set; } = new List<Order>();

    public virtual List<Product> Products { get; set; } = new List<Product>();
}
