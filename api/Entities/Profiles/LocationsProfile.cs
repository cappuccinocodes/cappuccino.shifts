using api.Entities.DTOs;
using AutoMapper;

namespace api.Entities.Profiles
{
    public class LocationsProfile: Profile
    {
       public LocationsProfile()
        {
            CreateMap<Location, LocationDto>();
            CreateMap<LocationForCreationDto, Location>();
        }
    }
}