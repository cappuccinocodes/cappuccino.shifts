using api.Entities.DTOs;
using AutoMapper;

namespace api.Entities.Profiles
{
    public class EmployersProfile: Profile
    {
       public EmployersProfile()
        {
            CreateMap<Employer, EmployerDto>();
            CreateMap<EmployerForCreationDto, Employer>();
        }
    }
}