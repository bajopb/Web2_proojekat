using WebAPK.Models;

namespace WebAPK.DTO
{
    public class NewOrderDto
    {

        public string DeliveryAddress { get; set; } = null!;



        public string? Comment { get; set; }



        public int UserId { get; set; }

        public virtual List<NewItemDto> Items { get; set; } = new List<NewItemDto>();

    }
}
