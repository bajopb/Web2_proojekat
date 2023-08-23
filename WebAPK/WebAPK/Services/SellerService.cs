using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPK.Configuration;
using WebAPK.DTO;
using WebAPK.Interfaces;
using WebAPK.Models;
using WebAPK.Models.Enums;

namespace WebAPK.Services
{
    public class SellerService : ISellerSerivice
    {
        private readonly IMapper _mapper;
        private readonly Web2DbContext _dbContext;

        public SellerService(IMapper mapper, Web2DbContext dbContext)
        {
            _mapper = mapper;
            _dbContext = dbContext;
        }
        public async Task<ResponseDTO> AddProduct(ProductDTO productDto)
        {
            if (string.IsNullOrWhiteSpace(productDto.Name))
            {
                return new ResponseDTO("Niste uneli naziv");
            }

            if (productDto.Price <= 0)
            {
                return new ResponseDTO("Uneli ste neispravnu cenu");
            }

            if (productDto.Amount <= 0)
            {
                return new ResponseDTO("Uneli ste neisoravnu kolicinu");
            }

            // Provera da li je Description null ili prazan string
            if (string.IsNullOrWhiteSpace(productDto.Description))
            {
                return new ResponseDTO("Niste uneli opis");
            }

            // Provera da li je Image null
            if (productDto.ImageFile == null)
            {
                return new ResponseDTO("Niste uneli fotografiju");
            }
            Product p = _mapper.Map<Product>(productDto);
            p.Seller = _dbContext.Users.Find(productDto.SellerId);
            if (productDto.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    productDto.ImageFile.CopyTo(ms);
                    p.Image = ms.ToArray();
                }
            }
            _dbContext.Products.Add(p);
            await _dbContext.SaveChangesAsync();
            return new ResponseDTO("Uspesno dodat proizvod");
        }

        public async Task<ResponseDTO> DeleteProduct(int productID)
        {
            Product p = await _dbContext.Products.FindAsync(productID);
            if(p == null)
            {
                return new ResponseDTO("Proizvod ne postoji");
            }
            _dbContext.Products.Remove(p);
            await _dbContext.SaveChangesAsync();
            return new ResponseDTO("Uspesno brisanje");
        }

        public async Task<ProductDTO> EditProduct(ProductDTO productDto)
        {
            Product p = await _dbContext.Products.FindAsync(productDto.Id);
           
            if (p != null)
            {
                p.Name = productDto.Name;
                p.Price = productDto.Price;
                p.Amount = productDto.Amount;
                p.Description = productDto.Description;
                p.Description = productDto.Description;
                if (productDto.ImageFile != null)
                {
                    using (var ms = new MemoryStream())
                    {
                        productDto.ImageFile.CopyTo(ms);
                        p.Image = ms.ToArray();
                    }
                }
                _dbContext.Products.Update(p);
                await _dbContext.SaveChangesAsync();
            }
            return null;
        }

        public Task<List<OrderDTO>> ListNewOrders(int profileID)
        {
            throw new NotImplementedException();
        }

        public async Task<List<OrderDTO>> OrdersHistory(int profileID)
        {
            // Pronađi korisnika (prodavca) na osnovu ID-ja
            User seller = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == profileID);
            if (seller == null || seller.Type != TipKorisnika.Prodavac)
            {
                // Prodavac sa datim ID-jem nije pronađen ili nije tipa "Prodavac"
                // Možete obraditi ovu situaciju prema potrebi
                return new List<OrderDTO>();
            }

            // Dobavi ID-jeve proizvoda koje je ovaj prodavac postavio
            IEnumerable<int> sellerProductIds = await _dbContext.Products
                .Where(p => p.SellerId == seller.Id)
                .Select(p => p.Id)
                .ToListAsync();

            // Dobavi narudžbine koje sadrže proizvode ovog prodavca
            List<Order> orders = await _dbContext.Orders
                .Where(o => o.Items.Any(item => sellerProductIds.Contains(item.ProductId)))
                .Where(o => o.IsCancelled != true)
                .ToListAsync();

            // Koristi AutoMapper za mapiranje narudžbina u DTO objekte
            List<OrderDTO> orderDTOs = _mapper.Map<List<OrderDTO>>(orders);

            return orderDTOs;
        }

    }
}
