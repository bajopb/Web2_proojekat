using AutoMapper;
using Google.Apis.Auth;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Tls.Crypto.Impl.BC;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using WebAPK.Configuration;
using WebAPK.DTO;
using WebAPK.Interfaces;
using WebAPK.Models;
using WebAPK.Models.Enums;

namespace WebAPK.Services
{
    public class UserService : IUserService
    {
        private readonly IMapper _mapper;
        private readonly Web2DbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(IMapper mapper, Web2DbContext dbContext, IConfiguration configuration)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _configuration = configuration;
        }

        public async Task<ResponseDTO> GoogleLogin(string token)
        {
            string clientid = _configuration["Google:ClientID"];
            GoogleJsonWebSignature.ValidationSettings settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string>() { _configuration["Google:ClientID"]! }
            };
            GoogleJsonWebSignature.Payload data = await GoogleJsonWebSignature.ValidateAsync(token, settings);

            User user = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == data.Email);
            if (user == null)
            {
                
           

                user = new User
                {
                    Email = data.Email,
                    Firstname = $"{data.GivenName}",
                    Lastname = $"{data.FamilyName}",
                    Birthday = DateTime.Now,
                    Address = $"No address",
                    Password = BCrypt.Net.BCrypt.HashPassword("123"),
                    VerificationStatus = VerifikacijaStatus.Ceka,
                    Type = TipKorisnika.Kupac,
                    Username = data.GivenName + (new Random().Next() / 100000).ToString(),
                };

                if (data.Picture != null)
                    Convert.TryFromBase64String(data.Picture, user.Image, out int b);

                await _dbContext.Users.AddAsync(user);
                await _dbContext.SaveChangesAsync();

            }
            var claims = new[]
                {
                new Claim(ClaimTypes.Name, user.Username!),
                new Claim(ClaimTypes.Role, user.Type.ToString()),
                new Claim("Id", user.Id.ToString()),
                new Claim("Email", user.Email!),
            };

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]!));
            SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken tokenOptions = new JwtSecurityToken(
                                issuer: "http://localhost:44391",
                                _configuration["JwtSettings:Audience"],
                                claims: claims,
                                expires: DateTime.Now.AddMinutes(40),
                                signingCredentials: signInCredentials
                                );
            string tokenRet = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return new ResponseDTO(tokenRet, "Uspesna prijava");
        }

        public async Task<ResponseDTO> Login(LoginDTO loginDto)
        {
            User u = new User();
            if (string.IsNullOrEmpty(loginDto.Email))
            {
                return new ResponseDTO("Polje za unos korisnickog imena ili mejl adrese ne sme biti prazno");
            }
            if (string.IsNullOrEmpty(loginDto.Password))
            {
                return new ResponseDTO("Polje za unos lozinke ne sme biti prazno");
            }
            u = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email==loginDto.Email);

            if (u == null)
            {
                return new ResponseDTO("Korisnik"+loginDto.Email+" "+loginDto.Password+" sa unetim kredencijalima ne postoji");
            }
            if (u.Type == TipKorisnika.Prodavac && u.VerificationStatus == VerifikacijaStatus.Ceka)
                return new ResponseDTO("Jos ste na cekanju");


            if (!BCrypt.Net.BCrypt.Verify(loginDto.Password, u.Password)) // u.Password je heširana lozinka iz baze
                return new ResponseDTO("Neispravna lozinka");
            
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, u.Username!),
                new Claim(ClaimTypes.Role, u.Type.ToString()),
                new Claim("Id", u.Id.ToString()),
                new Claim("Email", u.Email!),
            };
            
                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]!));
                    SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                    JwtSecurityToken tokenOptions = new JwtSecurityToken(
                                        issuer: "http://localhost:44391",
                                        _configuration["JwtSettings:Audience"],
                                        claims: claims,
                                        expires: DateTime.Now.AddMinutes(40),
                                        signingCredentials: signInCredentials
                                        );
                string token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                Console.WriteLine(token);
                return new ResponseDTO(token, "Uspesno ste se ulogovali."); 
            
        }

        public async Task<ResponseDTO> Register(RegisterDTO registerDto)
        {
            Console.WriteLine( "tusam");
            if (string.IsNullOrEmpty(registerDto.Email))
            {
                return new ResponseDTO("Niste uneli email");
            }

            if (string.IsNullOrEmpty(registerDto.Username))
            {
                return new ResponseDTO("Niste uneli korisnicko ime");
            }
            if (string.IsNullOrEmpty(registerDto.Password))
            {
                return new ResponseDTO("Niste uneli lozinku");
            }
            if (string.IsNullOrEmpty(registerDto.Firstname))
            {
                return new ResponseDTO("Niste uneli ime");
            }
            if (string.IsNullOrEmpty(registerDto.Lastname))
            {
                return new ResponseDTO("Niste uneli prezime");
            }
            if (string.IsNullOrEmpty(registerDto.Address))
            {
                return new ResponseDTO("Niste uneli adresu");
            }
            if (registerDto.Birthday == null || registerDto.Birthday == default(DateTime))
            {
                return new ResponseDTO("Niste uneli datum rodjenja");
            }
            if (await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == registerDto.Email) != null) {
                return new ResponseDTO("Korisnik sa datim mejlom vec postoji");
            }
            if (await _dbContext.Users.FirstOrDefaultAsync(x =>  x.Username == registerDto.Username) != null)
            {
                return new ResponseDTO("Korisnik sa datim korisnickim imenom vec postoji");
            }

            registerDto.Password = BCrypt.Net.BCrypt.HashPassword(registerDto.Password);

            User u=_mapper.Map<User>(registerDto);
            if (u.Type == TipKorisnika.Prodavac)
            {
                u.VerificationStatus = VerifikacijaStatus.Ceka;
            }
            else
            {
                u.VerificationStatus = VerifikacijaStatus.Prihvacen;
            }
            if (registerDto.ImageFile != null)
            {
                using (var ms = new MemoryStream())
                {
                    registerDto.ImageFile.CopyTo(ms);
                    u.Image = ms.ToArray();
                }
            }

            _dbContext.Users.Add(u);
            await _dbContext.SaveChangesAsync();

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, u.Username!),
                new Claim(ClaimTypes.Role, u.Type.ToString()),
                new Claim("Id", u.Id.ToString()),
                new Claim("Email", u.Email!),
            };
            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JwtSettings:Key"]!));
            SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:44391",
                _configuration["JwtSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(40),
                signingCredentials: signInCredentials
                );
            string token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            Console.WriteLine(token);
            await Console.Out.WriteLineAsync(   "tusam");
            return new ResponseDTO(token, "Uspesna registracija.");
        }
    }
}
