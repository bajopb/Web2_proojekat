﻿using AutoMapper;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Asn1.Ocsp;
using Org.BouncyCastle.Tls.Crypto.Impl.BC;
using System.IdentityModel.Tokens.Jwt;
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
        private readonly IConfigurationSection _secretKey;

        public UserService(IMapper mapper, Web2DbContext dbContext, IConfiguration configuration)
        {
            _mapper = mapper;
            _dbContext = dbContext;
            _secretKey = configuration.GetSection("SecretKey");
        }

        public async Task<ResponseDTO> Login(LoginDTO loginDto)
        {
            User u = new User();
            if (string.IsNullOrEmpty(loginDto.Email) && string.IsNullOrEmpty(loginDto.Username))
            {
                return new ResponseDTO("Polje za unos korisnickog imena ili mejl adrese ne sme biti prazno");
            }
            if (string.IsNullOrEmpty(loginDto.Password))
            {
                return new ResponseDTO("Polje za unos lozinke ne sme biti prazno");
            }
            u = await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == loginDto.Email || x.Username==loginDto.Username);

            if (u != null)
            {
                return new ResponseDTO("Korisnik sa unetim kredencijalima ne postoji");
            }

            if (BCrypt.Net.BCrypt.Verify(loginDto.Password, loginDto.Password))
            {
                List<Claim> claims=new List<Claim>();
                claims.Add(new Claim(ClaimTypes.Name,u.Username));
                claims.Add(new Claim(ClaimTypes.Email,u.Email));
                claims.Add(new Claim(ClaimTypes.Role,u.Type.ToString()));

                SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
                SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
                JwtSecurityToken tokenOptions = new JwtSecurityToken(
                                    issuer: "http://localhost:44385",
                                    claims: claims,
                                    expires: DateTime.Now.AddMinutes(40),
                                    signingCredentials: signInCredentials
                                    );
                string token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
                UserDTO korisnikDto = _mapper.Map<UserDTO>(loginDto);
                return new ResponseDTO(token, "Uspesno ste se ulogovali.");
            }
            return new ResponseDTO("Korisnik sa unetim kredencijalima ne postoji");
        }

        public async Task<ResponseDTO> Register(RegisterDTO registerDto)
        {
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
            if (_dbContext.Users.FirstOrDefaultAsync(x => x.Email == registerDto.Email) != null) {
                return new ResponseDTO("Korisnik sa datim mejlom vec postoji");
            }
            if (_dbContext.Users.FirstOrDefaultAsync(x =>  x.Username == registerDto.Username) != null)
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

            _dbContext.Users.Add(u);
            await _dbContext.SaveChangesAsync();

            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.Name, u.Username));
            claims.Add(new Claim(ClaimTypes.Email, u.Email));
            claims.Add(new Claim(ClaimTypes.Role, u.Type.ToString()));

            SymmetricSecurityKey secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey.Value));
            SigningCredentials signInCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken tokenOptions = new JwtSecurityToken(
                issuer: "http://localhost:44385",
                claims: claims,
                expires: DateTime.Now.AddMinutes(40),
                signingCredentials: signInCredentials
                );
            string token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return new ResponseDTO(token, "Uspesna registracija.");
        }
    }
}