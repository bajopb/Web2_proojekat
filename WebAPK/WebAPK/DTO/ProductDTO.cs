namespace WebAPK.DTO
{
    public class ProductDTO
    {
        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public double Price { get; set; }

        public int Amount { get; set; }

        public string? Description { get; set; }

        public IFormFile? ImageFile { get; set; }


        public int SellerId { get; set; }
    }
}
