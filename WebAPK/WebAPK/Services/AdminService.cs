using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPK.Configuration;
using WebAPK.DTO;
using WebAPK.Interfaces;
using WebAPK.Models;
using WebAPK.Models.Enums;

namespace WebAPK.Services
{
    public class AdminService : IAdminService
    {
        private readonly IMapper _mapper;
        private readonly Web2DbContext _dbContext;

        public AdminService(IMapper mapper, Web2DbContext dbContext) {
            _mapper = mapper;
            _dbContext = dbContext; 
        }
        public async Task<List<OrderDTO>> GetAllOrders()
        {
            return _mapper.Map<List<OrderDTO>>(await  _dbContext.Orders.ToListAsync());
        }

        public async Task<List<UserDTO>> GetAllSellers()
        {
            return _mapper.Map<List<UserDTO>>(await _dbContext.Users.Where(x=>x.Type==TipKorisnika.Prodavac).ToListAsync());
        }

        public async  Task<List<UserDTO>> GetVerifiedSellers()
        {
            return _mapper.Map<List<UserDTO>>(await _dbContext.Users.Where(x => x.Type == TipKorisnika.Prodavac && x.VerificationStatus==VerifikacijaStatus.Prihvacen).ToListAsync());
        }

        public async  Task<ResponseDTO> SetStatus(int profileID, VerifikacijaStatus status)
        {
            User u = await _dbContext.Users.FindAsync(profileID);
            if (u == null) {
                return new ResponseDTO("Korisnik ne postoji");
            }
            u.VerificationStatus = status;

            await _dbContext.SaveChangesAsync();
            return new ResponseDTO("Uspesna verifikacija");
        }
    }
}
