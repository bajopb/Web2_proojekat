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

        public async Task<ResponseDTO> NewOrder(OrderDTO orderDto, int buyerID)
        {
            Order o=_mapper.Map<Order>(orderDto);
            User u = await _dbContext.Users.FirstOrDefaultAsync(x=>x.Id==buyerID);
            if (string.IsNullOrEmpty(orderDto.DeliveryAddress))
                o.DeliveryAddress = u.Address;
            o.UserId = buyerID;
            o.OrderTime = DateTime.UtcNow;
            foreach (Item i in o.Items) { 
                Product p=await _dbContext.Products.FirstOrDefaultAsync(x=>x.Id==i.ProductId);
                if (i.Amount < 1) return new ResponseDTO("Kolicina ne moze biti manja od 1");
                if (i.Amount > p.Amount) return new ResponseDTO("Nedovoljno proizvoda u magacinu");
                p.Amount -= i.Amount;
                _dbContext.Products.Update(p);
                i.Name = p.Name;
                i.Price = p.Price;
                o.OrderPrice += i.Price * i.Amount+250;
                o.DeliveryTime=DateTime.Now.AddHours(1).AddMinutes(new Random().Next(180));
                _dbContext.Orders.Add(o);
                await _dbContext.SaveChangesAsync();
            }
            return new ResponseDTO("Uspensno ste kreirali porudzbinu");

        }

        public async Task<List<OrderDTO>> OrderHistory(int profileID)
        {
            User u = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == profileID);
            if (u == null)
                return null;
            return _mapper.Map<List<OrderDTO>>(u.Orders.FindAll(x=>x.IsCancelled).OrderByDescending(x=>x.OrderTime));
        }
    }
}
