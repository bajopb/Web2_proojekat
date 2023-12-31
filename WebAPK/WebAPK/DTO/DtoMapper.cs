﻿using AutoMapper;
using WebAPK.Models;

namespace WebAPK.DTO
{
    public class DtoMapper:Profile
    {
        public DtoMapper()
        {
            CreateMap<User, RegisterDTO>().ReverseMap();
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<User, ProfileEditDTO>().ReverseMap();
            CreateMap<User, SellerDTO>().ReverseMap();
            CreateMap<User, LoginDTO>().ReverseMap();
            CreateMap<Order, OrderDTO>().ReverseMap();
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<Product, OrderDTO>().ReverseMap();
            CreateMap<Order, NewOrderDto>().ReverseMap();
            CreateMap<Item, NewItemDto>().ReverseMap();
        }
    }
}
