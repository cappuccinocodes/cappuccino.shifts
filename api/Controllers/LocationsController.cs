using System;
using System.Collections.Generic;
using api.Data.Repositories;
using api.Entities;
using api.Entities.DTOs;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace cappuccino.ionicFinance.api.Controllers
{
    [ApiController] 
    [Route("api/locations")]
    public class LocationsController: ControllerBase
    {
         private readonly ILocationRepository _locationRepository;
        private readonly IMapper _mapper;
        public LocationsController(ILocationRepository locationRepository, IMapper mapper)
        {
            _locationRepository = locationRepository ??
            throw new ArgumentNullException(nameof(locationRepository));

            _mapper = mapper ??
            throw new ArgumentNullException(nameof(mapper));
        }
        [HttpGet()] 
        public ActionResult<IEnumerable<Location>> GetLocations()
        {
            var locationsFromRepo = _locationRepository.GetLocations();

            //return Ok(_mapper.Map<IEnumerable<locationDto>>(locationsFromRepo));
            return Ok(locationsFromRepo);
        }

         [HttpGet("{locationId}", Name = "GetLocation")] 
        public IActionResult GetLocation(int locationId)
        {
            var locationFromRepo = _locationRepository.GetLocation(locationId);

            if (locationFromRepo == null) 
            {
                return NotFound();
            }

            return Ok(locationFromRepo);
        }

        [HttpPost]
        public ActionResult<LocationDto> Createlocation(LocationForCreationDto location)
        {
            var locationEntity = _mapper.Map<Location>(location);
            _locationRepository.AddLocation(locationEntity);
            _locationRepository.Save();

            var locationToReturn = _mapper.Map<LocationDto>(locationEntity);
            return CreatedAtRoute("GetLocation",
               new { locationId = locationToReturn.Id }, 
               locationToReturn);
        }

        [HttpDelete("{locationId}")]
        public ActionResult Deletelocation(int locationId)
        {
            Console.WriteLine("I was called");
            var locationFromRepo = _locationRepository.GetLocation(locationId);

            if (locationFromRepo == null)
            {
                return NotFound();
            }

            _locationRepository.DeleteLocation(locationFromRepo);
            _locationRepository.Save();

            return NoContent();
        }
        
    }
}