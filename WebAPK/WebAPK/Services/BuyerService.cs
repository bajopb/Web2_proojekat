using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPK.Configuration;
using WebAPK.DTO;
using WebAPK.Interfaces;
using WebAPK.Models;

namespace WebAPK.Services
{
    public class BuyerService : IBuyerService
    {

        private readonly IMapper _mapper;
        private readonly Web2DbContext _dbContext;

        public BuyerService(IMapper mapper, Web2DbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }

        public async Task<ResponseDTO> CancelOrder(int orderID)
        {
            Order o = await _dbContext.Orders.FirstOrDefaultAsync(x=>x.Id==orderID);
            if ((DateTime.UtcNow - o.OrderTime).TotalMinutes < 1) {
                o.IsCancelled = true;
                foreach (Item i in o.Items) {
                    Product p = await _dbContext.Products.FirstOrDefaultAsync(x=>x.Id==i.ProductId);
                    if (p != null)
                    {
                        p.Amount += i.Amount;
                        _dbContext.Products.Update(p);
                    }
                }
                _dbContext.Orders.Update(o);
                await _dbContext.SaveChangesAsync();
                return new ResponseDTO("Uspesno otkazana porudzbina");
            }
           
            return new ResponseDTO("Dozvoljeno vreme za otkazivanje porudzbine je isteklo");
        }

        public async Task<List<ProductDTO>> GetAllProducts()
        {
            var products = await _dbContext.Products.ToListAsync();
            var productDTOs = _mapper.Map<List<ProductDTO>>(products);
            return productDTOs;
        }

        public async Task<ResponseDTO> NewOrder(NewOrderDto newOrderDto)
        {
            Order o = _mapper.Map<Order>(newOrderDto);
            User u = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == newOrderDto.UserId);

            if (string.IsNullOrEmpty(newOrderDto.DeliveryAddress))
                o.DeliveryAddress = u.Address;

            o.OrderTime = DateTime.UtcNow;
            o.OrderPrice = 0;
            o.UserId = newOrderDto.UserId;
            
            foreach (NewItemDto newItemDto in newOrderDto.Items)
            {
                Product p = await _dbContext.Products.FirstOrDefaultAsync(x => x.Id == newItemDto.ProductId);
                if (p == null)
                    return new ResponseDTO("Proizvod nije trenutno na stanju");

                if (newItemDto.Amount < 1)
                    return new ResponseDTO("Količina ne može biti manja od 1");

                if (newItemDto.Amount > p.Amount)
                    return new ResponseDTO("Nedovoljno proizvoda u magacinu");

                Item i = _mapper.Map<Item>(newItemDto);
                i.Name = p.Name;
                i.Price = p.Price;
                i.ProductId = p.Id;
                // Dodajte cenu za svaki proizvod na ukupnu cenu narudžbine
                o.OrderPrice += i.Price * i.Amount;
                // Oduzmite količinu naručenih proizvoda iz magacina
                p.Amount -= i.Amount;
                _dbContext.Products.Update(p);

                // Dodajte stavku u narudžbinu
                o.Items.Add(i);
            }

            o.DeliveryTime = DateTime.Now.AddHours(1).AddMinutes(new Random().Next(180));

            // Dodajte narudžbinu u bazu i sačuvajte promene
            await _dbContext.Orders.AddAsync(o);
            await _dbContext.SaveChangesAsync();

            return new ResponseDTO("Uspešno ste kreirali porudžbinu");
        }



        public async Task<List<OrderDTO>> OrderHistory(int profileID)
        {
            List<Order> orders = await _dbContext.Orders.Where(x=>x.UserId==profileID).ToListAsync();

            List<OrderDTO> order = _mapper.Map<List<OrderDTO>>(orders);

            return order;
        }

    }
}
