using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebAPK.Configuration;
using WebAPK.DTO;
using WebAPK.Interfaces;
using WebAPK.Models;

namespace WebAPK.Services
{
    public class ProfileSerivice : IProfileService
    {

        private readonly Web2DbContext _dbContext;
        private readonly IMapper _mapper;
        public ProfileSerivice(Web2DbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }
        public async Task<ResponseDTO> EditProfile(int profileID, ProfileEditDTO editDTO)
        {
            User u = await _dbContext.Users.FindAsync(profileID);
            if (u == null) {
                return new ResponseDTO("Profil ne postoji");
            }
          
            if (!string.IsNullOrEmpty(editDTO.Username)) {
                if ((await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == editDTO.Username) == null)){
                    return new ResponseDTO("Korisnik sa tim korisnickim imenom ne postoji");
                }
                u.Username = editDTO.Username;
            }
            if (!string.IsNullOrEmpty(editDTO.Firstname))
            {
                u.Firstname = editDTO.Firstname;
            }
            if (!string.IsNullOrEmpty(editDTO.Lastname))
            {
                u.Lastname = editDTO.Lastname;

            }
            if (!string.IsNullOrEmpty(editDTO.Address))
            {
                u.Address = editDTO.Address;

            }
            if (editDTO.Birthday!=null || editDTO.Birthday!=default(DateTime))
            {
                u.Birthday = editDTO.Birthday;

            }
            if (editDTO.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    editDTO.ImageFile.CopyTo(ms);
                    u.Image = ms.ToArray();
                }
            }
            _dbContext.Users.Update(u);
            await _dbContext.SaveChangesAsync();
            return new ResponseDTO("Uspesna promena");
        }

        public async Task<UserDTO> ShowProfile(int profileID)
        {
            return _mapper.Map<UserDTO>(await _dbContext.Users.FindAsync(profileID));
        }
    }
}
