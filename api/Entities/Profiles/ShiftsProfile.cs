using api.Entities.DTOs;
using AutoMapper;

namespace api.Entities.Profiles
{
    public class ShiftsProfile: Profile
    {
       public ShiftsProfile()
        {
            CreateMap<Shift, ShiftDto>();
            CreateMap<ShiftForCreationDto, Entities.Shift>();
            CreateMap<ShiftForUpdateDto, Entities.Shift>();
            CreateMap<Entities.Shift, ShiftForUpdateDto>();
        }
    }
}